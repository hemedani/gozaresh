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
- [x] Create `.gitignore` (standard for Deno + Next.js + Docker – ignore node_modules, .env*, uploads/, dist/, etc.)
- [x] Paste the exact root `QWEN.md` content I provided below into `QWEN.md` (if not already done)
- [x] Create folder `back/` (if not already done)
- [x] Paste the exact `back/QWEN.md` content I provided into `back/QWEN.md` (if not already done)
- [x] Create folder `front/` (if not already done)
- [x] Paste the exact `front/QWEN.md` content I provided into `front/QWEN.md` (if not already done)
- [x] Create `CONTINUE.md` in root with the exact content I provided below (if not already done)
- [x] Create empty `docker-compose.dev.yml` and `docker-compose.yml` (we will fill them later)
- [x] Create `.env.backend` and `.env.frontend` templates (copy structure from yademan if you have it locally, otherwise minimal placeholders)
- [x] Commit the skeleton with proper gitmoji commit (use the rule in QWEN.md)

## Phase 1: Backend Skeleton (Deno + Lesan)
- [x] In `back/` run `deno init` (or copy deno.json/deps.ts/mod.ts structure from yademan/back)
- [x] Install Lesan framework via deps.ts (exact version used in yademan)
- [x] Create `back/models/` folder + basic model utilities
- [x] Create `back/src/` folder + mod.ts entry point
- [x] Create `back/uploads/` folder for attachments
- [x] Define core models (one small step each):
  - [x] User model (with roles: Ghost, Manager, Editor, Ordinary – JWT ready, bcrypt, unique email index)
  - [x] File model (for attachments, type-based directory routing: images/videos/docs)
  - [x] Tag model (with registrar relation, color, icon)
  - [x] Province model (GeoJSON MultiPolygon area + Point center, 2dsphere indexes)
  - [x] City model (with province relation, GeoJSON, 2dsphere indexes)
  - [x] Category model (with registrar relation, color, icon)
  - [x] Report model (title, description, attachments relation (multiple), tags relation (multiple), location (GeoJSON Point), status enum, priority, reporter relation, category relation)
- [x] Implement auth acts (register/login + secure JWT with 90-day expiry, bcrypt, HS512)
  - [x] user.login, user.registerUser, user.tempUser, user.getMe
  - [x] user.getUser, user.getUsers, user.addUser, user.updateUser, user.updateUserRelations, user.removeUser, user.countUsers, user.dashboardStatistic
- [x] Implement CRUD acts for Province, City, Tag, Category (add, get, gets, update, remove, count)
- [x] Implement Report CRUD acts (add, get, gets, update, updateRelations, remove, count)
  - [x] report.add (with attachments, tags, category relations)
  - [x] report.get, report.gets (with status/category/tag filters)
  - [x] report.update (pure fields), report.updateRelations (relations with replace)
  - [x] report.remove, report.count
- [x] Add file upload endpoint + static serving (file.uploadFile, file.getFiles)
- [x] Add CORS, MongoDB connection (CORS configured with multiple origins, static file serving)
- [x] Generate declarations/ for frontend type safety (declarations/selectInp.ts – 2128 lines)
- [x] Create Dockerfile for back (multi-stage: development + production)
- [ ] Test backend locally with `deno task bc-dev` (or equivalent)
- [x] Add API playground access (playground: true in mod.ts)

## Phase 2: Frontend Skeleton (Next.js 15)
- [x] In `front/` run `npx create-next-app@latest . --typescript --tailwind --app --eslint --yes` (or copy exact structure from yademan/front)
- [x] Install all exact dependencies from yademan/front (pnpm install)
  - [x] next-intl, zustand, react-hook-form, zod, jose, next-themes
  - [x] Radix UI primitives, class-variance-authority, lucide-react, framer-motion
- [x] Setup next-intl (fa/en, RTL/LTR, middleware, routing.ts, messages/fa.json + en.json)
- [ ] Setup PWA, dark theme, Tailwind config
- [x] Create folder structure: src/app, src/components (atomic), src/stores (Zustand), src/actions (server actions per model), src/types/declarations
- [x] Setup auth context + JWT cookie handling (server actions in actions/auth/)
- [x] Create public/ assets and i18n folder
- [x] Create Dockerfile for front (multi-stage: dev + prod)
- [x] Update docker-compose files for dev (direct port mapping: localhost:3000, localhost:1405)
- [x] Setup shadcn/ui components library with RTL support
  - [x] Configure components.json with RTL support
  - [x] Create cn() utility function
  - [x] Add base UI components: Button, Input, Textarea, Label, Card
  - [x] Update globals.css with shadcn/ui theme variables

**Session Notes (April 4, 2026)**:
- ✅ Removed Traefik routing from docker-compose files
- ✅ Replaced with direct port mapping (frontend: 3000, backend: 1405, mongo: 27017)
- ✅ Set up shadcn/ui with full RTL support
- ✅ Created frontend-specific TODO.md and CONTINUE.md in front/ folder

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

**Backend Audit Notes** (from code review):
- ⚠️ Missing Report model (core feature – next priority)
- ⚠️ Bug: `getUsers` and `countUsers` use `levels` instead of `level` field name
- ⚠️ Bug: `category.update` doesn't update `color`/`icon` fields
- ⚠️ Bug: CORS config has malformed URLs with double `http://`
- ⚠️ Bug: `getUsers` references "Examiner" level but it's not defined in user_level_array
- ⚠️ Province/City/Tag/Category acts have NO auth (all public)
- ℹ️ File model uses `mimType` instead of `mimeType` (typo)
- ℹ️ 38 acts total implemented across 5 schemas (user, file, province, city, tag, category)
- ℹ️ No Dockerfile yet in back/

**How to proceed**: Open `CONTINUE.md` in ZED, tell the AI agent: "Continue with next unchecked step from TODO.md". After each step the agent must update TODO.md and commit.
