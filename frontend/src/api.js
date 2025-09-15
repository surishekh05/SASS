const API_URL = "http://localhost:3000"; // Change when deployed

export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function getNotes(token) {
  const res = await fetch(`${API_URL}/notes`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  return res.json();
}

export async function createNote(token, title, content) {
  const res = await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify({ title, content })
  });
  return res.json();
}

export async function deleteNote(token, id) {
  const res = await fetch(`${API_URL}/notes/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  });
  return res.json();
}

export async function upgradeTenant(token, slug) {
  const res = await fetch(`${API_URL}/tenants/${slug}/upgrade`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}` }
  });
  return res.json();
}
