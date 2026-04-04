# Gozarish Frontend - Next.js Application

## Project Overview

Gozarish frontend is a Next.js 16 application for a citizen report registration system. It features a simple, beautiful multi-language report submission page (title, attachments, description, tags, location + minor fields) and a full-featured advanced admin panel for managing reports and users.

### Key Features

- Secure JWT-based authentication with role-based access
- Simple and elegant multi-language report submission form
- Advanced admin panel with report management, user management, tags, and file handling
- Full support for seven languages with proper RTL/LTR layout flipping
- Progressive Web App (PWA) capabilities
- Responsive, mobile-first design with dark/light theme support
- Server Actions for all backend communication (secure and efficient)

### Architecture

- **Frontend Framework**: Next.js 16 with App Router (Server Components by default)
- **Styling**: Tailwind CSS v4 + shadcn/ui (Radix UI primitives)
- **State Management**: Zustand for global state, React Context for authentication
- **Forms**: React Hook Form + Zod validation
- **Internationalization**: next-intl with automatic routing and locale detection
- **Theming**: next-themes for seamless dark/light/system mode
- **API Communication**: Server Actions only (never direct client-side fetch for backend calls)
- **Type Safety**: Generated declarations from backend + strict TypeScript

## Building and Running

### Development Environment

```bash
# Install dependencies with pnpm
pnpm install

# Run the development server (uses Turbopack)
pnpm dev
```

The app will be available at `http://localhost:3000` (or the configured port).

### Production Build

```bash
pnpm build
pnpm start
```

### Environment Configuration

Key variables:

- `NEXT_PUBLIC_LESAN_URL` – Public backend API URL (client-side)
- `LESAN_URL` – Internal backend URL (server-side)
- `APP_PORT` – Application port (default: 3005 in Docker)

## Development Conventions

### Code Structure

```
front/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (routes)/           # Public routes with locale
│   │   ├── admin/              # Admin panel (no locale)
│   │   ├── actions/            # Server actions
│   │   │   ├── auth/           # Auth server actions
│   │   │   └── report/         # Report server actions
│   │   └── globals.css         # Global styles + Tailwind
│   ├── components/             # React components
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── form/               # Reusable form components
│   │   ├── layout/             # Layout components (Header, Footer, Sidebar)
│   │   ├── providers/          # Context providers (Theme, Auth, etc.)
│   │   ├── atoms/              # Atomic design - atoms
│   │   ├── molecules/          # Atomic design - molecules
│   │   └── organisms/          # Atomic design - organisms
│   ├── stores/                 # Zustand stores
│   │   └── authStore.ts        # Auth state
│   ├── lib/                    # Utilities
│   │   ├── utils.ts            # cn() function
│   │   └── api.ts              # API utilities
│   ├── types/                  # TypeScript types
│   │   └── declarations/       # Backend-generated types
│   └── hooks/                  # Custom React hooks
├── messages/                   # next-intl translations
│   ├── fa.json                 # Persian (RTL, default)
│   └── en.json                 # English
├── i18n/                       # Internationalization config
├── public/                     # Static assets
├── components.json             # shadcn/ui configuration
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
└── TODO.md                     # This file's companion
```

### Available shadcn/UI Components

The project has a comprehensive library of shadcn/ui components located in `/src/components/ui/`:

#### Form Components

- **Button** (`button.tsx`) - Primary action buttons with variants (default, destructive, outline, secondary, ghost, link)
- **Input** (`input.tsx`) - Text input fields
- **Textarea** (`textarea.tsx`) - Multi-line text input
- **Label** (`label.tsx`) - Form labels
- **Checkbox** (`checkbox.tsx`) - Checkbox inputs for multi-select
- **Select** (`select.tsx`) - Dropdown menus for single selection
- **Form** (`form.tsx`) - Complete form components integrating with React Hook Form:
  - `Form` - FormProvider wrapper
  - `FormField` - Individual form field with validation
  - `FormItem` - Container for form elements
  - `FormLabel` - Label with error styling
  - `FormControl` - Wrapper for form controls
  - `FormDescription` - Helper text
  - `FormMessage` - Error messages

#### Layout & Navigation Components

