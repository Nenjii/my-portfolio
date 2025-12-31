import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CursorSpotlight from "@/components/layout/CursorSpotlight";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ninoduque.vercel.app"),
  title: "Niño Duque | Developer & System Administrator",
  description: "Portfolio of Niño Duque — a creative developer, system administrator, and IT instructor based in the Philippines. Specializing in web development, cybersecurity, and network infrastructure.",
  keywords: ["web developer", "system administrator", "portfolio", "Philippines", "Next.js", "React", "cybersecurity", "IT instructor"],
  authors: [{ name: "Niño Duque" }],
  creator: "Niño Duque",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ninoduque.vercel.app",
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
                  // Check system preference
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (prefersDark) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AnimatedBackground />
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
