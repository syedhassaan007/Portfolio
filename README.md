# Syed Hassan — Portfolio

A full-stack personal portfolio / digital resume.

```
React (Vite)  →  REST API  →  Express + Node.js  →  MySQL
```

The frontend never talks to MySQL directly, and no database credentials are
ever sent to the browser — the frontend only knows about `/api/*`.

---

## 1. Project overview

A recruiter-facing portfolio with dedicated pages for About, Skills,
Projects, Certifications, Education/Experience, and Contact, plus a
password-protected `/admin` panel to add, edit, and delete content without
touching code.

## 2. Features

- Modern glassmorphism/neumorphism UI with a subtle 3D-tilt hero card, smooth
  page transitions, and restrained scroll reveals (respects
  `prefers-reduced-motion`)
- Fully responsive (mobile, tablet, desktop)
- Real REST API backed by MySQL — nothing is hardcoded in the frontend
- JWT-protected admin panel with full CRUD for every content type
- Public contact form that writes to the database, with rate limiting and
  server-side validation
- Clean project structure, parameterized SQL everywhere (no injection
  surface), environment-variable configuration

## 3. Technologies used

| Layer     | Stack |
|-----------|-------|
| Frontend  | React 18, Vite, React Router, Tailwind CSS, Framer Motion |
| Backend   | Node.js, Express, JWT, bcrypt, express-validator, express-rate-limit |
| Database  | MySQL (via `mysql2`) |

## 4. Folder structure

```
portfolio/
├── backend/
│   ├── config/          # DB pool, admin-seed script
│   ├── controllers/     # Route handlers (generic CRUD factory + specifics)
│   ├── middleware/      # JWT auth, validation, error handling
│   ├── routes/          # One file per resource, mounted under /api
│   ├── uploads/         # Static files (avatar, resume PDF, project images)
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── database/
│   ├── schema.sql       # Creates the database + all tables
│   └── seed.sql         # Your real bio content + labeled placeholders
├── frontend/
│   ├── src/
│   │   ├── components/  # Navbar, cards, admin CRUD UI, etc.
│   │   ├── pages/       # One file per route, including /admin
│   │   ├── services/    # api.js — the only place that calls fetch()
│   │   └── context/     # AuthContext (admin session)
│   ├── index.html
│   └── package.json
└── README.md
```

## 5. MySQL database setup

You said you already have MySQL running, so just point it at a fresh
database:

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p portfolio_db < database/seed.sql
```

This creates the `portfolio_db` database, all tables, and inserts your real
About Me bio plus clearly labeled placeholders (e.g. `[YOUR_GITHUB_URL]`,
`[YOUR_PROJECT_1_NAME]`) for everything not provided. Replace those either by
editing `database/seed.sql` and re-running it, or — easier — through the
`/admin` panel once the app is running.

## 6. Environment variables

```bash
cp backend/.env.example backend/.env
```

Then edit `backend/.env`:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=portfolio_db

PORT=5000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173

JWT_SECRET=<generate one — see below>
JWT_EXPIRES_IN=2h

ADMIN_USERNAME=admin
ADMIN_PASSWORD=choose_a_strong_password
```

Generate a strong `JWT_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

`.env` is git-ignored — never commit it.

## 7. Backend installation

```bash
cd backend
npm install
npm run seed:admin   # creates your admin login from ADMIN_USERNAME / ADMIN_PASSWORD
npm run dev          # starts the API on http://localhost:5000
```

You should see:
```
[server] API running on http://localhost:5000
[db] Connected to MySQL database "portfolio_db" at localhost:3306
```

## 8. Frontend installation

```bash
cd frontend
npm install
npm run dev           # starts on http://localhost:5173
```

The Vite dev server proxies `/api` and `/uploads` to `http://localhost:5000`
automatically (see `vite.config.js`), so no CORS setup is needed locally.

## 9. How to run the project (quick reference)

```bash
# Terminal 1
cd backend && npm install && npm run dev

# Terminal 2
cd frontend && npm install && npm run dev
```

Visit `http://localhost:5173`. Log into the admin panel at
`http://localhost:5173/admin/login` with the credentials from
`ADMIN_USERNAME` / `ADMIN_PASSWORD`.

