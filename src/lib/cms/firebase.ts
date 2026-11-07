import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { app } from "@/lib/firebase";

/**
 * Admin-only Firebase services.
 *
 * Kept separate from `@/lib/firebase` (which exports only `db`) so that the
 * public portfolio bundle never pulls in firebase/auth or firebase/storage.
 * Only the CMS area (/login, /admin) imports from here.
 */

// Firebase Authentication — admin login / session guard
export const auth = getAuth(app);

// Firebase Storage — admin cover-image uploads
export const storage = getStorage(app);
