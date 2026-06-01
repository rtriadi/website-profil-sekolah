"use client";

import type { StaffSession } from "@/lib/auth/config";
import { logoutAction } from "@/lib/actions/auth-actions";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Props {
  session: StaffSession;
  children: React.ReactNode;
}

export function AdminShell({ session, children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(true); // default open
  const pathname = usePathname();

  // Active link helper
  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Collapsible Left Sidebar */}
      <aside
        className={`relative z-20 flex flex-col bg-slate-950 text-slate-200 border-r border-white/5 transition-all duration-300 ease-in-out ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-white/5">
          <Link
            href="/admin"
            className={`flex items-center gap-2.5 font-heading font-bold transition-opacity hover:opacity-90 overflow-hidden ${
              collapsed ? "justify-center w-full" : ""
            }`}
          >
            <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-sky-400 flex flex-shrink-0 items-center justify-center text-sm text-slate-950 shadow-md">
              ⚡
            </span>
            {!collapsed && (
              <span className="bg-gradient-to-r from-white via-indigo-200 to-sky-200 bg-clip-text text-transparent truncate">
                Admin Panel
              </span>
            )}
          </Link>
        </div>

        {/* Sidebar Collapse Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-slate-400 hover:text-white transition-all shadow-md z-30"
          aria-label="Toggle Sidebar"
        >
          {collapsed ? (
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          ) : (
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          )}
        </button>

        {/* User Quick Info */}
        <div className="flex items-center gap-3 border-b border-white/5 px-4 py-4 overflow-hidden">
          <div className="h-9 w-9 flex-shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center text-sm font-extrabold text-slate-950 shadow-sm">
            {session.name?.charAt(0).toUpperCase() ?? "A"}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-white tracking-wide leading-tight">
                {session.name}
              </p>
              <p className="truncate text-[10px] text-slate-400 mt-0.5">{session.email}</p>
            </div>
          )}
        </div>

        {/* Sidebar Main Navigation */}
        <div className="flex-1 space-y-1.5 px-3 py-4 overflow-y-auto max-h-[calc(100vh-12rem)] scrollbar-thin">
          {/* Dashboard item */}
          <Link
            href="/admin"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold tracking-wide transition-all ${
              isActive("/admin")
                ? "bg-white/10 text-white shadow-[inset_0_0_8px_rgba(255,255,255,0.05)] border-l-2 border-indigo-500"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            {!collapsed && <span>Dashboard</span>}
          </Link>

          {/* Collapsible Profile Section */}
          <div className="space-y-0.5">
            {!collapsed ? (
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-300"
              >
                <span>Profil</span>
                <svg
                  className={`h-3 w-3 transition-transform duration-200 ${profileMenuOpen ? "rotate-90" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            ) : (
              <div className="h-px bg-white/5 my-3" />
            )}

            {(!collapsed ? profileMenuOpen : false) && (
              <div className="pl-4 space-y-0.5">
                {[
                  { href: "/admin/profile", label: "Identitas" },
                  { href: "/admin/profile/narrative", label: "Sejarah & Visi Misi" },
                  { href: "/admin/profile/programs", label: "Program" },
                  { href: "/admin/profile/facilities", label: "Fasilitas" },
                ].map((subLink) => (
                  <Link
                    key={subLink.href}
                    href={subLink.href}
                    className={`block rounded-lg px-3 py-1.5 text-xs font-medium tracking-wide transition-all ${
                      isActive(subLink.href)
                        ? "bg-white/10 text-white font-semibold"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {subLink.label}
                  </Link>
                ))}
              </div>
            )}

            {collapsed && (
              <div className="flex flex-col gap-0.5">
                {[
                  { href: "/admin/profile", label: "Id", tooltip: "Identitas" },
                  { href: "/admin/profile/narrative", label: "Se", tooltip: "Sejarah & Visi Misi" },
                  { href: "/admin/profile/programs", label: "Pr", tooltip: "Program" },
                  { href: "/admin/profile/facilities", label: "Fa", tooltip: "Fasilitas" },
                ].map((subLink) => (
                  <Link
                    key={subLink.href}
                    href={subLink.href}
                    title={subLink.tooltip}
                    className={`flex h-8 w-8 items-center justify-center mx-auto rounded-lg text-xs font-bold transition-all ${
                      isActive(subLink.href)
                        ? "bg-white/15 text-white"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {subLink.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="h-px bg-white/5 my-2" />

          {/* Standard CRUD Pages */}
          {[
            {
              href: "/admin/announcements",
              label: "Pengumuman",
              icon: (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              ),
            },
            {
              href: "/admin/media",
              label: "Media",
              icon: (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              ),
            },
            {
              href: "/admin/events",
              label: "Acara",
              icon: (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
              ),
            },
            {
              href: "/admin/documents",
              label: "Dokumen",
              icon: (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              ),
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold tracking-wide transition-all ${
                isActive(item.href)
                  ? "bg-white/10 text-white shadow-[inset_0_0_8px_rgba(255,255,255,0.05)] border-l-2 border-indigo-500"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}

          <div className="h-px bg-white/5 my-2" />

          {/* Advanced CRUD Pages */}
          {[
            {
              href: "/admin/ppdb",
              label: "PPDB",
              icon: (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.62 48.62 0 0112 20.9c2.785 0 5.5-2.31 6.574-4.826c.13-.3.2-.628.204-.961a60.436 60.436 0 00-.49-6.347m-14.024 0l7.518-3.42a1.75 1.75 0 011.5 0l7.517 3.42m-16.534 0C2.58 10.477 2.25 11.24 2.25 12c0 .762.33 1.523 1.006 2.053m11.675-4.564l-4.159-1.89a1.75 1.75 0 00-1.5 0L5.107 9.489m12.168 1.968c.677-.53 1.007-1.291 1.007-2.053 0-.762-.33-1.523-1.007-2.053m-11.675 4.564a59.57 59.57 0 018.259 0m-8.259 0L5.1 17.25c-.266.12-.562.185-.862.185a1.75 1.75 0 01-1.75-1.75v-1.632m12.168-2.618a59.57 59.57 0 01-8.259 0" />
                </svg>
              ),
            },
            {
              href: "/admin/teachers",
              label: "Guru",
              icon: (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              ),
            },
            {
              href: "/admin/org-structure",
              label: "Struktur Organisasi",
              icon: (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94-3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              ),
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold tracking-wide transition-all ${
                isActive(item.href)
                  ? "bg-white/10 text-white shadow-[inset_0_0_8px_rgba(255,255,255,0.05)] border-l-2 border-indigo-500"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}

          <div className="h-px bg-white/5 my-2" />

          {/* Additional Content Pages */}
          {[
            { href: "/admin/contact", label: "Kontak & Lokasi" },
            { href: "/admin/academic-calendar", label: "Kalender Akademik" },
            { href: "/admin/faq", label: "FAQ" },
            { href: "/admin/testimonies", label: "Testimoni" },
            { href: "/admin/achievements", label: "Prestasi" },
            { href: "/admin/gallery/albums", label: "Album Galeri" },
            { href: "/admin/tuition", label: "Biaya & SPP" },
            { href: "/admin/meal-menu", label: "Menu Makanan" },
            { href: "/admin/extracurriculars", label: "Ekstrakurikuler" },
            { href: "/admin/regulations", label: "Tata Tertib" },
            { href: "/admin/news", label: "Berita" },
            { href: "/admin/instagram", label: "Instagram" },
            { href: "/admin/virtual-tour", label: "Virtual Tour" },
            { href: "/admin/logs", label: "Log" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold tracking-wide transition-all ${
                isActive(item.href)
                  ? "bg-white/10 text-white shadow-[inset_0_0_8px_rgba(255,255,255,0.05)] border-l-2 border-indigo-500"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </div>

        {/* Sidebar Footer Logout Button */}
        <div className="border-t border-white/5 px-3 py-3.5 mt-auto">
          <button
            onClick={async () => {
              await logoutAction();
            }}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold tracking-wide text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
            {!collapsed && <span>Keluar</span>}
          </button>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <div className="flex flex-1 flex-col overflow-hidden min-h-screen">
        {/* Top Navbar Header */}
        <header className="flex h-16 items-center justify-between border-b border-slate-200/80 bg-white px-6 shadow-sm z-10">
          <div>
            <h2 className="font-heading text-sm font-bold text-slate-800 tracking-wide uppercase">
              {pathname.split("/").slice(2).join(" / ") || "Dashboard"}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-600">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
              Mode Admin
            </span>
          </div>
        </header>

        {/* Main Scrolling Content Area */}
        <main className="flex-1 overflow-auto bg-[#f8fafc] p-8 scrollbar-thin">
          <div className="mx-auto max-w-5xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
