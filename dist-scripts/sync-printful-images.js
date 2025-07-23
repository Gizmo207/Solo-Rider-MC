"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const node_fetch_1 = __importDefault(require("node-fetch"));
const admin = __importStar(require("firebase-admin"));
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
async function fetchPrintfulProduct(productId) {
    const res = await (0, node_fetch_1.default)(`https://api.printful.com/products/${productId}`, {
        headers: { Authorization: `Bearer ${PRINTFUL_API_KEY}` },
    });
    if (!res.ok)
        throw new Error(`Printful API error: ${res.status}`);
    return res.json();
}
async function main() {
    const { result } = await fetchPrintfulProduct(PRINTFUL_PRODUCT_ID);
    const variantImages = {};
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
    if (snapshot.empty)
        throw new Error('No tee product found in Firestore');
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
