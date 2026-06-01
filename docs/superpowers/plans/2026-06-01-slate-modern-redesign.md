# Slate Modern Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign both the public frontend and the admin backend dashboard using Option A (Slate Modern Premium, Collapsible Sidebar, Premium styling).

**Architecture:** Update globals.css to import premium typography and styles, then modify SiteHeader, SiteFooter, public Page, AdminShell, and form components with refined Tailwind styles.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, Hugeicons.

---

## Chunk 1: Global Theme & Typography Foundation

### Task 1: Setup Google Fonts & Premium CSS Tokens
**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update globals.css with premium Google Font imports, custom design tokens, and luxury animation utilities**
  
  We will import `Outfit` and `Inter` from Google Fonts and update CSS variables for backgrounds, borders, active focus glows, and layout animations.
  
- [ ] **Step 2: Update root layout to apply global font variables and basic structure**
  
  Ensure metadata and layouts leverage the updated fonts properly.
  
- [ ] **Step 3: Run typescript verification check**
  
  Run: `npm run typecheck`
  Expected: PASS
  
- [ ] **Step 4: Commit foundation changes**
  
  ```bash
  git add src/app/globals.css src/app/layout.tsx
  git commit -m "feat(design): setup Outfit & Inter fonts with premium slate variables"
  ```

---

## Chunk 2: Public Frontend Redesign (Premium Glassmorphism)

### Task 2: Redesign SiteHeader & SiteFooter
**Files:**
- Modify: `src/components/layout/site-header.tsx`
- Modify: `src/components/layout/site-footer.tsx`

- [ ] **Step 1: Implement floating glassmorphism blur SiteHeader**
  
  Add floating navigation bar with border-white/10 background, Outfit font branding, and glowing slide-under indicator lines.
  
- [ ] **Step 2: Implement clean responsive SiteFooter**
  
  Apply Slate-950 background, grid of secondary links, sky-blue accent icons, and smooth transitions.
  
- [ ] **Step 3: Verify build compiles successfully**
  
  Run: `npm run build`
  Expected: Successful compilation without errors
  
- [ ] **Step 4: Commit public layout redesign**
  
  ```bash
  git add src/components/layout/site-header.tsx src/components/layout/site-footer.tsx
  git commit -m "feat(design): redesign header and footer with premium glassmorphism"
  ```

### Task 3: Redesign Homepage (Public Frontend)
**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Rewrite public homepage with space-mesh hero banner, dynamic statistics grid, spotlight announcements, and 3D hover cards**
  
  Apply rich mesh gradients, counter layout cards, large headline typographies, and sleek action buttons.
  
- [ ] **Step 2: Run verification and type checks**
  
  Run: `npm run typecheck`
  Expected: PASS
  
- [ ] **Step 3: Commit public homepage redesign**
  
  ```bash
  git add src/app/page.tsx
  git commit -m "feat(design): implement space-mesh hero, stats, and 3D card grid on homepage"
  ```

---

## Chunk 3: Admin Dashboard Redesign (shadcn/ui Sidebar Layout)

### Task 4: Redesign Admin Navigation Shell
**Files:**
- Modify: `src/components/admin/admin-shell.tsx`

- [ ] **Step 1: Build Collapsible Sidebar Dashboard Shell in AdminShell**
  
  Create interactive collapsible navigation, premium Outfit brand badge, active page indicator border glows, user profile footer, and elegant slate shadow elements.
  
- [ ] **Step 2: Verify typescript compilation**
  
  Run: `npm run typecheck`
  Expected: PASS
  
- [ ] **Step 3: Commit admin shell updates**
  
  ```bash
  git add src/components/admin/admin-shell.tsx
  git commit -m "feat(design): implement collapsible modern admin shell dashboard"
  ```

### Task 5: Redesign Admin Editors & Forms
**Files:**
- Modify: `src/components/admin/profile-form.tsx`
- Modify: `src/components/admin/announcement-form.tsx`

- [ ] **Step 1: Redesign Profile Form to align with shadcn elements**
  
  Update inputs, textareas, and buttons with sky/indigo glows on focus and clean slate grids.
  
- [ ] **Step 2: Redesign Announcement Form to match premium editors**
  
  Apply clean form groups, card wrappers, and responsive buttons.
  
- [ ] **Step 3: Perform ultimate production build test**
  
  Run: `npm run build`
  Expected: Successful Next.js build
  
- [ ] **Step 4: Commit admin form component upgrades**
  
  ```bash
  git add src/components/admin/profile-form.tsx src/components/admin/announcement-form.tsx
  git commit -m "feat(design): redesign admin forms with shadcn/ui sleek inputs and button states"
  ```
