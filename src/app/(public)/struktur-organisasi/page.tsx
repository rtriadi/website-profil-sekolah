import { getOrgStructure } from "@/lib/content/org-service";
import type { OrgNode } from "@/lib/content/schema";

function buildTree(members: OrgNode[]): OrgNode[] {
  const roots = members.filter((m) => m.parentId === null);
  const children = members.filter((m) => m.parentId !== null);
  return roots.map((root) => ({
    ...root,
    children: children.filter((c) => c.parentId === root.id),
  }));
}

function OrgCard({ node, level }: { node: OrgNode & { children?: OrgNode[] }; level: number }) {
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      <div className={`rounded-lg border border-slate-200 bg-white p-4 text-center shadow-sm ${level === 0 ? "min-w-[200px]" : "min-w-[180px]"}`}>
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-600">
          {node.name.charAt(0)}
        </div>
        <p className="text-sm font-semibold text-slate-900">{node.name}</p>
        <p className="mt-0.5 text-xs text-slate-500">{node.position}</p>
        {node.description && (
          <p className="mt-1 text-xs text-slate-400">{node.description}</p>
        )}
      </div>

      {hasChildren && (
        <>
          <div className="h-4 w-px bg-slate-300" />
          <div className="flex flex-wrap justify-center gap-4">
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
    <div className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">{org.title}</h1>
        <p className="mb-10 text-slate-600">{org.description}</p>

        {tree.length === 0 ? (
          <p className="text-slate-500">Data struktur organisasi belum tersedia.</p>
        ) : (
          <div className="space-y-6">
            {tree.map((root) => (
              <div key={root.id} className="flex flex-col items-center">
                <OrgCard node={root} level={0} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
