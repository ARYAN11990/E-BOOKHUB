import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-gray-300 border-t border-border-light pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-flex items-center space-x-3 mb-6 group">
              <div className="bg-surface-main rounded p-1 flex items-center justify-center">
                <img src="/logo.jpg" alt="EBookHub Logo" className="h-8 w-auto object-contain transition-transform group-hover:scale-105" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                Learnora
              </span>
            </Link>
            <p className="text-sm mb-6 text-gray-400 leading-relaxed">
              Learn Today. Earn Tomorrow. Premium digital marketing & online skill e-books for modern learners.
            </p>
            <p className="text-xs text-gray-500 font-medium">
              Digital products for educational purposes only. Individual results may vary.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Platform</h3>
            <ul className="space-y-3 text-sm font-medium text-gray-400">
              <li><Link href="/courses" className="hover:text-brand-lavender transition-colors">All Courses</Link></li>
              <li><Link href="/categories" className="hover:text-brand-lavender transition-colors">Categories</Link></li>
              <li><Link href="/about" className="hover:text-brand-lavender transition-colors">About Us</Link></li>
              <li><Link href="/how-it-works" className="hover:text-brand-lavender transition-colors">How it Works</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Support</h3>
            <ul className="space-y-3 text-sm font-medium text-gray-400">
              <li><Link href="/faq" className="hover:text-brand-lavender transition-colors">Help & FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-brand-lavender transition-colors">Contact Us</Link></li>
              <li><Link href="/terms" className="hover:text-brand-lavender transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-brand-lavender transition-colors">Privacy Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-brand-lavender transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Get in Touch</h3>
            <ul className="space-y-3 text-sm font-medium text-gray-400">
              <li>Bengaluru, Karnataka, India</li>
              <li>+91 90161 04141</li>
              <li>manthandhameliya1511@gmail.com</li>
            </ul>
            <div className="mt-8">
              <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">Secure Payments</p>
              <div className="flex space-x-3 text-sm text-gray-400 font-medium">
                <span>UPI</span>
                <span className="text-gray-600">•</span>
                <span>Cards</span>
                <span className="text-gray-600">•</span>
                <span>Net Banking</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 font-medium">
          <p>© {new Date().getFullYear()} Learnora. All Rights Reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
