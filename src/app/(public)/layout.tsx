import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getMenuSettingsAsync } from "@/lib/content/menu-service";
import { getSchoolProfile } from "@/lib/content/profile-service";

export const dynamic = "force-dynamic";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuSettings, profile] = await Promise.all([
    getMenuSettingsAsync(),
    getSchoolProfile(),
  ]);

  const schoolName = profile.identity.name;

  return (
    <>
      <SiteHeader menuSettings={menuSettings} schoolName={schoolName} />
      <Breadcrumbs />
      <main className="flex-1">{children}</main>
      <SiteFooter schoolName={schoolName} />
      <WhatsAppButton />
    </>
  );
}
