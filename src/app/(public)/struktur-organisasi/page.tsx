import { getOrgStructure } from "@/lib/content/org-service";
import type { OrgNode } from "@/lib/content/schema";

interface OrgNodeWithChildren extends OrgNode {
  children?: OrgNodeWithChildren[];
}

function buildTree(members: OrgNode[]): OrgNodeWithChildren[] {
  const map: Record<string, OrgNodeWithChildren> = {};
  
  // Sort members by sortOrder first
  const sorted = [...members].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  
  sorted.forEach((m) => {
    map[m.id] = { ...m, children: [] };
  });

  const roots: OrgNodeWithChildren[] = [];

  sorted.forEach((m) => {
    const node = map[m.id];
    if (m.parentId === null || !m.parentId) {
      roots.push(node);
    } else {
      const parent = map[m.parentId];
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    }
  });

  return roots;
}

function OrgCard({ node, level }: { node: OrgNodeWithChildren; level: number }) {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      <div className={`rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-900/50 p-5 text-center shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-indigo-500/30 transition-all duration-300 ${level === 0 ? "min-w-[220px] ring-2 ring-indigo-500/10" : "min-w-[190px]"}`}>
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-xl font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/15">
          {node.name.charAt(0)}
        </div>
        <p className="text-sm font-heading font-bold text-slate-900 dark:text-white leading-tight">{node.name}</p>
        <p className="mt-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{node.position}</p>
        {node.description && (
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-white/5 pt-1.5 leading-relaxed">{node.description}</p>
        )}
      </div>

      {hasChildren && (
        <>
          <div className="h-6 w-0.5 bg-indigo-500/20 dark:bg-indigo-500/30" />
          <div className="flex flex-wrap justify-center gap-6 relative px-4">
            {node.children!.map((child) => (
              <OrgCard key={child.id} node={child} level={level + 1} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function OrgStructurePage() {
  const org = getOrgStructure();
  const tree = buildTree(org.members);

  return (
    <>
      <section className="border-b border-slate-200 dark:border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h1 className="text-center text-3xl font-bold text-white font-heading">{org.title}</h1>
          <p className="mt-2 text-center text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {org.description || "Struktur organisasi resmi dan kepemimpinan sekolah"}
          </p>
        </div>
      </section>

      <section className="border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-950/20 min-h-[60vh] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {tree.length === 0 ? (
            <p className="text-center text-slate-500 dark:text-slate-400">Data struktur organisasi belum tersedia.</p>
          ) : (
            <div className="space-y-12 overflow-x-auto pb-6 scrollbar-thin">
              {tree.map((root) => (
                <div key={root.id} className="flex flex-col items-center min-w-[600px] py-4">
                  <OrgCard node={root} level={0} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
