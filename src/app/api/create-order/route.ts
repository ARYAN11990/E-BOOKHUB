import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import fs from 'fs';
import path from 'path';



export async function POST(req: Request) {
  const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'dummy_key',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
  });
  try {
    const { cartIds, receipt } = await req.json();

    if (!cartIds || !Array.isArray(cartIds) || cartIds.length === 0) {
      return NextResponse.json({ error: 'Valid cart items are required' }, { status: 400 });
    }

    // Securely calculate amount on server
    const dataFilePath = path.join(process.cwd(), 'src', 'data', 'courses.json');
    const coursesDb = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    
    let secureTotal = 0;
    cartIds.forEach((id: string) => {
      const dbCourse = coursesDb.find((c: { id: string; currentPrice: number }) => c.id === id);
      if (dbCourse) {
        secureTotal += dbCourse.currentPrice;
      }
    });

    if (secureTotal <= 0) {
      return NextResponse.json({ error: 'Invalid cart amount' }, { status: 400 });
    }

    const options = {
      amount: secureTotal * 100, // Razorpay works in smallest currency unit (paise)
      currency: 'INR',
      receipt: receipt || `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    
    return NextResponse.json({ success: true, order, secureTotal });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: 'Failed to create order. Check your Razorpay API Keys in .env.local' },
      { status: 500 }
    );
  }
}
