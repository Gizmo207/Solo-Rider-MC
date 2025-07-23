import 'dotenv/config';
import fetch from 'node-fetch';
import * as admin from 'firebase-admin';

// Load Firebase Admin credentials from env
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
    credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
  });
}
const db = admin.firestore();

// Printful API
const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;
const PRINTFUL_PRODUCT_ID = process.env.PRINTFUL_PRODUCT_ID; // Set this in your .env
if (!PRINTFUL_API_KEY || !PRINTFUL_PRODUCT_ID) {
  throw new Error('Missing PRINTFUL_API_KEY or PRINTFUL_PRODUCT_ID in environment');
}

async function fetchPrintfulProduct(productId: string) {
  const res = await fetch(`https://api.printful.com/products/${productId}`, {
    headers: { Authorization: `Bearer ${PRINTFUL_API_KEY}` },
  });
  if (!res.ok) throw new Error(`Printful API error: ${res.status}`);
  return res.json();
}

async function main() {
  const { result } = await fetchPrintfulProduct(PRINTFUL_PRODUCT_ID as string);
  const variantImages: { [color: string]: string } = {};
  for (const variant of result.variants) {
    const color = variant.color;
    if (color && variant.files && variant.files[0]?.preview_url) {
      // Use the first file's preview_url for the color
      if (!variantImages[color]) {
        variantImages[color] = variant.files[0].preview_url;
      }
    }
  }
  // Pick a default image
  const defaultImage = Object.values(variantImages)[0] || '';

  // Update the Firestore product (assumes only one tee product)
  const productsRef = db.collection('products');
  const snapshot = await productsRef.where('category', '==', 'tees').get();
  if (snapshot.empty) throw new Error('No tee product found in Firestore');
  const docRef = snapshot.docs[0].ref;
  await docRef.update({
    imagesByColor: variantImages,
    imageUrl: defaultImage,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  console.log('✅ Synced Printful images to Firestore product:', variantImages);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
