'use client';

import Link from 'next/link';
import { ShieldCheck, AlertCircle, Lock } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, cartTotal, isMounted } = useCart();
  const router = useRouter();
  
  const total = cartTotal;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    acceptTerms: false
  });

  // Prevent hydration mismatch
  if (!isMounted) return null;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-surface-main py-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-text-primary">Your cart is empty</h2>
          <Link href="/courses" className="btn-primary inline-block">Browse Courses</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Proceeding to payment...', formData);
    // In a real app, integrate Razorpay/Stripe here.
    // For now, redirect to success.
    router.push('/payment-success');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isCheckbox = (e.target as HTMLInputElement).type === 'checkbox';
    
    setFormData(prev => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-surface-main py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Billing Details */}
          <div className="lg:w-2/3">
            <div className="bg-surface-main rounded-2xl p-6 md:p-8 border border-border-light shadow-sm">
              <h2 className="text-xl font-bold text-text-primary mb-6 border-b border-border-light pb-4">Billing Details</h2>
              
              <div className="bg-brand-purple/10 border border-brand-purple/30 p-4 rounded-lg mb-6 flex items-start">
                <AlertCircle className="w-5 h-5 text-brand-purple mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-brand-purple/90 font-medium">
                  Please verify your email address carefully. Your receipt and course-access details will be sent to this email.
                </p>
              </div>

              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6 text-text-primary">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-primary">Full Name *</label>
                    <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full px-4 py-2.5 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-primary">Mobile Number *</label>
                    <input type="tel" name="mobileNumber" required value={formData.mobileNumber} onChange={handleChange} className="w-full px-4 py-2.5 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-text-primary">Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-text-primary">Billing Address *</label>
                  <input type="text" name="address" required value={formData.address} onChange={handleChange} className="w-full px-4 py-2.5 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-primary">City *</label>
                    <input type="text" name="city" required value={formData.city} onChange={handleChange} className="w-full px-4 py-2.5 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-primary">State *</label>
                    <input type="text" name="state" required value={formData.state} onChange={handleChange} className="w-full px-4 py-2.5 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-primary">PIN Code *</label>
                    <input type="text" name="pinCode" required value={formData.pinCode} onChange={handleChange} className="w-full px-4 py-2.5 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-text-primary">Country</label>
                  <input type="text" name="country" disabled value="India" className="w-full px-4 py-2.5 bg-surface-subtle border border-border-light rounded-lg text-text-muted cursor-not-allowed" />
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary & Payment */}
          <div className="lg:w-1/3">
            <div className="bg-surface-main rounded-2xl p-6 border border-border-light shadow-sm sticky top-24">
              <h3 className="text-xl font-bold text-text-primary mb-6">Your Order</h3>
              
              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm border-b border-border-light pb-4">
                    <span className="text-text-secondary flex-grow pr-4">{item.title}</span>
                    <span className="text-text-primary font-semibold whitespace-nowrap">₹{item.currentPrice}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-6 text-sm">
                <div className="flex justify-between text-text-secondary">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="border-t border-border-light pt-4 mt-2 flex justify-between text-lg font-bold text-text-primary">
                  <span>Total Payable</span>
                  <span className="text-brand-purple">₹{total}</span>
                </div>
              </div>

              <div className="bg-surface-soft p-4 rounded-lg mb-6 border border-border-light">
                <div className="flex items-center text-text-primary font-medium mb-2">
                  <ShieldCheck className="w-5 h-5 text-green-500 mr-2" /> Secure Payment
                </div>
                <p className="text-xs text-text-muted">
                  Pay securely using UPI, Credit/Debit Card, or Net Banking via Razorpay.
                </p>
              </div>

              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input 
                    type="checkbox" 
                    name="acceptTerms"
                    required
                    form="checkout-form"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-border-light bg-surface-main focus:ring-brand-purple text-brand-purple" 
                  />
                </div>
                <div className="ml-3 text-xs">
                  <label className="text-text-secondary">
                    I have read and agree to the website terms and conditions, refund policy, and privacy policy.
                  </label>
                </div>
              </div>

              <button type="submit" form="checkout-form" className="w-full btn-primary py-3.5 flex items-center justify-center text-lg">
                <Lock className="w-5 h-5 mr-2" /> Pay ₹{total} securely
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
