export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface-main py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-surface-main p-8 md:p-12 rounded-2xl border border-border-light shadow-sm">
          <h1 className="text-3xl font-bold text-text-primary mb-8">Terms and Conditions</h1>
          
          <div className="prose prose-slate max-w-none text-text-secondary space-y-6">
            <h3 className="text-xl font-bold text-text-primary mt-8 mb-4">1. Earnings Disclaimer</h3>
            <p>
              Learnora provides educational content only. We do not guarantee income, employment, clients, sales, or business success. Results depend on the learner's skills, effort, experience, market conditions, and implementation.
            </p>

            <h3 className="text-xl font-bold text-text-primary mt-8 mb-4">2. Copyright Notice</h3>
            <p>
              All course materials are protected by copyright. Purchasing gives the customer a personal, non-transferable usage licence. Copying, sharing, uploading, reselling, or distributing the content without written permission is prohibited and may result in legal action.
            </p>

            <h3 className="text-xl font-bold text-text-primary mt-8 mb-4">3. Delivery of Digital Products</h3>
            <p>
              Upon successful payment, digital products (PDF e-books) are delivered instantly via a secure download link in the user's dashboard. No physical product will be shipped.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
