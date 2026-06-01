# Phase 3 Research: Admin Content Operations & Media

## Objective

Research the implementation path for Phase 3 so the team can deliver admin CRUD for content, media uploads, and a public gallery.

## Inputs Considered

- `.planning/ROADMAP.md` (Phase 3 goal + criteria)
- `.planning/REQUIREMENTS.md` (CONT-03, ADMN-02, ADMN-03)
- Existing codebase: Phase 1-2 content types, admin auth, admin shell, service pattern

## Current Architecture

- **Auth**: JWT-based session via `jose`, stored in httpOnly cookies, `readSession()` middleware
- **Admin**: `(admin)/admin/` route group with layout that checks session + `AdminShell` component
- **Admin dashboard**: Simple placeholder page with welcome message
- **Public routes**: `(public)` route group with header/footer layout
- **Data**: All seed data in `schema.ts`, read-only async service functions
- **Storage**: No persistent storage — data is in-memory seed data only

## Storage Strategy

For Phase 3, we need **persistent storage** for content changes. Options evaluated:

| Option | Complexity | Best for |
|--------|-----------|----------|
| JSON file storage | Low | Phase 3 MVP fit |
| SQLite | Medium | Overkill for now |
| PostgreSQL | High | Phase 4+ |

**Recommendation**: JSON file storage via Server Actions. Create a `data/` directory at project root. Services read from JSON files (falling back to seed data), write via Server Actions. Media files stored in `public/uploads/` with metadata tracked in `data/media.json`.

## Recommended Technical Direction

1. **Data storage layer** — JSON file read/write utilities in `src/lib/data/file-storage.ts`
2. **Service migration** — Update announcement-service.ts and profile-service.ts to read from JSON files first, fall back to seed data
3. **Admin CRUD** — Server Actions for create/update/delete operations, admin form pages
4. **Media** — Upload handler via Server Action, `public/uploads/` storage, `data/media.json` metadata
5. **Gallery** — Public `/gallery` route with photo grid + lightbox

## Existing Patterns

- Service layer: async functions returning typed data
- Admin layout: session check + AdminShell wrapper
- Admin route group: `(admin)/admin/` with layout.tsx
- Public route group: `(public)` with consistent max-w-4xl layout
- Auth: Server Action for login, middleware for protected routes

## Risk Areas

1. **File system writes in production** — Deployed on Vercel-like platforms, file writes are ephemeral. Document that JSON storage is MVP-only — swap to DB in Phase 4+.
2. **File upload size limits** — Next.js has default 4.5MB limit on Server Actions. Add note in plan.
3. **Image optimization** — Use Next.js `<Image>` for gallery, but uploaded images need proper sizing.
4. **No DELETE for production** — JSON file approach means delete = file removal. Simple and works for MVP.

## Research Outcome

## RESEARCH COMPLETE

Phase 3 has a clear implementation path. Three plans across 2 waves:
- Wave 1 (03-01): JSON storage layer + admin announcement CRUD
- Wave 2 (03-02): Admin profile editor + media upload system
- Wave 2 (03-03): Public gallery page
