# Phase 2 Research: Information Publishing Experience

## Objective

Research the implementation path for Phase 2 so the team can deliver program/facilities pages and announcement reading experience.

## Inputs Considered

- `.planning/ROADMAP.md` (Phase 2 goal + criteria)
- `.planning/REQUIREMENTS.md` (PROF-03, CONT-01, CONT-02, UX-02)
- Existing codebase: Phase 1 content types, profile service pattern, profile route, auth config

## Recommended Technical Direction

1. **Extend content schema** — Add `SchoolProgram`, `Facility`, and `Announcement` types to `src/lib/content/schema.ts`. Announced MUST include publish date for recency sorting, slug for detail URL, and body content.

2. **Announcement routing** — Use `app/(public)/announcements/page.tsx` for list (sorted by date descending) and `app/(public)/announcements/[slug]/page.tsx` for detail pages. Static params via seed data.

3. **Program & Facilities routing** — Use `app/(public)/programs/page.tsx` for list and `app/(public)/programs/[slug]/page.tsx` for detail. Or single page with sections for both.

4. **Homepage** — Replace placeholder with hero section + navigation links to profile, announcements, programs.

5. **Service pattern** — Match Phase 1's `profile-service.ts` pattern: typed read functions backed by seed data, consumable from server components.

## Existing Patterns

- Service layer: async functions returning typed data from seed constants
- Routes: server-rendered static pages in `(public)` route group
- Components: section-based presentational components consuming typed props
- No client-side data fetching required

## Risk Areas

1. **Seed data growth** — Keep seed data minimal (2-3 items per entity). Database migration is Phase 3 scope.
2. **Homepage scope creep** — Limit to hero + nav links + latest announcements. No carousel/slider in this phase.
3. **Slug generation** — Use kebab-case from title. Ensure uniqueness for detail routes.

## Research Outcome

## RESEARCH COMPLETE

Phase 2 has a clear implementation path following Phase 1 patterns. Three plans: (1) programs & facilities, (2) announcements list, (3) announcement detail & homepage.
