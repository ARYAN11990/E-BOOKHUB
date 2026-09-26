'use client';

import Link from 'next/link';
import { Trash2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, cartTotal, isMounted } = useCart();
  const [coupon, setCoupon] = useState('');
  
  const discount = 0; // Mock discount
  const total = cartTotal - discount;

  // Prevent hydration mismatch
  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-surface-main py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">Your Shopping Cart</h1>
        
        {cart.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-surface-main rounded-2xl p-4 md:p-6 border border-border-light shadow-sm flex flex-col sm:flex-row gap-6 items-center">
                  <img src={item.thumbnailUrl} alt={item.title} className="w-full sm:w-40 h-28 object-cover rounded-lg border border-border-light" />
                  
                  <div className="flex-grow flex flex-col sm:flex-row justify-between w-full">
                    <div>
                      <h3 className="text-xl font-bold text-text-primary mb-1">{item.title}</h3>
                      <p className="text-sm text-text-secondary mb-2">PDF E-book • Lifetime Access</p>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-600 flex items-center text-sm font-medium transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Remove
                      </button>
                    </div>
                    
                    <div className="text-right mt-4 sm:mt-0">
                      <div className="text-2xl font-bold text-brand-purple">₹{item.currentPrice}</div>
                      {item.originalPrice && (
                        <div className="text-sm text-text-muted line-through">₹{item.originalPrice}</div>
                      )}
                      <div className="text-xs text-text-muted mt-2">Qty: 1 (Fixed)</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-surface-main rounded-2xl p-6 border border-border-light shadow-sm sticky top-24">
                <h3 className="text-xl font-bold text-text-primary mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between text-text-secondary">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                  <div className="border-t border-border-light pt-4 flex justify-between text-lg font-bold text-text-primary">
                    <span>Total</span>
                    <span className="text-brand-purple">₹{total}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Coupon Code" 
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="w-full px-4 py-2 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple text-sm"
                    />
                    <button className="bg-surface-subtle hover:bg-surface-soft text-text-primary border border-border-light px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                      Apply
                    </button>
                  </div>
                </div>

                <Link href="/checkout" className="w-full btn-primary py-3 flex items-center justify-center">
                  Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2" />
                </Link>

                <div className="mt-6 flex items-center justify-center text-xs text-text-muted">
                  <ShieldCheck className="w-4 h-4 mr-1 text-brand-purple" />
                  <span>Secure 256-bit Encrypted Checkout</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-surface-main rounded-2xl p-12 border border-border-light shadow-sm text-center">
            <h3 className="text-2xl font-bold text-text-primary mb-4">Your cart is empty</h3>
            <p className="text-text-secondary mb-8">Looks like you haven't added any courses yet.</p>
            <Link href="/courses" className="btn-primary inline-block">
              Explore Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
