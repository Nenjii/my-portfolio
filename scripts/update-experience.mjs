/**
 * One-time Firestore update: add the ArtHaus role and close out the
 * CSU Carig IT Instructor role.
 *
 * Run from the project root:
 *
 *   # Preview only (no writes) — safe, shows what WOULD change:
 *   node --env-file=.env.local scripts/update-experience.mjs
 *
 *   # Actually apply the changes:
 *   node --env-file=.env.local scripts/update-experience.mjs --write
 *
 * If your Firestore security rules require an authenticated admin to write
 * the `experiences` collection (they probably do), also provide credentials:
 *
 *   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=yourpass \
 *     node --env-file=.env.local scripts/update-experience.mjs --write
 *
 * This uses the same client SDK the site uses, so it is subject to the same
 * security rules. If a write is denied, use your admin panel instead.
 */

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const WRITE = process.argv.includes("--write");

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.projectId) {
  console.error(
    "Missing Firebase config. Run with: node --env-file=.env.local scripts/update-experience.mjs"
  );
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// The new current role at ArtHaus.
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

const IT_INSTRUCTOR_END_DATE = "2026-10-31";

function looksLikeTeachingRole(data) {
  const pos = (data.position || "").toLowerCase();
  const company = (data.company || "").toLowerCase();
  const teachingTitle = ["professor", "instructor", "faculty"].some((t) => pos.includes(t));
  const csu = company.includes("cagayan state") || company.includes("csu");
  return data.isCurrent === true && (teachingTitle || csu);
}

async function optionalSignIn() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;
  const { getAuth, signInWithEmailAndPassword } = await import("firebase/auth");
  const auth = getAuth(app);
  await signInWithEmailAndPassword(auth, email, password);
  console.log(`Signed in as ${email}.`);
}

async function main() {
  console.log(`\n=== update-experience ${WRITE ? "(WRITE MODE)" : "(dry run — no writes)"} ===\n`);
  await optionalSignIn();

  const snapshot = await getDocs(collection(db, "experiences"));
  const teaching = snapshot.docs.filter((d) => looksLikeTeachingRole(d.data()));

  // 1) Close out the teaching role(s).
  if (teaching.length === 0) {
    console.log("• No current teaching role found to close out (nothing to update).");
  } else {
    for (const d of teaching) {
      const data = d.data();
      console.log(
        `• Close out: "${data.position}" @ "${data.company}" (id ${d.id}) -> endDate ${IT_INSTRUCTOR_END_DATE}, isCurrent false`
      );
      if (WRITE) {
        await updateDoc(doc(db, "experiences", d.id), {
          endDate: IT_INSTRUCTOR_END_DATE,
          isCurrent: false,
          updatedAt: serverTimestamp(),
        });
      }
    }
  }

  // 2) Add ArtHaus (skip if an entry for the same company already exists).
  const existingArthaus = snapshot.docs.find(
    (d) => (d.data().company || "").toLowerCase().includes("arthaus")
  );
  if (existingArthaus) {
    console.log(`• ArtHaus entry already exists (id ${existingArthaus.id}) — skipping add.`);
  } else {
    console.log(`• Add: "${ARTHAUS.position}" @ "${ARTHAUS.company}" (start ${ARTHAUS.startDate}, current)`);
    if (WRITE) {
      const ref = await addDoc(collection(db, "experiences"), {
        ...ARTHAUS,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      console.log(`  created id ${ref.id}`);
    }
  }

  console.log(
    WRITE
      ? "\nDone. Changes applied.\n"
      : "\nDry run complete. Re-run with --write to apply.\n"
  );
  process.exit(0);
}

main().catch((err) => {
  console.error("\nUpdate failed:", err?.message || err);
  if (String(err?.code || "").includes("permission-denied")) {
    console.error(
      "Permission denied by Firestore rules. Provide ADMIN_EMAIL/ADMIN_PASSWORD, or use your admin panel instead."
    );
  }
  process.exit(1);
});
