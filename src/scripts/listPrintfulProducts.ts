import fetch from "node-fetch";

const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY!;
const PRINTFUL_STORE_ID = 16451329; // your store ID

(async () => {
  const res = await fetch(
    `https://api.printful.com/stores/${PRINTFUL_STORE_ID}/products`,
    { headers: { Authorization: `Bearer ${PRINTFUL_API_KEY}` } }
  );

  if (!res.ok) {
    console.error("Printful API error:", res.status, await res.text());
    process.exit(1);
  }

  const { result } = await res.json();
  console.log("Your store's synced products:");
  result.forEach((p: any) => {
    console.log(`ID: ${p.id} | Name: ${p.name}`);
  });
})();
