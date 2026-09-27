const fs = require('fs');
let data = fs.readFileSync('src/app/checkout/page.tsx', 'utf-8');

const replacement = `      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use actual key in .env.local
        amount: data.order.amount,
        currency: 'INR',
        name: 'Learnora',
        description: 'Course Purchase',
        order_id: data.order.id,
        handler: async function (response: any) {
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            clearCart();
            router.push('/payment-success');
          } else {
            router.push('/payment-failed');
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobileNumber,
        },
        theme: {
          color: '#5B2EFF',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        router.push('/payment-failed');
      });
      rzp.open();`;

data = data.replace(/const options = \{[\s\S]*?rzp\.open\(\);/g, replacement);
fs.writeFileSync('src/app/checkout/page.tsx', data);
