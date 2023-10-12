import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Link } from "@/libs/navigator";
import { base } from "@/components/style";
import { notFound } from "next/navigation";
import { useLocale } from "next-intl";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ioh",
  description: "Generated by create next app",
};

const locales = ["en", "ko"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();
  if (!locales.includes(locale as any)) notFound();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <header className={base.center}>
          <h3>ioh</h3>
          <nav className="flex gap-5">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/blog">Blog</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
