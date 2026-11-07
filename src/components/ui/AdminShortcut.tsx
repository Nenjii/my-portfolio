"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Secret keyboard entry point to the CMS.
 *
 * Type the word below anywhere on the public site (outside of a text field)
 * and you'll be taken to the admin login. There is no visible link, so the
 * admin stays hidden; the real protection is the Firebase login behind /login.
 *
 * Change SECRET to whatever you like (keep it lowercase letters).
 */
const SECRET = "admin";
const RESET_MS = 1200; // time window to type the sequence

export default function AdminShortcut() {
  const router = useRouter();

  useEffect(() => {
    let buffer = "";
    let timer: ReturnType<typeof setTimeout> | undefined;

    const isTyping = () => {
      const el = document.activeElement as HTMLElement | null;
      if (!el) return false;
      const tag = el.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      // Ignore when typing in a field, or when using modifier combos
      if (isTyping() || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key.length !== 1 || !/[a-z]/i.test(e.key)) return;

      buffer = (buffer + e.key.toLowerCase()).slice(-SECRET.length);

      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        buffer = "";
      }, RESET_MS);

      if (buffer === SECRET) {
        buffer = "";
        router.push("/login");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (timer) clearTimeout(timer);
    };
  }, [router]);

  return null;
}
