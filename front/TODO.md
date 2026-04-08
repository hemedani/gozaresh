# Gozarish Frontend TODO.md

**Project**: Gozarish Frontend – Citizen Report Registration System
**Goal**: Beautiful, accessible, multi-language Next.js 16 frontend with shadcn/ui components
**Tech stack**: Next.js 16 + TypeScript + Tailwind v4 + shadcn/ui + next-intl + Zustand + React Hook Form + Zod

**Workflow rules for ZED IDE AI agent**:

- Always read `CONTINUE.md` first as your system prompt.
- Work **one step at a time** from this TODO.md.
- After finishing a step: mark it `[x]`, add any notes, then run the exact git commit procedure described in root QWEN.md.
- Never skip steps. Never use `git reset`.
- Update this TODO.md and commit after every single step.
- When stuck, ask for clarification in the ZED chat but do not proceed to next step.
- Use **pnpm** for all commands.
- Use **Server Actions** for all backend communication (never direct client fetch).
- All UI must be beautiful, accessible, and production-ready with shadcn/ui.

## Phase 1: Setup & Configuration (Beginning – do these first)

- [x] Next.js 16 app scaffolded with TypeScript, Tailwind v4, App Router
- [x] Install core dependencies: next-intl, zustand, react-hook-form, zod, jose, next-themes
- [x] Install Radix UI primitives, class-variance-authority, lucide-react, framer-motion
- [x] Configure next-intl (fa/en, RTL/LTR, middleware, routing.ts, messages/fa.json + en.json)
- [x] Create folder structure: src/app, src/components, src/stores, src/actions, src/types/declarations
- [x] Setup Zustand auth store with JWT cookie handling
- [x] Setup server actions for auth (login, register, getMe, logout)
- [x] Setup server actions for reports (createReport, getMyReports)
- [x] Create public/ assets and i18n folder
- [x] Create multi-stage Dockerfile (dev + prod)
- [x] Setup shadcn/ui with RTL support
  - [x] Configure components.json with `"rtl": true`
  - [x] Create cn() utility function in src/lib/utils.ts
  - [x] Add base UI components: Button, Input, Textarea, Label, Card
  - [x] Update globals.css with shadcn/ui theme variables
- [x] Copy backend type declarations to src/types/declarations/

## Phase 2: Core UI Components (Build shadcn/ui component library)

- [x] Add more shadcn/ui components as needed:
  - [x] Dialog/Modal (for confirmations, forms)
  - [x] Toast/Notification (for success/error messages)
  - [x] Select (for dropdowns: tags, categories, status)
  - [x] Checkbox (for multi-select tags, filters)
  - [x] Tabs (for admin panel sections)
  - [x] Table (for reports/users lists in admin)
  - [x] Dropdown Menu (for user menu, actions)
  - [x] Avatar (for user profiles)
  - [x] Badge (for tags, status indicators)
  - [x] Form (React Hook Form integration with shadcn/ui)
  - [x] Popover (for emoji picker)
  - [x] Emoji Picker (emoji-picker-react)
  - [ ] File Upload component
  - [ ] Loading/Spinner component
- [x] Create reusable form components:
  - [x] FormField (with label, input, error message)
  - [x] FileUploadField (with preview for images)
  - [x] TagSelector (multi-select with chips)
  - [x] LocationPicker (map or address input)
- [x] Create layout components:
  - [x] Header (with language switcher, theme toggle, auth buttons)
  - [x] Footer (simple, multi-lang)
  - [x] Sidebar (for admin panel)
  - [ ] Navigation (public site)
- [x] Theme configuration:
  - [x] Dark mode with next-themes
  - [x] Light mode (default)
  - [x] System preference detection
  - [x] Smooth theme transitions

## Phase 3: Public User Pages (Multi-language)

- [x] **Landing Page** (`/[locale]/`)
  - [x] Hero section with app description
  - [x] Features overview (simple, secure, multi-language)
  - [x] Login/Register CTA buttons
  - [x] Beautiful, welcoming design
