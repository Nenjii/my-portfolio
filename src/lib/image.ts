/**
 * Hosts we have whitelisted in next.config `images.remotePatterns` and can
 * therefore run through the Next.js image optimizer (WebP/AVIF + srcset).
 * Project cover images are uploaded to Firebase Storage, so those optimize;
 * for any other (manually pasted) host we render the image `unoptimized` so
 * next/image still lazy-loads it instead of throwing on an unconfigured host.
 */
const OPTIMIZABLE_HOSTS = [
  "firebasestorage.googleapis.com",
  "firebasestorage.app", // matches *.firebasestorage.app
  "images.unsplash.com",
];

export function canOptimize(url?: string | null): boolean {
  if (!url) return false;
  try {
    const { hostname } = new URL(url);
    return OPTIMIZABLE_HOSTS.some((h) => hostname === h || hostname.endsWith(`.${h}`) || hostname.endsWith(h));
  } catch {
    return false;
  }
}
