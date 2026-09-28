'use client';

export default function FAQPage() {
  const faqs = [
    { q: "What will I receive after purchasing?", a: "You will receive lifetime access to a downloadable PDF e-book containing the complete course material." },
    { q: "How can I download my e-book?", a: "After successful payment, you can download it immediately from the order success page, or anytime from the 'My Courses' section in your dashboard." },
    { q: "Is this a physical book or digital product?", a: "These are purely digital products (PDF format). No physical items will be shipped to your address." },
    { q: "Which payment methods are accepted?", a: "We accept all major Indian payment methods through our secure gateway, including UPI (GPay, PhonePe, Paytm), Debit/Credit Cards, and Net Banking." },
    { q: "Will I get lifetime access?", a: "Yes! Once purchased, you get lifetime access to the PDF material via your dashboard." },
    { q: "Can I download the PDF on mobile?", a: "Yes, the PDFs are fully compatible with mobile devices, tablets, and computers." },
    { q: "What should I do if payment succeeds but access is not available?", a: "This is rare, but if it happens, please contact us via WhatsApp or Email with your Payment ID/Order ID, and we will grant access manually." },
    { q: "Can I share or resell the PDF?", a: "No. The purchase grants you a personal, non-transferable license. Sharing, reselling, or distributing the content is strictly prohibited by copyright law." },
    { q: "Do these courses guarantee income?", a: "No. Learnora provides educational content only. Results depend entirely on your skills, effort, and implementation." },
    { q: "How can I contact support?", a: "You can reach us via the Contact Us page, email (manthandhameliya1511@gmail.com), or WhatsApp (+91 90161 04141)." },
    { q: "Is a refund available?", a: "Due to the downloadable nature of digital products, payments are generally non-refundable once accessed. Please check our Refund Policy for exceptions." },
    { q: "How quickly will I receive access?", a: "Access is granted instantly and automatically as soon as the payment gateway verifies your successful transaction." },
  ];

  return (
    <div className="min-h-screen bg-surface-main py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 text-center">Frequently Asked Questions</h1>
        <p className="text-text-secondary text-center mb-12">Find answers to common questions about purchasing and accessing our courses.</p>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-surface-soft p-6 rounded-2xl border border-border-light shadow-sm">
              <h3 className="text-lg font-bold text-text-primary mb-3 flex items-start">
                <span className="text-brand-purple mr-3 font-extrabold text-xl">Q.</span> {faq.q}
              </h3>
              <p className="text-text-secondary ml-8 font-medium leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
