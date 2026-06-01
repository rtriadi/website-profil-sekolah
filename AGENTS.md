<!-- GSD:project-start source:PROJECT.md -->
## Project

**Website Profil Sekolah**

A web application for schools to publish and maintain their official profile online. It presents school identity, programs, facilities, achievements, and announcements in a format that is easy for students, parents, and the wider community to access. The product prioritizes clear public information and simple content updates by school staff.

**Core Value:** School stakeholders can quickly find accurate, up-to-date school profile information from one trusted website.

### Constraints

- **Usability**: CMS/admin operations must be simple enough for school staff — avoids operational friction.
- **Responsiveness**: Mobile-friendly experience is mandatory — many visitors access school info from phones.
- **Maintainability**: Content management should not require developer intervention for routine updates.
- **Reliability**: Public profile and contact information must remain available and consistent — this is an official info source.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack (2026 baseline)
- **Frontend framework**: Next.js 16 + React 19 + TypeScript
- **Styling/UI**: Tailwind CSS + component primitives
- **Content model**: Structured CMS-backed content (profile, pages, announcements, galleries)
- **Data layer**: PostgreSQL (or managed equivalent) for admin and content metadata
- **Media storage**: Object storage/CDN for photos and assets
- **Auth (admin only)**: Email/password + role-based access for staff
- **Hosting**: Managed platform with CDN, HTTPS, and CI deploys
## Why this stack
- Fast SSR/SEO for discoverable public pages.
- Strong DX and maintainability for iterative school content updates.
- Good mobile performance and image optimization support.
- Clear upgrade path for later modules (admissions pages, forms, dashboards).
## What to avoid
- Building custom CMS from scratch too early.
- Over-complex microservices architecture for a profile-first MVP.
- Coupling content workflows to code deploys.
## Confidence
- Frontend/runtime choice: **High**
- CMS-backed model: **High**
- DB/media/auth baseline: **High**
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
