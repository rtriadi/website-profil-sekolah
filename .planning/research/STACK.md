# Stack Research — School Profile Website

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
