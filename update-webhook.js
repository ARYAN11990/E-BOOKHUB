const fs = require('fs');

// 1. Update Checkout Page to send customerDetails and courseId
let checkout = fs.readFileSync('src/app/checkout/page.tsx', 'utf-8');
checkout = checkout.replace(
  `              razorpay_signature: response.razorpay_signature,\n            }),`,
  `              razorpay_signature: response.razorpay_signature,\n              customerDetails: formData,\n              courseId: course.id,\n            }),`
);
fs.writeFileSync('src/app/checkout/page.tsx', checkout);

// 2. Rewrite verify-payment route
const verifyCode = `import { NextResponse } from 'next/server';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customerDetails, courseId } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET || '';

    // Create the expected signature
    const generated_signature = crypto
      .createHmac('sha256', secret)
      .update(\`\${razorpay_order_id}|\${razorpay_payment_id}\`)
      .digest('hex');

    // Compare signatures
    if (generated_signature === razorpay_signature) {
      
      // Payment is verified! Now trigger WhatsApp Automation if webhook is set
      try {
        const webhookUrl = process.env.AUTOMATION_WEBHOOK_URL;
        
        if (webhookUrl && customerDetails && courseId) {
          // Get course details for the message
          const dataFilePath = path.join(process.cwd(), 'src', 'data', 'courses.json');
          const coursesDb = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
          const dbCourse = coursesDb.find((c: any) => c.id === courseId);

          if (dbCourse) {
            // Send data to Pabbly / Make.com
            await fetch(webhookUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
                firstName: customerDetails.firstName,
                lastName: customerDetails.lastName,
                mobileNumber: customerDetails.mobileNumber,
                courseName: dbCourse.title,
                amount: dbCourse.currentPrice,
                // Provide a direct link to the course (you will need to host your PDFs somewhere like Google Drive or AWS S3 and map them)
                pdfLink: \`https://learnora.com/download/\${courseId}\` // Placeholder link
              })
            }).catch(e => console.error("Webhook trigger failed:", e));
          }
        }
      } catch (err) {
        console.error("Error processing automation:", err);
        // We don't fail the order if automation fails
      }

      return NextResponse.json({ success: true, message: 'Payment verified successfully' });
    } else {
      return NextResponse.json({ success: false, message: 'Payment verification failed' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({ success: false, message: 'Server error during verification' }, { status: 500 });
  }
}
`;
fs.writeFileSync('src/app/api/verify-payment/route.ts', verifyCode);
