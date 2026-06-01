# Phase 4 Research: Engagement & Advanced Content

## Objective

Research the implementation path for Phase 4 so the team can deliver event calendar, downloadable forms, content scheduling, and homepage spotlight features.

## Inputs Considered

- `.planning/ROADMAP.md` (Phase 4 goal + criteria)
- `.planning/REQUIREMENTS.md` (ENG-01, ENG-02, ADVC-01, ADVC-02)
- Existing Phase 1-3 codebase

## Current Architecture

- **Data layer**: JSON file storage with seed fallback (`file-storage.ts`)
- **Service pattern**: Async functions reading from JSON files in `data/`
- **Admin**: "use client" forms using `useActionState` + Server Actions
- **Public pages**: Server Components, `generateMetadata`, some SSG
- **Admin nav**: Sidebar with links to Dashboard/Profil/Pengumuman/Media
- **Media**: File uploads to `public/uploads/`, metadata in `data/media.json`

## Feature Breakdown

### ENG-01: Event Calendar
- New data type: `Event` (id, title, date, time?, location, description, category, slug)
- Schema and seed data in `schema.ts`
- Service: `events-service.ts` (JSON-backed)
- Public page: `/events` with month view + category filter
- Admin CRUD: event list, create, edit pages
- Server Actions for event CRUD

### ENG-02: Downloadable Forms
- New data type: `Document` (id, title, description, category, fileUrl, fileSize)
- Admin: upload form (accepts PDF, DOCX, etc.)
- Public page: `/downloads` with category groups
- Storage: files in `public/uploads/documents/`, metadata in `data/documents.json`

### ADVC-01: Content Scheduling
- Extend Announcement type: add `publishedUntil?: string` (ISO date) field
- Services filter: only show content within publish window
- Admin forms: add "Publish until" date picker
- Future content shown as "Scheduled" in admin list

### ADVC-02: Homepage Spotlight
- Extend Announcement type: add `spotlight: boolean` field
- Admin: checkbox in create/edit form
- Homepage: featured section with spotlight items
- Empty state: falls back to latest announcements

## Dependencies

- All plans depend on Phase 3 patterns (JSON storage, admin forms, Server Actions)
- 04-01 and 04-02 are independent (different data types)
- 04-03 depends on existing announcement schema (extends existing types)

## Risk Areas

1. **Event calendar UX** — Full month calendar grid is complex to build from scratch. Consider simpler list view with date categories for MVP.
2. **File upload types** — For downloadable forms, accept PDF and common document formats. Keep max size reasonable (10MB).
3. **Content scheduling edge cases** — Multiple timezone awareness; use UTC dates consistently.
