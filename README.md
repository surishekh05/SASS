# Multi-Tenant SaaS Notes Application

## Overview
This is a multi-tenant SaaS Notes Application built with React.js (Vite), Tailwind CSS, and a Node.js backend using in-memory data storage (no database). The application supports multiple tenants, role-based access, and subscription limits.

## Multi-Tenancy Approach
We use a **shared schema with tenant ID (tenantSlug)** to separate data. All users and notes are stored in shared arrays, but each is tagged with `tenantSlug`. Every API request filters data based on the tenant, ensuring strict isolation.

## Features
- Supports tenants "Acme" and "Globex".
- JWT-based authentication.
- Role-based permissions (Admin & Member).
- Subscription limits (Free: 3 notes, Pro: unlimited).
- Upgrade functionality for admins.
- Notes CRUD API.
- Minimal frontend for login, notes management, and upgrade prompts.
- Health check endpoint.

## Test Accounts
- `admin@acme.test` / password → Admin, Acme tenant
- `user@acme.test` / password → Member, Acme tenant
- `admin@globex.test` / password → Admin, Globex tenant
- `user@globex.test` / password → Member, Globex tenant

## Deployment
The app is deployed on Vercel with backend and frontend configurations.

## Notes
This implementation uses in-memory storage for demonstration purposes. In production, you should use a persistent database and environment-based secrets.

