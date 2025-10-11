'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You would typically send this to your backend API
    alert('Thank you for your message! We will get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      category: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-[#5F13FF] rounded-lg flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h6a2 2 0 012 2v4m-8 4h8m-8 4h8m4-8v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a2 2 0 012-2h1m6-4h.01M16 7h.01" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">Abia Ride</span>
            </Link>
            <Link href="/login" className="text-[#5F13FF] hover:text-[#4A10CC] font-medium">
              Back to App
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>

          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">General Support</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Email:</strong> support@abiaride.com</p>
                    <p><strong>Phone:</strong> +234-XXX-XXX-XXXX</p>
                    <p><strong>Hours:</strong> 24/7</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Safety & Security</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Email:</strong> safety@abiaride.com</p>
                    <p><strong>Phone:</strong> +234-XXX-XXX-XXXX</p>
                    <p><strong>Hours:</strong> 24/7</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Driver Partnership</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Email:</strong> drivers@abiaride.com</p>
                    <p><strong>Phone:</strong> +234-XXX-XXX-XXXX</p>
                    <p><strong>Hours:</strong> Mon-Fri, 9 AM - 6 PM</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Business Inquiries</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Email:</strong> business@abiaride.com</p>
                    <p><strong>Phone:</strong> +234-XXX-XXX-XXXX</p>
                    <p><strong>Hours:</strong> Mon-Fri, 9 AM - 6 PM</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Press & Media</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Email:</strong> press@abiaride.com</p>
                    <p><strong>Phone:</strong> +234-XXX-XXX-XXXX</p>
                    <p><strong>Hours:</strong> Mon-Fri, 9 AM - 6 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Response Times</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>Emergency Issues:</strong> Within 1 hour</li>
                  <li><strong>Safety Concerns:</strong> Within 2 hours</li>
                  <li><strong>General Support:</strong> Within 24 hours</li>
                  <li><strong>Business Inquiries:</strong> Within 48 hours</li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F13FF] focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F13FF] focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F13FF] focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    <option value="general">General Support</option>
                    <option value="safety">Safety & Security</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="technical">Technical Issues</option>
                    <option value="driver">Driver Partnership</option>
                    <option value="business">Business Inquiries</option>
                    <option value="press">Press & Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F13FF] focus:border-transparent"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5F13FF] focus:border-transparent resize-vertical"
                    placeholder="Please provide detailed information about your inquiry..."
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    required
                    className="mt-1 h-4 w-4 text-[#5F13FF] focus:ring-[#5F13FF] border-gray-300 rounded"
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-700">
                    I agree to the processing of my personal data as described in the{' '}
                    <Link href="/privacy" className="text-[#5F13FF] hover:text-[#4A10CC]">
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#5F13FF] text-white py-3 px-6 rounded-lg hover:bg-[#4A10CC] transition-colors font-medium"
                >
                  Send Message
                </button>
              </form>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Before Contacting Us</h3>
                <p className="text-gray-700 mb-4">
                  For faster resolution, please check our Support Center first:
                </p>
                <Link
                  href="/support"
                  className="inline-flex items-center text-[#5F13FF] hover:text-[#4A10CC] font-medium"
                >
                  Visit Support Center →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} Abia Ride. All rights reserved.
            </p>
            <div className="mt-4 space-x-6">
              <Link href="/terms" className="text-[#5F13FF] hover:text-[#4A10CC]">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-[#5F13FF] hover:text-[#4A10CC]">
                Privacy Policy
              </Link>
              <Link href="/support" className="text-[#5F13FF] hover:text-[#4A10CC]">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
