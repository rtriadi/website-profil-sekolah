import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getMenuSettings } from "@/lib/content/menu-service";

export const dynamic = "force-dynamic";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuSettings = getMenuSettings();

  return (
    <>
      <SiteHeader menuSettings={menuSettings} />
      <Breadcrumbs />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
