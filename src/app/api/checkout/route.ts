import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getProductById } from '../../../lib/firestore-schema'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})

export async function POST(req: NextRequest) {
  try {
    const { productId, quantity = 1, size, color } = await req.json();

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Get product details from Firestore
    const product = await getProductById(productId);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: Math.round(product.price * 100), // Convert to cents
            product_data: {
              name: product.title,
              description: product.description,
              images: product.imageUrl ? [product.imageUrl] : [],
              metadata: {
                firestore_id: productId,
                category: product.category,
                size: size || '',
                color: color || '',
              },
            },
          },
          quantity,
        },
      ],
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/shop`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'], // Expand as needed
      },
      billing_address_collection: 'required',
      metadata: {
        product_id: productId,
        quantity: quantity.toString(),
        size: size || '',
        color: color || '',
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
