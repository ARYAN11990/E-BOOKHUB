import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen bg-surface-main flex flex-col items-center justify-center p-4">
      <div className="bg-surface-main p-8 md:p-12 rounded-2xl border border-border-light shadow-sm text-center max-w-lg w-full">
        <div className="w-20 h-20 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10" />
        </div>
        
        <h1 className="text-3xl font-bold text-text-primary mb-4">Payment Failed</h1>
        <p className="text-text-secondary mb-2">
          We couldn't process your payment. No money has been deducted from your account.
        </p>
        <p className="text-sm text-text-muted mb-8">
          If you are facing issues, please try using a different payment method or contact our support.
        </p>
        
        <div className="space-y-4">
          <Link href="/checkout" className="w-full btn-primary py-3 inline-block">
            Try Again
          </Link>
          <Link href="/contact" className="w-full btn-secondary py-3 inline-block">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
