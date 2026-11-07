"use client";

import { usePathname } from "next/navigation";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CursorSpotlight from "@/components/layout/CursorSpotlight";
import BackToTop from "@/components/ui/BackToTop";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import AdminShortcut from "@/components/ui/AdminShortcut";

/**
 * Wraps the public portfolio with its decorative chrome (animated background,
 * scroll progress, cursor spotlight, back-to-top) and the secret admin
 * shortcut. On the merged CMS routes (/login, /admin) none of this renders,
 * so the admin keeps its own clean, full-screen UI.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const isAdminArea = pathname === "/login" || pathname.startsWith("/admin");

  if (isAdminArea) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatedBackground />
      <ScrollProgress />
      <CursorSpotlight />
      <AdminShortcut />
      {children}
      <BackToTop />
    </>
  );
}
