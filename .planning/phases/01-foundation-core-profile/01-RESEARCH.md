# Phase 1 Research: Foundation & Core Profile

## Objective

Research the safest implementation path for Phase 1 so the team can deliver core public profile pages and admin authentication baseline with minimal rework.

## Inputs Considered

- `.planning/ROADMAP.md` (Phase 1 goal + criteria)
- `.planning/REQUIREMENTS.md` (PROF-01, PROF-02, ADMN-01, UX-01)
- `.planning/PROJECT.md` (core value + constraints)
- `.planning/research/SUMMARY.md` and stack/architecture research artifacts

## Recommended Technical Direction

1. **Scaffold Next.js App Router foundation first**
   - Build stable route/layout structure before feature implementation.
   - Keep public content pages server-rendered for SEO and fast first paint.

2. **Define minimal content schema for phase scope**
   - Core entities needed now:
     - `schoolProfile` (identity, address, contact, accreditation)
     - `schoolNarrative` (history, vision, mission)
     - `adminUser` (staff auth identity)
   - Delay broader content entities (announcements/media) to later phases.

3. **Implement admin auth baseline with role guardrails**
   - Support staff login to a protected admin route namespace.
   - Enforce authenticated server-side checks for admin route access.

4. **Mobile-first baseline UI system**
   - Establish typography scale, spacing tokens, and shared layout primitives.
   - Ensure profile pages pass basic responsive checks on common phone widths.

## Existing Patterns / Constraints

- Greenfield project: no legacy code patterns to preserve yet.
- Project constraints demand maintainability and non-technical operability.
- Avoid overbuilding CMS features in this phase; focus on baseline architecture and auth.

## Risk Areas and Mitigations

1. **Risk:** Over-scoping Phase 1 with later-phase entities.
   - **Mitigation:** Limit schema and routes to mapped REQ IDs only.

2. **Risk:** Auth implementation blocks content work.
   - **Mitigation:** Keep auth scope narrow (sign-in + protected admin shell) and avoid role matrix expansion now.

3. **Risk:** Inconsistent mobile behavior from ad-hoc styling.
   - **Mitigation:** Introduce shared layout components and enforce a single responsive baseline.

## Planning Guidance for PLAN.md

- Separate work into three plans to reduce coupling:
  1. Foundation + data contracts
  2. Public core profile pages
  3. Admin authentication baseline
- Wave ordering should respect dependency flow: foundation first, then public/admin in parallel where possible.
- Each plan must include explicit acceptance checks tied to roadmap success criteria.

## Research Outcome

## RESEARCH COMPLETE

Phase 1 has a clear low-risk implementation strategy that preserves roadmap intent and keeps future phases unblocked.
