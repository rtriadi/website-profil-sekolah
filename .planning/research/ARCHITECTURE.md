# Architecture Research — School Profile Website

## Core Components

1. **Public Web App**
   - School profile pages, announcements, galleries, contact information
2. **Admin Content Interface**
   - Authenticated area for managing profile content and publishing updates
3. **Content API / Server Actions**
   - Validated mutations for creating/updating content entities
4. **Persistence Layer**
   - Relational storage for structured records + object storage for media

## Data Flow

- Admin user authenticates → creates/updates content → server validates and persists.
- Public pages fetch published content → render SSR/streamed UI for fast first load.
- Media assets served via CDN/object storage URLs.

## Build Order Implications

1. Foundation (project setup, schema, auth baseline)
2. Public profile rendering
3. Admin CRUD for profile/news content
4. Enhancements (gallery, filtering, richer sections)
