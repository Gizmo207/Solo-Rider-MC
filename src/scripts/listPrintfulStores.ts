import fetch from "node-fetch";

const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY!;

(async () => {
  const res = await fetch(
    `https://api.printful.com/stores`,
    { headers: { Authorization: `Bearer ${PRINTFUL_API_KEY}` } }
  );

  if (!res.ok) {
    console.error("Printful API error (stores):", res.status, await res.text());
    process.exit(1);
  }

  const { result } = await res.json();
  console.log("Your Printful stores:");
  result.forEach((store: any) => {
    console.log(`ID: ${store.id} | Name: ${store.name}`);
  });
})();
