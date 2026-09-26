export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-surface-main py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-surface-main p-8 md:p-12 rounded-2xl border border-border-light shadow-sm">
          <h1 className="text-3xl font-bold text-text-primary mb-8">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none text-text-secondary space-y-6">
            <p>
              At Learnora, we are committed to protecting your privacy and ensuring your personal information is handled securely.
            </p>

            <h3 className="text-xl font-bold text-text-primary mt-8 mb-4">Information We Collect</h3>
            <p>
              We collect information that you provide directly to us when creating an account, making a purchase, or contacting support. This includes your name, email address, mobile number, and billing address.
            </p>
            
            <p>
              We do not store your sensitive payment details (like credit card numbers). All payment processing is securely handled by our PCI-compliant payment gateway partners (Razorpay/Cashfree).
            </p>

            <h3 className="text-xl font-bold text-text-primary mt-8 mb-4">How We Use Your Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and deliver the digital products you purchase.</li>
              <li>To send you transaction receipts and order updates.</li>
              <li>To provide customer support and respond to your inquiries.</li>
              <li>To improve our platform and user experience.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
