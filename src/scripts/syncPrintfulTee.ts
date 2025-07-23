import fetch from "node-fetch";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const PRINTFUL_API_KEY      = process.env.PRINTFUL_API_KEY!;
const PRINTFUL_STORE_ID     = 16451329; // ← your store ID
const PRINTFUL_PRODUCT_ID   = 387579632; // ← your synced product ID
const FIREBASE_SA           = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!);

initializeApp({ credential: cert(FIREBASE_SA) });
const db = getFirestore();


(async () => {
  // Try synced product endpoint first
  let res = await fetch(
    `https://api.printful.com/stores/${PRINTFUL_STORE_ID}/products/${PRINTFUL_PRODUCT_ID}`,
    { headers: { Authorization: `Bearer ${PRINTFUL_API_KEY}` } }
  );

  let result, colorMap: Record<string, string> = {};

  if (res.status === 404) {
    // Try product template endpoint as fallback
    res = await fetch(
      `https://api.printful.com/product-templates/${PRINTFUL_PRODUCT_ID}`,
      { headers: { Authorization: `Bearer ${PRINTFUL_API_KEY}` } }
    );
    if (!res.ok) {
      console.error("Printful API error (template):", res.status, await res.text());
      process.exit(1);
    }
    ({ result } = await res.json());
    // result.variants[] for product template
    result.variants.forEach((v: any) => {
      const [color] = v.name.split(" / ");
      if (!colorMap[color] && v.files?.[0]?.preview_url) {
        colorMap[color] = v.files[0].preview_url;
      }
    });
  } else if (!res.ok) {
    console.error("Printful API error:", res.status, await res.text());
    process.exit(1);
  } else {
    ({ result } = await res.json());
    // result.sync_variants[] for synced product
    result.sync_variants.forEach((v: any) => {
      const [color] = v.name.split(" / ");
      if (!colorMap[color] && v.files?.[0]?.preview_url) {
        colorMap[color] = v.files[0].preview_url;
      }
    });
  }

  await db.collection("products").doc("solo-rider-tee").set(
    {
      colors: Object.keys(colorMap),
      images: colorMap
    },
    { merge: true }
  );

  console.log("✅ Synced preview images:", colorMap);
  process.exit(0);
})();
