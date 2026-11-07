"use client";

import { useEffect } from "react";
import { AuthProvider } from "@/providers/auth-provider";

/**
 * Layout for the merged CMS area (/login and /admin).
 *
 * It provides Firebase AuthProvider ONLY for these routes, so the public
 * portfolio pages never pull in firebase/auth. The portfolio's decorative
 * chrome (animated background, cursor spotlight, etc.) is suppressed on
 * these paths by <SiteChrome> in the root layout.
 */
export default function AdminAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const previous = document.title;
    document.title = "CMS Admin";
    return () => {
      document.title = previous;
    };
  }, []);

  return <AuthProvider>{children}</AuthProvider>;
}
