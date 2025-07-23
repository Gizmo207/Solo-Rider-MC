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

async function listAllCollections() {
  const collections = await db.listCollections();
  console.log('Collections in Firestore:');
  for (const col of collections) {
    console.log('-', col.id);
  }
}

listAllCollections().catch((err) => {
  console.error(err);
  process.exit(1);
});
