const fs = require('fs');
let data = fs.readFileSync('src/app/checkout/page.tsx', 'utf-8');
data = data.replace(
  /<button type="submit" form="checkout-form"[\s\S]*?<\/button>/g,
  `<button type="submit" disabled={isProcessing} form="checkout-form" className="w-full btn-primary py-3.5 flex items-center justify-center text-lg disabled:opacity-75 disabled:cursor-not-allowed">
    {isProcessing ? (
      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
    ) : (
      <><Lock className="w-5 h-5 mr-2" /> Pay ₹{total} securely</>
    )}
  </button>`
);
fs.writeFileSync('src/app/checkout/page.tsx', data);
