/**
 * One-off: add the current ArtHaus role to the `experiences` collection.
 * Idempotent — skips if an ArtHaus entry already exists. Add-only (does not
 * modify any existing record).
 *
 *   node --env-file=.env.local scripts/add-arthaus.mjs           # dry run
 *   node --env-file=.env.local scripts/add-arthaus.mjs --write    # apply
 *
 * If Firestore rules require an authenticated admin to write, also pass:
 *   ADMIN_EMAIL=… ADMIN_PASSWORD=… node --env-file=.env.local scripts/add-arthaus.mjs --write
 */
import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore, collection, getDocs, addDoc, serverTimestamp,
} from "firebase/firestore";

const WRITE = process.argv.includes("--write");

const cfg = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
if (!cfg.projectId) {
  console.error("Missing Firebase config. Run with: node --env-file=.env.local scripts/add-arthaus.mjs");
  process.exit(1);
}

const app = getApps().length ? getApps()[0] : initializeApp(cfg);
const db = getFirestore(app);

const ARTHAUS = {
  company: "ArtHaus Co.",
  position: "Graphic Designer / Web Developer",
  location: "Tuguegarao City, Cagayan",
  startDate: "2026-10-01",
  endDate: null,
  isCurrent: true,
  description:
    "Design and develop brand and web experiences for ArtHaus — including a full WordPress/Elementor site redesign (arthausco.ph) with click-through mockups and a custom plugin — alongside ongoing graphic design for marketing collateral.",
  responsibilities: [
    "Design marketing and brand collateral using Adobe Creative Suite, Illustrator, and Canva.",
    "Build and maintain responsive web experiences with WordPress, Elementor, and custom plugins.",
    "Translate client requirements into high-impact visuals and click-through mockups.",
  ],
  technologies: ["WordPress", "Elementor", "PHP", "Figma", "Adobe Photoshop", "Illustrator"],
  companyLogo: "",
  companyUrl: "https://arthausco.ph",
};

async function optionalSignIn() {
  const email = process.env.ADMIN_EMAIL, password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;
  const { getAuth, signInWithEmailAndPassword } = await import("firebase/auth");
  await signInWithEmailAndPassword(getAuth(app), email, password);
  console.log(`Signed in as ${email}.`);
}

async function main() {
  console.log(`\n=== add-arthaus ${WRITE ? "(WRITE)" : "(dry run)"} ===\n`);
  await optionalSignIn();

  const snap = await getDocs(collection(db, "experiences"));
  const existing = snap.docs.find((d) => (d.data().company || "").toLowerCase().includes("arthaus"));
  if (existing) {
    console.log(`ArtHaus entry already exists (id ${existing.id}) — nothing to do.`);
    process.exit(0);
  }

  console.log(`Will add: "${ARTHAUS.position}" @ "${ARTHAUS.company}" (start ${ARTHAUS.startDate}, current)`);
  if (!WRITE) {
    console.log("\nDry run only. Re-run with --write to apply.\n");
    process.exit(0);
  }

  const ref = await addDoc(collection(db, "experiences"), {
    ...ARTHAUS, createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
  });
  console.log(`\nAdded ArtHaus experience (id ${ref.id}).\n`);
  process.exit(0);
}

main().catch((err) => {
  console.error("\nFailed:", err?.code || "", err?.message || err);
  if (String(err?.code || "").includes("permission-denied")) {
    console.error("Firestore rules blocked the write. Add it via the admin panel, or pass ADMIN_EMAIL/ADMIN_PASSWORD.");
  }
  process.exit(1);
});
