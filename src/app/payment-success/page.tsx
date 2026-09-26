import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-surface-main flex flex-col items-center justify-center p-4">
      <div className="bg-surface-main p-8 md:p-12 rounded-2xl border border-border-light shadow-sm text-center max-w-lg w-full">
        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>
        
        <h1 className="text-3xl font-bold text-text-primary mb-4">Payment Successful!</h1>
        <p className="text-text-secondary mb-2">
          Thank you for your purchase. Your payment has been processed successfully.
        </p>
        <p className="text-sm text-text-muted mb-8">
          A confirmation receipt and access details have been sent to your registered email.
        </p>
        
        <div className="space-y-4">
          <Link href="/dashboard" className="w-full btn-primary py-3 inline-block">
            Go to My Courses
          </Link>
          <Link href="/dashboard/orders" className="w-full btn-secondary py-3 inline-block">
            View Order Receipt
          </Link>
        </div>
      </div>
    </div>
  );
}
