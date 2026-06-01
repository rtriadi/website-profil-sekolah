# Design Specification: Slate Modern Redesign

This document outlines the visual and architectural specification for the total redesign of both the public frontend and the admin backend dashboard for the **Website Profil Sekolah** application.

---

## 🎨 Visual Identity & Theme System

### Core Color Palette (Tailwind & CSS Variables)
- **Backgrounds**:
  - Public Dark Mode (luxury default for landing/home): Deep Slate `#0b0f19` (slate-950)
  - Public Light Mode (for clean content readability): Pure White `#ffffff` with Soft Slate `#f8fafc` (slate-50)
  - Admin Dashboard Dark (default): Pure Slate-950 `#020617` with Slate-900 `#0f172a` for sidebars and widgets.
- **Accents**:
  - Primary Accent: Indigo-500 `#6366f1` / Indigo-600 `#4f46e5`
  - Secondary Accent: Sky-400 `#38bdf8` / Sky-500 `#0ea5e9`
  - Success/Status: Emerald-500 `#10b981`
  - Warning/Status: Amber-500 `#f59e0b`

### Typography
- **Headings (H1, H2, H3)**: Google Fonts `Outfit` — a modern, clean sans-serif typeface designed for premium impact.
- **Body & Controls**: Google Fonts `Inter` — industry standard for UI controls, inputs, and paragraphs to ensure maximum readability.

### Design Elements & Details
- **Glassmorphism**: Mild translucent backgrounds using `bg-white/5 backdrop-blur-md` on dark, or `bg-white/70 backdrop-blur-md` on light. Border stroke color set to extremely faint values (`border-white/10` or `border-slate-200/50`).
- **Interactive Micro-animations**: Smooth scaling, floating animations for spotlight cards, and glowing border gradients on focus/hover.

---

## 🌐 Public Frontend Structure

### Header & Navigation
- Floating header container (`sticky top-4`) with glassmorphism blur and subtle slide-in micro-animation.
- Glowing indicator underline for active navigation items.

### Homepage Sections (Premium Flow)
1. **Interactive Space-Mesh Hero Banner**: Sleek dark base with rotating gradient mesh backdrop. Large typography featuring a bold school motto, key primary/secondary CTA actions, and floating badge accents.
2. **Dynamic Metrics/Statistics**: Grid display with 3D shadow borders showcasing:
   - 1500+ Siswa Aktif
   - 80+ Guru & Staf Profesional
   - 12+ Program Unggulan
   - Terakreditasi "A"
3. **Spotlight Announcement**: A dedicated, attention-grabbing interactive card at the top/hero to capture vital news with pulsing status beacons.
4. **Programs & Facilities Section**: Grid cards featuring smooth tilt-on-hover effects, elegant iconography, and deep detail slide-ins.
5. **Latest Announcements Feed**: Streamlined horizontal grid featuring modern date blocks, read-time labels, and hover card elevation.

---

## ⚙️ Admin Dashboard Layout (CMS Backend)

### Sidebar Modern Navigation
- Collapsible sidebar menu that can transform into compact mini-icons for extra space.
- Subtle left-border glows on active routes.
- Fully matching the design principles of **shadcn/ui Dashboard Shell**.

### Content & Form Redesign (shadcn/ui Inspired)
- Form inputs, textareas, and selectors feature clean slate-200 (light) or slate-800 (dark) borders with a transition to highly responsive focus states (`ring-2 ring-sky-500 border-sky-400`).
- Table actions display clean status badges (Draft/Published) and minimal, polished action dropdowns.

---

## 🛠️ Verification & Quality Assurance

- **Responsive Viewport Checks**: Desktop (1440px), Tablet (768px), and Mobile (375px).
- **Interactive Testing**: Verify sidebar collapse state, modal dialog inputs, responsive hover animations, and form validation flows.
