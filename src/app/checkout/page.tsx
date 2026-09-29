'use client';
// @ts-nocheck
/* eslint-disable */

import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, AlertCircle, Lock, Loader2, CheckCircle, BookOpen, Star, Clock } from 'lucide-react';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { mockCourses } from '@/data/mockCourses';

function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  const course = mockCourses.find(c => c.id === courseId);

  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    acceptTerms: false
  });

  useEffect(() => {
    if (!courseId || !course) {
      router.push('/courses');
    }
  }, [courseId, course, router]);

  if (!course) return null;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms) return alert('Please accept the terms.');

    setIsProcessing(true);

    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartIds: [course.id] }),
      });
      const data = await res.json();
      
      if (!data.success) {
        setIsProcessing(false);
        return alert(data.error || 'Failed to initialize payment.');
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: 'INR',
        name: 'Learnora',
        description: course.title,
        order_id: data.order.id,
        handler: async function (response: any) {
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            router.push('/payment-success?courseId=' + course.id);
          } else {
            router.push('/payment-failed');
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobileNumber,
        },
        theme: {
          color: '#5B2EFF',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        router.push('/payment-failed');
      });
      rzp.open();
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="container mx-auto px-4 max-w-5xl">
      <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Side - Course Summary */}
        <div className="lg:w-1/2">
          <div className="bg-surface-main rounded-2xl p-6 border border-border-light shadow-sm mb-6">
            <h2 className="text-xl font-bold text-text-primary mb-4 border-b border-border-light pb-4">Course Summary</h2>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
              <Image src={course.thumbnailUrl} alt={course.title} fill className="object-cover" />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-2">{course.title}</h3>
            <p className="text-sm text-text-secondary mb-4">{course.shortDescription}</p>
            
            <div className="bg-surface-soft p-4 rounded-lg border border-border-light flex justify-between items-center">
              <span className="font-medium text-text-secondary">Price to Pay:</span>
              <span className="text-2xl font-extrabold text-brand-purple">₹{course.currentPrice}</span>
            </div>
          </div>
          
          <div className="bg-surface-soft p-4 rounded-lg border border-border-light">
            <div className="flex items-center text-text-primary font-medium mb-2">
              <ShieldCheck className="w-5 h-5 text-green-500 mr-2" /> Secure Payment
            </div>
            <p className="text-xs text-text-muted">
              Pay securely using UPI, Credit/Debit Card, or Net Banking via Razorpay. Immediate access granted after payment.
            </p>
          </div>
        </div>

        {/* Right Side - Quick Checkout Form */}
        <div className="lg:w-1/2">
          <div className="bg-surface-main rounded-2xl p-6 border border-border-light shadow-sm">
            <h2 className="text-xl font-bold text-text-primary mb-6 border-b border-border-light pb-4">Your Details</h2>
            
            <div className="bg-brand-purple/10 border border-brand-purple/30 p-4 rounded-lg mb-6 flex items-start">
              <AlertCircle className="w-5 h-5 text-brand-purple mr-3 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-brand-purple/90 font-medium">
                Your course access and receipt will be sent directly to this email address.
              </p>
            </div>

            <form id="checkout-form" onSubmit={handlePayment} className="space-y-5 text-text-primary">
              <div>
                <label className="block text-sm font-medium mb-2 text-text-primary">Full Name *</label>
                <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-text-primary">Mobile Number *</label>
                <input type="tel" name="mobileNumber" required value={formData.mobileNumber} onChange={handleChange} className="w-full px-4 py-3 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-text-primary">Email Address (Optional)</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple" />
              </div>

              <div className="flex items-start pt-4 border-t border-border-light">
                <div className="flex items-center h-5">
                  <input type="checkbox" name="acceptTerms" required checked={formData.acceptTerms} onChange={handleChange} className="w-4 h-4 rounded border-border-light bg-surface-main focus:ring-brand-purple text-brand-purple" />
                </div>
                <div className="ml-3 text-xs">
                  <label className="text-text-secondary">
                    I have read and agree to the website terms and conditions, refund policy, and privacy policy.
                  </label>
                </div>
              </div>

              <button type="submit" disabled={isProcessing} className="w-full btn-primary py-4 flex items-center justify-center text-lg disabled:opacity-75 disabled:cursor-not-allowed mt-4">
                {isProcessing ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
                ) : (
                  <><Lock className="w-5 h-5 mr-2" /> Pay ₹{course.currentPrice} securely</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Course Detailed Info Section */}
      <div className="mt-12 bg-surface-main rounded-2xl p-6 md:p-10 border border-border-light shadow-sm">
        <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 border-b border-border-light pb-4">
          Everything You Need to Know
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-bold text-text-primary mb-5 flex items-center">
              <Star className="w-6 h-6 text-brand-purple mr-2" />
              What You Will Learn
            </h3>
            <ul className="space-y-4">
              {[
                "Complete step-by-step strategies designed for beginners.",
                "How to monetize and turn your skills into a profitable income stream.",
                "Proven frameworks used by top industry experts.",
                "Lifetime access to all future updates and additions.",
                "Instant digital download immediately after purchase."
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center">
                <BookOpen className="w-6 h-6 text-brand-purple mr-2" />
                Who is this for?
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Whether you are a complete beginner looking to start your online journey, or an intermediate looking to scale your income, this E-book provides a clear, actionable roadmap without the fluff.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center">
                <Clock className="w-6 h-6 text-brand-purple mr-2" />
                Delivery & Format
              </h3>
              <p className="text-text-secondary leading-relaxed">
                This is a premium digital E-book (PDF format). You can read it on your phone, tablet, or computer. Your unique download link will be emailed to you instantly upon successful payment.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen py-12">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-brand-purple" /></div>}>
        <CheckoutForm />
      </Suspense>
    </div>
  );
}