## 10. API endpoints

All routes are prefixed with `/api`.

| Method | Path                          | Auth  | Description |
|--------|-------------------------------|-------|-------------|
| POST   | `/auth/login`                 | —     | Log in, returns a JWT |
| GET    | `/auth/me`                    | admin | Verify current session |
| GET    | `/profile`                    | —     | Get about-me record |
| PUT    | `/profile`                    | admin | Update about-me record |
| GET    | `/skills`                     | —     | List skills |
| POST/PUT/DELETE | `/skills[/:id]`      | admin | Manage skills |
| GET    | `/certifications`             | —     | List certifications |
| POST/PUT/DELETE | `/certifications[/:id]` | admin | Manage certifications |
| GET    | `/education`                  | —     | List education entries |
| POST/PUT/DELETE | `/education[/:id]`   | admin | Manage education |
| GET    | `/projects`, `/projects/:id`  | —     | List / get one project |
| POST/PUT/DELETE | `/projects[/:id]`    | admin | Manage projects |
| GET    | `/experience`                 | —     | List experience |
| POST/PUT/DELETE | `/experience[/:id]`  | admin | Manage experience |
| GET    | `/achievements`               | —     | List achievements |
| POST/PUT/DELETE | `/achievements[/:id]`| admin | Manage achievements |
| GET    | `/social-links`               | —     | List social links |
| POST/PUT/DELETE | `/social-links[/:id]`| admin | Manage social links |
| POST   | `/contact`                    | —     | Submit a contact message (rate-limited) |
| GET    | `/contact`                    | admin | View all messages |
| PUT    | `/contact/:id/read`           | admin | Mark a message read |
| DELETE | `/contact/:id`                | admin | Delete a message |

Admin routes require `Authorization: Bearer <token>` from `/auth/login`.

## 11. How to add your portfolio data

Once both servers are running, go to `http://localhost:5173/admin/login`,
sign in, and use the tabs (Profile, Skills, Projects, Certifications,
Education, Experience, Achievements, Social links, Messages) to add and edit
everything — no code changes or redeploys needed.

## 12. How to replace placeholder content

Search `database/seed.sql` for anything in `[BRACKETS]` — those are the
fields I didn't have real data for (projects, certifications, education
details, GitHub/LinkedIn URLs, email). Replace them either:
- directly in `seed.sql` and re-run it, or
- through the admin panel (recommended — no SQL needed)

To add a real profile photo, résumé PDF, project screenshot, or certificate
badge: drop the file into `backend/uploads/` and reference it as
`/uploads/your-file.png` in the relevant admin form field (avatar_url,
resume_url, image_url, badge_url).

## 13. How to replace the resume PDF

1. Put your PDF in `backend/uploads/`, e.g. `backend/uploads/resume.pdf`
2. In the admin Profile tab, set "Resume PDF URL" to `/uploads/resume.pdf`
3. The "Download résumé" button on the homepage will use it automatically

## 14. How to deploy

- **Backend**: any Node host (Render, Railway, an EC2/Droplet, etc.). Set the
  same environment variables from `.env.example` in your host's dashboard —
  never commit `.env`.
- **Database**: a managed MySQL instance (RDS, PlanetScale-compatible MySQL,
  Railway MySQL, etc.). Run `schema.sql` then `seed.sql` against it once.
- **Frontend**: `npm run build` inside `frontend/` produces a static `dist/`
  folder deployable to Vercel, Netlify, or any static host. Set
  `CLIENT_ORIGIN` on the backend to your deployed frontend's URL for CORS,
  and configure the frontend to call your deployed backend's `/api` URL
  (add a `VITE_API_URL` env var and swap it into `services/api.js` if your
  frontend and backend are on different domains in production).

---

### What you still need to provide

- GitHub URL, LinkedIn URL, personal email → Admin → Social links / Profile
- Real projects (name, description, tech stack, GitHub/demo links) → Admin → Projects
- Real certifications (e.g. from your AWS/MongoDB study materials) → Admin → Certifications
- Education details (institution, years, grade) → Admin → Education
- Experience and achievements, if any → Admin → Experience / Achievements
- Profile photo and résumé PDF → drop into `backend/uploads/`, reference in Admin → Profile
