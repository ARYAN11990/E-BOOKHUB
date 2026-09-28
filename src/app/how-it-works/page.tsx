'use client';

import { BookOpen, CreditCard, Download, Mail } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      title: "Choose Your Course",
      description: "Browse our catalog of premium digital courses and e-books. Find the one that matches your goals and click 'Buy Now'.",
      icon: <BookOpen className="w-8 h-8 text-brand-purple" />,
    },
    {
      title: "Quick Checkout",
      description: "Enter your basic details (Name and Mobile) and securely pay via UPI, Credit/Debit Card, or Net Banking. (Email is optional but recommended).",
      icon: <CreditCard className="w-8 h-8 text-brand-pink" />,
    },
    {
      title: "Instant Access",
      description: "As soon as your payment is successful, you will be redirected to the download page instantly.",
      icon: <Download className="w-8 h-8 text-brand-purple" />,
    },
    {
      title: "Email Delivery",
      description: "If you provided an email, you'll also receive a unique download link for lifetime access to your material.",
      icon: <Mail className="w-8 h-8 text-brand-pink" />,
    },
  ];

  return (
    <div className="min-h-screen bg-surface-main py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 text-center">How It Works</h1>
        <p className="text-text-secondary text-center mb-16 text-lg">Start learning in less than 2 minutes. Our process is seamless and fully automated.</p>
        
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-border-light">
          {steps.map((step, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
              {/* Number Badge */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface-main bg-brand-purple/10 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <span className="text-brand-purple font-bold">{index + 1}</span>
              </div>
              
              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-surface-main p-6 rounded-2xl border border-border-light shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-surface-soft rounded-lg mr-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">{step.title}</h3>
                </div>
                <p className="text-text-secondary leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
