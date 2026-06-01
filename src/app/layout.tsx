import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Website Profil Sekolah",
  description:
    "Profil resmi sekolah — informasi identitas, sejarah, visi, dan misi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="flex min-h-screen flex-col">
        {children}
      </body>
    </html>
  );
}
