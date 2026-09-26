export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-surface-main py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-surface-main p-8 md:p-12 rounded-2xl border border-border-light shadow-sm">
          <h1 className="text-3xl font-bold text-text-primary mb-8">Refund and Cancellation Policy</h1>
          
          <div className="prose prose-slate max-w-none text-text-secondary space-y-6">
            <p className="text-lg font-semibold text-text-primary">
              Due to the downloadable nature of digital products, payments are generally non-refundable once the PDF has been successfully delivered or downloaded.
            </p>
            
            <p>
              Refunds may be considered only in specific, exceptional cases such as:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Duplicate payments for the exact same course made accidentally.</li>
              <li>Technical failure preventing the delivery of the PDF file to your account.</li>
              <li>An incorrect product/file being provided contrary to the product description.</li>
            </ul>

            <h3 className="text-xl font-bold text-text-primary mt-8 mb-4">How to Request a Refund</h3>
            <p>
              If you believe you qualify for a refund based on the criteria above, please contact our support team at <strong>manthandhameliya1511@gmail.com</strong> or via WhatsApp at <strong>+91 90161 04141</strong> within 7 days of purchase.
            </p>
            <p>
              You must include your Order ID and payment details in your request.
            </p>

            <h3 className="text-xl font-bold text-text-primary mt-8 mb-4">Refund Processing</h3>
            <p>
              Once a refund request is approved, it will be processed through the original payment method (via Razorpay/Cashfree). The amount will reflect in your bank account within 5-7 working days, depending on your bank's processing times.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
