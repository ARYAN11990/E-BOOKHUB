import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-main flex flex-col items-center justify-center p-4">
      <div className="bg-surface-main p-8 md:p-12 rounded-2xl border border-border-light shadow-sm text-center max-w-lg w-full">
        <h1 className="text-9xl font-extrabold text-brand-purple mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">Page Not Found</h2>
        <p className="text-text-secondary mb-8">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="btn-primary inline-block py-3 px-8">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
