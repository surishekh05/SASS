// Store users and notes in memory for the session
// Tenant isolation is enforced by filtering by tenantSlug

const users = [
  { email: "admin@acme.test", password: "password", role: "Admin", tenantSlug: "acme" },
  { email: "user@acme.test", password: "password", role: "Member", tenantSlug: "acme" },
  { email: "admin@globex.test", password: "password", role: "Admin", tenantSlug: "globex" },
  { email: "user@globex.test", password: "password", role: "Member", tenantSlug: "globex" },
];

const tenants = {
  acme: { plan: "Free" },
  globex: { plan: "Free" },
};

const notes = [];

module.exports = { users, tenants, notes };