- [x] **Login Page** (`/[locale]/login`)
  - [x] Email + password form
  - [x] Zod validation
  - [x] Error handling (wrong credentials)
  - [x] Loading states
  - [x] Link to register page
  - [x] Redirect to home after login
- [x] **Register Page** (`/[locale]/register`)
  - [x] Name, email, password, confirm password form
  - [x] Zod validation (password strength, email format)
  - [x] Error handling (duplicate email)
  - [x] Loading states
  - [x] Link to login page
  - [x] Auto-login after registration
- [x] **Report Submission Page** (`/[locale]/reports/new`)
  - [x] Title field (required)
  - [x] Description textarea (required, with character count)
  - [x] File upload (multiple files, with preview, drag & drop)
  - [x] Tags multi-select (searchable, with chips)
  - [x] Category select (dropdown)
  - [x] Location picker (map with pin placement OR address input)
  - [x] Priority selector (low, medium, high)
  - [x] Status (auto-set to "pending")
  - [x] Zod validation for all fields
  - [x] Loading states during submission
  - [x] Success/error toasts
  - [x] Redirect to my reports after submission
  - [x] Simple, elegant, intuitive design
- [x] **My Reports Page** (`/[locale]/reports`)
  - [x] List of user's reports (cards or table)
  - [x] Each report shows: title, status badge, date, category
  - [x] Filter by status (pending, approved, rejected)
  - [x] Filter by category
  - [x] Pagination or infinite scroll
  - [x] Empty state (no reports yet)
  - [x] Link to create new report
  - [x] Click to view report details
- [x] **Report Detail Page** (`/[locale]/reports/[id]`)
  - [x] Full report information
  - [x] Attachments (downloadable, image preview)
  - [x] Tags displayed as badges
  - [x] Category, location, priority
  - [x] Status badge with color coding
  - [x] Submission date
  - [ ] Comments/reviews section (if applicable)

## Phase 4: Admin Panel (`/admin/*` – no locale prefix)

- [x] **Admin Layout**
  - [x] Sidebar navigation (Dashboard, Reports, Users, Tags, Categories, Files)
  - [x] Admin header with user menu
  - [x] Role-based access check (redirect if not admin)
  - [x] Dark theme by default (optional toggle)
- [x] **Admin Dashboard** (`/admin/dashboard`)
  - [x] Statistics cards (total reports, users, pending reports, approved)
  - [x] Recent reports list
  - [x] Charts/graphs (reports over time, by category, by status)
  - [x] Quick actions (approve pending, view users, etc.)
- [ ] **Reports Management** (`/admin/reports`)
  - [x] Data table with all reports
  - [x] Columns: title, reporter, category, status, priority, date, actions
  - [x] Filter by status, category, priority, date range
  - [x] Search by title or reporter
  - [x] Sort by any column
  - [x] Pagination
  - [x] Bulk actions (approve, reject, delete)
  - [x] Row actions: view, edit, approve, reject, delete
  - [x] Export to CSV/Excel
  - [x] View report detail modal/page
- [x] **Users Management** (`/admin/users`)
  - [x] Data table with all users
  - [x] Columns: name, email, role, level, reports count, date, actions
  - [x] Filter by role/level
  - [x] Search by name or email
  - [x] Sort by any column
  - [x] Pagination
  - [x] Actions: view, edit role/level, deactivate, delete
  - [x] Add new user modal
- [x] **Tags Management** (`/admin/tags`)
  - [x] List/grid of all tags
  - [x] Columns: name, color, icon, description, actions
  - [x] Search by tag name
  - [x] Sort by any column
  - [x] Pagination
  - [x] Delete tag (with confirmation)
  - [x] Add new tag (name, color picker, emoji icon selector)
  - [x] Edit tag
- [x] **Categories Management** (`/admin/categories`)
  - [x] List/grid of all categories
  - [x] Columns: name, color, icon, description, actions
  - [x] Add new category (name, color picker, emoji icon selector)
  - [x] Edit category
  - [x] Delete category (with confirmation)
