import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api.printful.com/store/products', {
      headers: {
        Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch products list' }, { status: res.status });
    }

    const { result } = await res.json();

    // Fetch full details (to get price) for each product
    const detailedProducts = await Promise.all(
      result.map(async (item: any) => {
        const detailRes = await fetch(`https://api.printful.com/store/products/${item.id}`, {
          headers: {
            Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
          },
        });

        if (!detailRes.ok) {
          console.error(`Failed to fetch product ${item.id}`);
          return null;
        }

        const detailData = await detailRes.json();

        console.log(`Product ${item.id} details:`, detailData); // 👈 LOG THIS

        const variant = detailData.result?.sync_variants?.[0];
        const price = variant?.retail_price || 'N/A';

        return {
          title: item.name,
          thumbnail_url: item.thumbnail_url,
          price,
        };
      })
    );

    const filtered = detailedProducts.filter(Boolean);
    console.log('Final product list:', filtered); // 👈 LOG THIS TOO

    return NextResponse.json(filtered);
  } catch (err) {
    console.error('Printful API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
