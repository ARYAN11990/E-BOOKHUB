'use client';

import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '', email: '', mobileNumber: '', subject: '', message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted', formData);
    alert('Message sent successfully!');
    setFormData({ fullName: '', email: '', mobileNumber: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const whatsappLink = `https://wa.me/919016104141?text=${encodeURIComponent('Hello Learnora, I would like to know more about your digital courses.')}`;

  return (
    <div className="min-h-screen bg-surface-main py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 text-center">Contact Us</h1>
        <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
          Have a question about our courses or need help with a payment? Reach out to us using the form below or via WhatsApp.
        </p>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Info */}
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-surface-main p-6 rounded-2xl border border-border-light shadow-sm flex items-start">
              <Mail className="w-6 h-6 text-brand-purple mr-4 mt-1" />
              <div>
                <h3 className="text-text-primary font-bold mb-1">Email Us</h3>
                <p className="text-sm text-text-secondary mb-3">We usually reply within 24 hours.</p>
                <a href="mailto:manthandhameliya1511@gmail.com" className="text-brand-purple hover:underline text-sm font-medium">manthandhameliya1511@gmail.com</a>
              </div>
            </div>

            <div className="bg-surface-main p-6 rounded-2xl border border-border-light shadow-sm flex items-start">
              <Phone className="w-6 h-6 text-brand-purple mr-4 mt-1" />
              <div>
                <h3 className="text-text-primary font-bold mb-1">Call or WhatsApp</h3>
                <p className="text-sm text-text-secondary mb-3">Available Mon-Sat, 10 AM to 6 PM.</p>
                <a href="tel:+919016104141" className="text-brand-purple hover:underline text-sm font-medium block mb-3">+91 90161 04141</a>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-bold bg-[#25D366] text-white px-4 py-2 rounded-lg hover:bg-[#20bd5a] transition-colors">
                  <MessageSquare className="w-4 h-4 mr-2" /> Message on WhatsApp
                </a>
              </div>
            </div>

            <div className="bg-surface-main p-6 rounded-2xl border border-border-light shadow-sm flex items-start">
              <MapPin className="w-6 h-6 text-brand-purple mr-4 mt-1" />
              <div>
                <h3 className="text-text-primary font-bold mb-1">Office Address</h3>
                <p className="text-sm text-text-secondary">Bengaluru, Karnataka, India</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3">
            <div className="bg-surface-main p-8 rounded-2xl border border-border-light shadow-sm">
              <h2 className="text-2xl font-bold text-text-primary mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Full Name</label>
                    <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Mobile Number</label>
                    <input type="tel" name="mobileNumber" required value={formData.mobileNumber} onChange={handleChange} className="w-full px-4 py-3 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Email Address</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">Subject</label>
                    <input type="text" name="subject" required value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Message</label>
                  <textarea name="message" required rows={5} value={formData.message} onChange={handleChange} className="w-full px-4 py-3 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple resize-none"></textarea>
                </div>

                <button type="submit" className="btn-primary py-3 px-8">
                  Submit Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