- [x] **Files Management** (`/admin/files`)
  - [x] List of all uploaded files
  - [x] Columns: filename, type, size, uploaded by, date, actions
  - [x] Filter by type (images, videos, docs)
  - [x] Search by filename (Backend text search integrated)
  - [x] Sort by any column (Backend sorting integrated)
  - [ ] Delete file (with confirmation)
  - [x] Preview images/videos

## Phase 5: Internationalization (Complete all 9 languages)

- [x] Add translation files for all languages:
  - [x] fa.json (Persian – default, RTL) ✅ started
  - [x] en.json (English – LTR) ✅ started
  - [x] ar.json (Arabic – RTL) ✅
  - [x] zh.json (Chinese – LTR) ✅
  - [x] pt.json (Portuguese – LTR) ✅
  - [x] es.json (Spanish – LTR) ✅
  - [x] nl.json (Dutch – LTR) ✅
  - [x] tr.json (Turkish – LTR) ✅
  - [x] ru.json (Russian – LTR) ✅
- [x] Translate all pages:
  - [x] Landing page
  - [x] Login/Register pages
  - [x] Report submission page
  - [x] My Reports page
  - [x] Report detail page
  - [x] Admin panel (all pages)
- [x] Translate all UI elements:
  - [x] Form labels, placeholders, error messages
  - [x] Button texts
  - [x] Navigation labels
  - [x] Toast notifications
  - [x] Table headers
  - [x] Modal titles and content
- [x] Language switcher component (header/footer)
- [x] Test RTL layouts thoroughly (fa, ar)
- [x] Test LTR layouts thoroughly (en, zh, pt, es, nl, tr, ru)

## Phase 6: PWA & Polish

- [x] Install next-pwa
- [x] Configure service worker
  - [x] Cache static assets
  - [x] Offline fallback page
  - [x] Manifest.json with app metadata
- [x] App icons (multiple sizes)
- [ ] Test PWA functionality
- [x] Mobile responsiveness audit:
  - [x] All pages work perfectly on mobile (320px+)
  - [x] Touch-friendly buttons and interactions
  - [x] Mobile-optimized forms (keyboard handling)
  - [x] Hamburger menu for navigation
- [x] Loading states:
  - [x] Skeleton loaders for all data lists
  - [x] Loading spinners for async actions
  - [x] Optimistic updates where appropriate
- [x] Error handling:
  - [x] Network error handling
  - [x] Server error handling
  - [x] User-friendly error messages
  - [x] Retry mechanisms
- [ ] Accessibility audit:
  - [ ] Keyboard navigation
  - [ ] Screen reader support
  - [ ] Color contrast (WCAG AA)
  - [ ] Focus indicators
  - [ ] ARIA labels where needed

## Phase 7: Testing & Production Readiness

- [ ] Form validation testing (Zod schemas)
- [ ] Auth flow testing (login, register, logout, session)
- [ ] Server actions error handling
- [ ] Edge cases handling:
  - [ ] Empty states
  - [ ] No data states
  - [ ] Error states
  - [ ] Loading states
- [ ] Security audit:
  - [ ] XSS prevention
  - [ ] CSRF protection
  - [ ] Input sanitization
  - [ ] Secure cookie handling
  - [ ] Rate limiting on forms
- [ ] Performance optimization:
  - [ ] Image optimization (next/image)
  - [ ] Code splitting
  - [ ] Lazy loading heavy components
  - [ ] Font optimization
- [ ] Final cleanup:
  - [ ] Remove unused code/imports
  - [ ] Remove console.logs
  - [ ] Type safety check (no `any`)
  - [ ] Lint and format check
- [ ] Docker Compose testing
- [ ] Production build test
- [ ] Deployment preparation (env vars, ports, etc.)

## Known Issues & Technical Debt

- [ ] Check if all server actions properly handle errors
- [ ] Verify JWT cookie handling is secure (httpOnly, secure flags)
- [ ] Ensure all forms have proper loading states
- [ ] Test all RTL layouts for alignment issues
- [ ] Verify all translation keys exist in all language files

**How to proceed**: Open `CONTINUE.md` in ZED, tell the AI agent: "Continue with next unchecked step from TODO.md". After each step the agent must update TODO.md and commit.
