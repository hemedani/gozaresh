# Gozarish Project TODO.md
**Project**: Gozarish – Citizen Report Registration System  
**Goal**: Secure multi-language web app for ordinary people to submit reports (title, attachments, description, tags, location + minor fields). Advanced admin panel.  
**Tech stack**: Exact same as yademan/Naghshe (Deno + Lesan backend, Next.js 15 frontend, MongoDB, Docker, multi-lang fa/en, JWT auth, etc.).  
**Workflow rules for ZED IDE AI agent**:
- Always read `CONTINUE.md` first as your system prompt.
- Work **one step at a time** from this TODO.md.
- After finishing a step: mark it `[x]`, add any notes, then run the exact git commit procedure described in root QWEN.md.
- Never skip steps. Never use `git reset`.
- Update this TODO.md and commit after every single step.
- When stuck, ask for clarification in the ZED chat but do not proceed to next step.

## Phase 0: Project Skeleton (Beginning – do these first)
- [x] `git init` in root
- [ ] Create `.gitignore` (standard for Deno + Next.js + Docker – ignore node_modules, .env*, uploads/, dist/, etc.)
- [ ] Paste the exact root `QWEN.md` content I provided below into `QWEN.md` (if not already done)
- [ ] Create folder `back/` (if not already done)
- [ ] Paste the exact `back/QWEN.md` content I provided into `back/QWEN.md` (if not already done)
- [ ] Create folder `front/` (if not already done)
- [ ] Paste the exact `front/QWEN.md` content I provided into `front/QWEN.md` (if not already done)
- [ ] Create `CONTINUE.md` in root with the exact content I provided below (if not already done)
- [ ] Create empty `docker-compose.dev.yml` and `docker-compose.yml` (we will fill them later) 
- [ ] Create `.env.backend` and `.env.frontend` templates (copy structure from yademan if you have it locally, otherwise minimal placeholders)
- [ ] Commit the skeleton with proper gitmoji commit (use the rule in QWEN.md)

## Phase 1: Backend Skeleton (Deno + Lesan)
- [ ] In `back/` run `deno init` (or copy deno.json/deps.ts/mod.ts structure from yademan/back)
- [ ] Install Lesan framework via deps.ts (exact version used in yademan)
- [ ] Create `back/models/` folder + basic model utilities
- [ ] Create `back/src/` folder + mod.ts entry point
- [ ] Create `back/uploads/` folder for attachments
- [ ] Define core models (one small step each):
  - [ ] User model (with roles: normal, admin, etc. – JWT ready)
  - [ ] File model (for attachments)
  - [ ] Tag model
  - [ ] Report model (title, description, attachments relation, tags relation, location (GeoJSON or address), status, createdBy, date, extra minor fields)
  - [ ] Any extra minor models if needed (e.g. Category)
- [ ] Implement auth acts (register/login/logout + secure JWT)
- [ ] Implement Report CRUD acts (create with file upload, get, gets, update, delete)
- [ ] Add file upload endpoint + static serving
- [ ] Add CORS, MongoDB connection, Redis if needed (same as yademan)
- [ ] Generate declarations/ for frontend type safety
- [ ] Create Dockerfile for back
- [ ] Test backend locally with `deno task bc-dev` (or equivalent)
- [ ] Add API playground access

## Phase 2: Frontend Skeleton (Next.js 15)
- [ ] In `front/` run `npx create-next-app@latest . --typescript --tailwind --app --eslint --yes` (or copy exact structure from yademan/front)
- [ ] Install all exact dependencies from yademan/front (pnpm install)
- [ ] Setup next-intl (fa/en, RTL/LTR, middleware, routing.ts, messages/fa.json + en.json)
- [ ] Setup PWA, dark theme, Tailwind config
- [ ] Create folder structure: src/app, src/components (atomic), src/stores (Zustand), src/actions (server actions per model), src/types/declarations
- [ ] Setup auth context + JWT cookie handling (same as yademan)
- [ ] Create public/ assets and i18n folder
- [ ] Create Dockerfile for front
- [ ] Update docker-compose files for dev (Traefik routing: frontend.localhost, api.localhost)

## Phase 3: Core User-Facing Pages (Multi-language)
- [ ] Public landing page (simple, multi-lang)
- [ ] Login / Register page (secure, multi-lang)
- [ ] Report submission page (simple form: title, description, attachments upload, tags (multi-select), location picker (address or map if you want), other fields – multi-lang, beautiful UI)
- [ ] My Reports page (user sees own reports)
- [ ] Use server actions for all API calls (never direct fetch from client)

## Phase 4: Advanced Admin Panel
- [ ] Protected admin routes (/admin – no locale prefix, role check)
- [ ] Dashboard overview
- [ ] Reports management (list, filter, view details, approve/reject, edit, delete, export)
- [ ] Users management
- [ ] Tags / Categories management
- [ ] File / Attachment management
- [ ] Beautiful, responsive, dark-theme admin UI (use same components style as yademan)

## Phase 5: Polish & Production
- [ ] Full i18n on all pages
- [ ] Responsive + mobile perfect
- [ ] Form validation (Zod + React Hook Form)
- [ ] Error handling & loading states
- [ ] Security audit (auth, file upload limits, rate limiting)
- [ ] Docker Compose full dev + prod setup
- [ ] Deploy-ready (update ports, env vars)
- [ ] Final tests + cleanup

## Phase 6: Extra (optional)
- [ ] Map integration for location selection (reuse MapLibre/Leaflet if desired)
- [ ] Notifications, advanced filtering, analytics, etc.

**How to proceed**: Open `CONTINUE.md` in ZED, tell the AI agent: "Continue with next unchecked step from TODO.md". After each step the agent must update TODO.md and commit.
