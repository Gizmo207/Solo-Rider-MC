import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../lib/firebase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
})

// Printful product mapping - map your Firebase product IDs to Printful variant IDs
export const PRINTFUL_VARIANTS: Record<string, string> = {
  /* ---------- ATHLETIC HEATHER ---------- */
  "solo-rider-tee_S_Athletic Heather":  "687fbb2aaeb7d5",
  "solo-rider-tee_M_Athletic Heather":  "687fbb2aaeb822",
  "solo-rider-tee_L_Athletic Heather":  "687fbb2aaeb861",
  "solo-rider-tee_XL_Athletic Heather": "687fbb2aaeb8b6",
  "solo-rider-tee_2XL_Athletic Heather":"687fbb2aaeb8f3",
  "solo-rider-tee_3XL_Athletic Heather":"687fbb2aaeb941",

  /* --------------- BLACK --------------- */
  "solo-rider-tee_S_Black":  "687fbb2aaeb0a9",
  "solo-rider-tee_M_Black":  "687fbb2aaeb111",
  "solo-rider-tee_L_Black":  "687fbb2aaeb177",
  "solo-rider-tee_XL_Black": "687fbb2aaeb1c9",
  "solo-rider-tee_2XL_Black":"687fbb2aaeb211",
  "solo-rider-tee_3XL_Black":"687fbb2aaeb251",

  /* ---------------- NAVY ---------------- */
  "solo-rider-tee_S_Navy":  "687fbb2aaeb2a9",
  "solo-rider-tee_M_Navy":  "687fbb2aaeb2f2",   // out‑of‑stock but mapped
  "solo-rider-tee_L_Navy":  "687fbb2aaeb343",
  "solo-rider-tee_XL_Navy": "687fbb2aaeb393",
  "solo-rider-tee_2XL_Navy":"687fbb2aaeb3d9",
  "solo-rider-tee_3XL_Navy":"687fbb2aaeb424",

  /* ---------------- RED ----------------- */
  "solo-rider-tee_S_Red":  "687fbb2aaeb478",
  "solo-rider-tee_M_Red":  "687fbb2aaeb4b1",
  "solo-rider-tee_L_Red":  "687fbb2aaeb508",
  "solo-rider-tee_XL_Red": "687fbb2aaeb542",
  "solo-rider-tee_2XL_Red":"687fbb2aaeb595",
  "solo-rider-tee_3XL_Red":"687fbb2aaeb5d3",

  /* ------------ TRUE ROYAL ------------- */
  "solo-rider-tee_S_True Royal":  "687fbb2aaeb625",
  "solo-rider-tee_M_True Royal":  "687fbb2aaeb665",
  "solo-rider-tee_L_True Royal":  "687fbb2aaeb6b3",
  "solo-rider-tee_XL_True Royal": "687fbb2aaeb6f3",
  "solo-rider-tee_2XL_True Royal":"687fbb2aaeb745",
  "solo-rider-tee_3XL_True Royal":"687fbb2aaeb797",

  /* --------------- WHITE --------------- */
  "solo-rider-tee_S_White":  "687fbb2aaeb999",
  "solo-rider-tee_M_White":  "687fbb2aaeb9d4",
  "solo-rider-tee_L_White":  "687fbb2aaebaa3",
  "solo-rider-tee_XL_White": "687fbb2aaebaf3",
  "solo-rider-tee_2XL_White":"687fbb2aaebb37",
  "solo-rider-tee_3XL_White":"687fbb2aaebb83",
};

async function createPrintfulOrder(session: Stripe.Checkout.Session) {
  try {
    console.log('🔥 Creating Printful order for session:', session.id)
    
    // Expand session to get shipping details
    const expandedSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['shipping_details', 'customer_details']
    })
    
    const productId = session.metadata?.product_id
    const quantity = parseInt(session.metadata?.quantity || '1')
    
    if (!productId || !PRINTFUL_VARIANTS[productId]) {
      console.error('❌ No Printful variant found for product:', productId)
      return null
    }

    const orderData = {
      recipient: {
        name: expandedSession.customer_details?.name || 'Customer',
        address1: (expandedSession as any).shipping_details?.address?.line1 || '',
        address2: (expandedSession as any).shipping_details?.address?.line2 || '',
        city: (expandedSession as any).shipping_details?.address?.city || '',
        state_code: (expandedSession as any).shipping_details?.address?.state || '',
        country_code: (expandedSession as any).shipping_details?.address?.country || 'US',
        zip: (expandedSession as any).shipping_details?.address?.postal_code || '',
        phone: expandedSession.customer_details?.phone || '',
        email: expandedSession.customer_details?.email || '',
      },
      items: [
        {
          variant_id: PRINTFUL_VARIANTS[productId],
          quantity: quantity,
        },
      ],
      retail_costs: {
        currency: 'USD',
        subtotal: (session.amount_total || 0) / 100, // Convert from cents
        shipping: 0, // You can calculate shipping separately
        tax: 0, // You can calculate tax separately
      },
      external_id: session.id, // Link to Stripe session
    }

    const response = await fetch('https://api.printful.com/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })

    const result = await response.json() as { result: { id: string } }
    
    if (response.ok) {
      console.log('✅ Printful order created:', result.result.id)
      return result.result
    } else {
      console.error('❌ Printful order failed:', result)
      return null
    }
  } catch (error) {
    console.error('❌ Printful API error:', error)
    return null
  }
}

async function saveOrderToFirestore(session: Stripe.Checkout.Session, printfulOrder: any) {
  try {
    const order = {
      stripeSessionId: session.id,
      customerEmail: session.customer_details?.email,
      customerName: session.customer_details?.name,
      amount: session.amount_total,
      currency: session.currency,
      status: 'completed',
      printfulOrderId: printfulOrder?.id || null,
      createdAt: new Date(),
      metadata: session.metadata,
    }

    const docRef = await addDoc(collection(db, 'orders'), order)
    console.log('✅ Order saved to Firestore:', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('❌ Error saving order to Firestore:', error)
    return null
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed:', err.message)
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }

  console.log('🔔 Webhook received:', event.type)

  // Handle successful checkout
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    console.log('🎉 Payment successful for session:', session.id)
    console.log('💰 Amount:', session.amount_total, session.currency)
    console.log('📧 Customer:', session.customer_details?.email)
    console.log('📦 Product:', session.metadata?.product_id)

    // Create Printful order
    const printfulOrder = await createPrintfulOrder(session)
    
    // Save order to Firestore
    await saveOrderToFirestore(session, printfulOrder)

    // TODO: Send confirmation email to customer
    // TODO: Send notification to admin
    
    console.log('✅ Order processing complete')
  }

  // Handle payment failed
  if (event.type === 'checkout.session.expired') {
    const session = event.data.object as Stripe.Checkout.Session
    console.log('❌ Payment failed/expired for session:', session.id)
  }

  return NextResponse.json({ received: true })
}
