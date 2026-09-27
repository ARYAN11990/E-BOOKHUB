const fs = require('fs');
let data = fs.readFileSync('src/app/checkout/page.tsx', 'utf-8');

data = data.replace(/handler: async function \(response: any\)/g, 'handler: async function (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string })');
data = data.replace(/const rzp = new \(window as any\).Razorpay\(options\);/g, 'const rzp = new (window as unknown as { Razorpay: new (options: unknown) => { on: (event: string, cb: Function) => void; open: () => void } }).Razorpay(options);');
data = data.replace(/rzp\.on\('payment\.failed', function \(response: any\)/g, 'rzp.on(\'payment.failed\', function (response: { error: unknown })');

fs.writeFileSync('src/app/checkout/page.tsx', data);
