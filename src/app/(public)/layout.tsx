import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { getMenuSettings } from "@/lib/content/menu-service";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menuSettings = getMenuSettings();

  return (
    <>
      <SiteHeader menuSettings={menuSettings} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
