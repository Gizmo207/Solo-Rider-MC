import 'dotenv/config';
import * as admin from 'firebase-admin';

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
let privateKey = process.env.FIREBASE_PRIVATE_KEY;
if (privateKey && privateKey.startsWith('"') && privateKey.endsWith('"')) {
  privateKey = privateKey.slice(1, -1).replace(/\\n/g, '\n');
}

if (!projectId || !clientEmail || !privateKey) {
  throw new Error('Missing FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, or FIREBASE_PRIVATE_KEY in environment');
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

const db = admin.firestore();

async function main() {
  const productsRef = db.collection('products');
  const snapshot = await productsRef.get();
  let kept = 0, deleted = 0;
  for (const doc of snapshot.docs) {
    const data = doc.data();
    // Keep only the tee (by title, update as needed)
    if (data.title === 'Solo-Rider-MC Unisex T-Shirt') {
      kept++;
      continue;
    }
    await doc.ref.delete();
    deleted++;
  }
  console.log(`✅ Deleted ${deleted} products. Kept ${kept} tee product(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
