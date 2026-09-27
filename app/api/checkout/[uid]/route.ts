import { Stripe } from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { asText } from '@prismicio/client/richtext';
import { createClient } from '@/prismicio';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-08-26.dahlia',
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ uid: string }> },
) {
  try {
    const { uid } = await params;

    if (!uid) {
      return NextResponse.json(
        { error: 'Missing Product UID' },
        { status: 400 },
      );
    }

    const prismicClient = createClient();
    const product = await prismicClient.getByUID('product', uid);

    const name = product.data.name as string;
    const price = product.data.price as number;
    const image = product.data.image.url;
    const description = asText(product.data.description);

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'USD',
            product_data: {
              name,
              ...(description ? { description } : {}),
              ...(image ? { images: [image] } : {}),
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe session creation error:', error);
    return NextResponse.json({ error: 'Failed to create Stripe Session' });
  }
}
