import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CursorSpotlight from "@/components/layout/CursorSpotlight";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ninoduque.dev"),
  title: "Niño Duque | Developer & System Administrator",
  description: "Portfolio of Niño Duque — a creative developer, system administrator, and IT instructor based in the Philippines. Specializing in web development, cybersecurity, and network infrastructure.",
  keywords: ["web developer", "system administrator", "portfolio", "Philippines", "Next.js", "React", "cybersecurity", "IT instructor"],
  authors: [{ name: "Niño Duque" }],
  creator: "Niño Duque",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ninoduque.dev",
    siteName: "Niño Duque Portfolio",
    title: "Niño Duque | Developer & System Administrator",
    description: "Creative developer and system administrator crafting robust digital systems with clean, efficient code.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Niño Duque Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Niño Duque | Developer & System Administrator",
    description: "Creative developer and system administrator crafting robust digital systems with clean, efficient code.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ScrollProgress />
          <CursorSpotlight />
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