- **Card** (`card.tsx`) - Card containers with header, content, footer
- **Dialog** (`dialog.tsx`) - Modal dialogs:
  - `Dialog`, `DialogTrigger`, `DialogContent`
  - `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`
- **Tabs** (`tabs.tsx`) - Tabbed interfaces:
  - `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`
- **Table** (`table.tsx`) - Data tables:
  - `Table`, `TableHeader`, `TableBody`, `TableFooter`
  - `TableRow`, `TableHead`, `TableCell`, `TableCaption`
- **Dropdown Menu** (`dropdown-menu.tsx`) - Context menus and action menus:
  - `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`
  - `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`
  - `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`
- **Separator** (`separator.tsx`) - Visual dividers (horizontal/vertical)

#### Feedback & Display Components

- **Toast** (`toast.tsx`) - Notification toasts with `useToast` hook:
  - `Toast`, `ToastProvider`, `ToastViewport`
  - `ToastTitle`, `ToastDescription`, `ToastClose`, `ToastAction`
  - Use via: `const { toast } = useToast(); toast({ title: "Success", description: "..." })`
- **Toaster** (`toaster.tsx`) - Toast container (add to root layout)
- **Badge** (`badge.tsx`) - Status indicators and tags (default, secondary, destructive, outline)
- **Avatar** (`avatar.tsx`) - User profile images:
  - `Avatar`, `AvatarImage`, `AvatarFallback`

### Reusable Form Components

Located in `/src/components/form/`, these components provide higher-level form functionality:

- **FormInput** (`form-field.tsx`) - Input/Textarea with label and validation

  ```tsx
  <FormInput name="email" label="Email" type="email" placeholder="Enter email" />
  <FormInput name="description" label="Description" multiline rows={4} />
  ```

- **FileUploadField** (`file-upload-field.tsx`) - File upload with image preview

  ```tsx
  <FileUploadField
    label="Attachments"
    maxFiles={10}
    maxSize={10 * 1024 * 1024}
    accept="image/*,.pdf"
    value={files}
    onChange={(files) => setFiles(files)}
  />
  ```

- **TagSelector** (`tag-selector.tsx`) - Multi-select tags with chips and search

  ```tsx
  <TagSelector
    label="Tags"
    availableTags={tags}
    selectedTags={selectedTags}
    onChange={(tags) => setSelectedTags(tags)}
    creatable={true}
  />
  ```

- **LocationPicker** (`location-picker.tsx`) - Address input with map placeholder
  ```tsx
  <LocationPicker
    label="Location"
    value={location}
    onChange={(loc) => setLocation(loc)}
    showMap={true}
  />
  ```

### Layout Components

Located in `/src/components/layout/`:

- **Header** (`header.tsx`) - Main site header with logo, navigation, language switcher, theme toggle, and user menu
- **Footer** (`footer.tsx`) - Site footer with quick links and support information
- **AdminSidebar** (`admin-sidebar.tsx`) - Collapsible sidebar for admin panel
- **LanguageSwitcher** (`language-switcher.tsx`) - Dropdown for switching between 9 supported languages

### Theme Configuration

The app uses **next-themes** for seamless dark/light/system mode:

- ThemeProvider is wrapped in root layout (`src/app/layout.tsx`)
- Dark mode CSS variables defined in `globals.css` under `.dark` class
- Theme toggle available via `useTheme()` hook from next-themes
- System preference detection enabled by default
- Smooth transitions between themes (0.3s ease)

```tsx
import { useTheme } from "next-themes";

const { theme, setTheme } = useTheme();
setTheme("dark"); // or 'light' or 'system'
```

### Internationalization

- The application supports **nine languages**:
  - Persian (fa) – default locale
  - English (en)
  - Arabic (ar)
  - Chinese (zh)
  - Portuguese (pt)
  - Spanish (es)
  - Dutch (nl)
  - Turkish (tr)
  - Russian (ru)
- Uses **next-intl** (latest version compatible with Next.js 16 App Router) for complete internationalization, including automatic locale detection, routing, message formatting, and pluralization.
- Translation files are located in the `/messages` directory:
  - `fa.json` (default + most complete)
  - `en.json`
  - `ar.json`
  - `zh.json`
  - `pt.json`
  - `es.json`
  - `nl.json`
  - `tr.json`
  - `ru.json`
