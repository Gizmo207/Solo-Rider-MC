import fetch from "node-fetch";

const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY!;
const PRINTFUL_STORE_ID = 16451329; // Solo-Rider-MC

(async () => {
  const res = await fetch(
    `https://api.printful.com/stores/${PRINTFUL_STORE_ID}/products`,
    { headers: { Authorization: `Bearer ${PRINTFUL_API_KEY}` } }
  );

  if (!res.ok) {
    console.error("Printful API error (products):", res.status, await res.text());
    process.exit(1);
  }

  const { result } = await res.json();
  console.log("Products in Solo-Rider-MC store:");
  result.forEach((p: any) => {
    console.log(`ID: ${p.id} | Name: ${p.name}`);
  });
})();
