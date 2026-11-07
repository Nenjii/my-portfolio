import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/cms/firebase";

/**
 * Uploads a cover image to Firebase Storage and returns its public URL.
 * Separated for reuse and to keep UI components focused on UI concerns.
 */
export async function uploadCover(file: File) {
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-");
  const objectRef = ref(storage, `covers/${crypto.randomUUID()}-${safeName}`);
  const snapshot = await uploadBytes(objectRef, file);
  return getDownloadURL(snapshot.ref);
}