- Automatic text direction (dir) handling:
  - **RTL**: Persian (fa) and Arabic (ar)
  - **LTR**: English (en), Chinese (zh), Portuguese (pt), Spanish (es), Dutch (nl), Turkish (tr), Russian (ru)
- Locale routing is configured in `i18n/routing.ts` with a full list of supported locales and proper fallback strategy.
- Middleware (`middleware.ts`) handles intelligent locale detection from URL path, cookie (user preference), and browser `Accept-Language` header.
- Supports locale-prefixed URLs (e.g. `/fa/reports`, `/tr/reports`, `/ru/reports`, etc.).
- **Admin routes** (`/admin/*`) are completely excluded from locale-based routing and accessible without any prefix.
- User’s preferred locale is persistently stored in cookies.
- Uses next-intl navigation utilities (`Link`, `redirect`, `usePathname`, `useRouter`, etc.) for locale-aware navigation.
- Fully integrated with Next.js App Router through `middleware.ts` and `i18n/request.ts`.
- All UI text, form labels, validation messages, notifications, and admin panel must be translated in all nine languages.
- RTL/LTR layout flipping is handled automatically using logical properties.
- Date, number, and time formatting respect the current locale.

### Styling

- **Tailwind CSS v4** as the core utility framework (`@import "tailwindcss";` in globals.css).
- **shadcn/ui** as the primary component library (built on Radix UI + Tailwind).
  - Full RTL support (CLI generates logical properties when `rtl: true` in `components.json`).
  - Excellent accessibility and customization.
- Dark theme using Tailwind v4 `@custom-variant dark` + **next-themes** (no FOUC).
- Mobile-first responsive design.
- Logical properties (`ps-`, `me-`, `start-`, `end-`, etc.) preferred for RTL compatibility.
- Consistent design tokens via CSS variables and `@theme` directive.
- All components must be beautiful and professional in both LTR and RTL modes.

#### Setup & Best Practices

1. Configure `components.json` with `"rtl": true`.
2. Global stylesheet includes Tailwind import and dark variant.
3. Wrap app with `ThemeProvider` from next-themes.
4. Use shadcn CLI to add components and verify RTL behavior.
5. Maintain consistent typography, colors, and spacing.

### Authentication

- JWT-based with secure cookie handling.
- Role-based access (Normal, Editor, Manager, Ghost – Ghost has highest privileges).
- Auth state managed via React Context + Zustand where needed.

## Key Configuration Files

- `next.config.ts`
- `tsconfig.json`
- `tailwind.config.ts` (minimal – prefer CSS `@theme`)
- `components.json` (shadcn/ui config)
- `middleware.ts`
- `i18n/routing.ts`
- `Dockerfile`

## Project Guidelines

You are a front-end expert in Next.js 16, Tailwind v4, and shadcn/ui. Always prioritize **clean, beautiful, intuitive, and accessible** UIs. The report submission page must feel simple and welcoming; the admin panel must be powerful yet well-organized.

- Use **pnpm** for all commands.
- Use **Server Actions** in `src/app/actions/<model>/` for all backend communication (preferred pattern: `add`, `get`, `gets`, `update`, `remove`, etc.).
- Backend responses follow: `{ success: boolean, body: data }`. Always access data via `response.body`.
- For authentication: token is sent in header `token` (no "Bearer" prefix), stored in cookie named "token".
- Strictly follow clean code, clean architecture, and best practices. Remove unused code, console.logs, etc.
- Use shadcn/ui components (Button, Input, Textarea, Card, Table, Form, Dialog, etc.) as the foundation.
- All new forms: React Hook Form + Zod.
- When adding translations: add keys to **all** language files.
- Test thoroughly in fa (RTL) and en (LTR).

### API Calls Best Practice

Always use server actions instead of client-side fetch. Example:

```ts
import { createReport } from "@/app/actions/report/create";

const result = await createReport(formData);
if (result.success) {
  // data is in result.body
}
```

### Important Notes

- Use types from `/src/types/declarations` for consistency with the backend.
- Ghost user level has full admin access.
- Keep the report submission page **simple and elegant**.
- Do not run `pnpm dev` or build commands automatically — only suggest them.
