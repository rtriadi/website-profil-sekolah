import { ThemeProvider } from "@/components/theme/theme-provider";
import "./globals.css";
import { getSchoolProfile } from "@/lib/content/profile-service";

export async function generateMetadata() {
  const profile = await getSchoolProfile();
  const siteName = profile.identity.name || "Website Profil Sekolah";
  const siteDescription =
    profile.heroSubtitle ||
    "Profil resmi sekolah — informasi identitas, sejarah, visi, misi, program, fasilitas, prestasi, dan pengumuman terkini";

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://sekolah-anda.vercel.app"
    ),
    openGraph: {
      type: "website",
      locale: "id_ID",
      siteName,
      title: siteName,
      description: siteDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description: siteDescription,
    },
    icons: {
      icon: "/favicon.svg",
    },
    manifest: "/manifest.json",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem("school-color-theme") || "indigo";
                document.documentElement.setAttribute("data-color-theme", theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
