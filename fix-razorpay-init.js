const fs = require('fs');
let data = fs.readFileSync('src/app/api/create-order/route.ts', 'utf-8');

data = data.replace(
  /const razorpay = new Razorpay\(\{\s*key_id: process\.env\.NEXT_PUBLIC_RAZORPAY_KEY_ID \|\| '',\s*key_secret: process\.env\.RAZORPAY_KEY_SECRET \|\| '',\s*\}\);/g,
  ''
);

data = data.replace(
  /export async function POST\(req: Request\) \{/g,
  `export async function POST(req: Request) {\n  const razorpay = new Razorpay({\n    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'dummy_key',\n    key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',\n  });`
);

fs.writeFileSync('src/app/api/create-order/route.ts', data);
