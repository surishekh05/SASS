const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { users, tenants, notes } = require('./data');
const { generateToken } = require('./utils/jwt');
const authMiddleware = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());

require('dotenv').config();
const SECRET = process.env.SECRET;
if (!SECRET) throw new Error('SECRET must be set!');

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: "ok" });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const token = generateToken(user);
  res.json({ token });
});

// Notes CRUD endpoints
app.post('/notes', authMiddleware, (req, res) => {
  const { title, content } = req.body;
  const { tenantSlug, role } = req.user;

  // Subscription enforcement
  if (tenants[tenantSlug].plan === "Free") {
    const count = notes.filter(n => n.tenantSlug === tenantSlug).length;
    if (count >= 3) {
      return res.status(403).json({ error: "Note limit reached for Free plan" });
    }
  }

  const note = { id: Date.now().toString(), tenantSlug, title, content };
  notes.push(note);
  res.json(note);
});

app.get('/notes', authMiddleware, (req, res) => {
  const { tenantSlug } = req.user;
  const tenantNotes = notes.filter(n => n.tenantSlug === tenantSlug);
  res.json(tenantNotes);
});

app.get('/notes/:id', authMiddleware, (req, res) => {
  const { tenantSlug } = req.user;
  const note = notes.find(n => n.id === req.params.id && n.tenantSlug === tenantSlug);
  if (!note) return res.status(404).json({ error: "Note not found" });
  res.json(note);
});

app.put('/notes/:id', authMiddleware, (req, res) => {
  const { tenantSlug } = req.user;
  const note = notes.find(n => n.id === req.params.id && n.tenantSlug === tenantSlug);
  if (!note) return res.status(404).json({ error: "Note not found" });

  note.title = req.body.title;
  note.content = req.body.content;
  res.json(note);
});

app.delete('/notes/:id', authMiddleware, (req, res) => {
  const { tenantSlug } = req.user;
  const index = notes.findIndex(n => n.id === req.params.id && n.tenantSlug === tenantSlug);
  if (index === -1) return res.status(404).json({ error: "Note not found" });

  notes.splice(index, 1);
  res.json({ success: true });
});

// Upgrade endpoint
app.post('/tenants/:slug/upgrade', authMiddleware, (req, res) => {
  const { tenantSlug, role } = req.user;
  if (tenantSlug !== req.params.slug || role !== "Admin") {
    return res.status(403).json({ error: "Forbidden" });
  }
  tenants[tenantSlug].plan = "Pro";
  res.json({ success: true });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
