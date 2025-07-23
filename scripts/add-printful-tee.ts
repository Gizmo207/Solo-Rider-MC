import 'dotenv/config';

import * as admin from 'firebase-admin';

// Load service account credentials from environment variables
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
  await db.collection('products').add({
    title: 'Solo-Rider-MC Unisex T-Shirt',
    price: 40,
    description: 'Premium Bella + Canvas 3001U tee. Printful fulfillment. Choose your color and size!',
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    imageUrl: '/images/products/solo-tee.jpg', // Update with your real image path
    category: 'tees',
    active: true,
    inventory: 100,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  console.log('✅ Printful tee added to Firestore (Admin SDK)!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
