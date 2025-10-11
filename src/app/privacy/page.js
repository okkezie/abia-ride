'use client';

import Link from 'next/link';

export default function PrivacyPolicyPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to Abia Ride ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our ride-sharing mobile application and related services (collectively, the "Service").
              </p>
              <p className="text-gray-700">
                By using our Service, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Personal Information</h3>
              <p className="text-gray-700 mb-4">We collect information you provide directly to us, including:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Name, email address, phone number, and profile picture</li>
                <li>Payment information (processed securely by third-party providers)</li>
                <li>Ride history and preferences</li>
                <li>Communication records between riders and drivers</li>
                <li>Account settings and preferences</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Location Information</h3>
              <p className="text-gray-700 mb-4">
                We collect precise location data to provide our core services:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Pickup and drop-off locations</li>
                <li>Real-time location during rides for safety and navigation</li>
                <li>Driver location for matching with nearby ride requests</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Device and Usage Information</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Device type, operating system, and unique device identifiers</li>
                <li>App usage patterns and feature interactions</li>
                <li>Crash reports and performance data</li>
                <li>Network information and connection status</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use collected information for various purposes:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li><strong>Service Provision:</strong> To facilitate ride requests, matching, and completion</li>
                <li><strong>Safety:</strong> To ensure rider and driver safety through location tracking and emergency features</li>
                <li><strong>Payment Processing:</strong> To process payments and maintain transaction records</li>
                <li><strong>Communication:</strong> To send ride confirmations, receipts, and important updates</li>
                <li><strong>Improvement:</strong> To analyze usage patterns and improve our services</li>
                <li><strong>Legal Compliance:</strong> To comply with legal obligations and protect our rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing</h2>
              <p className="text-gray-700 mb-4">We may share your information in the following circumstances:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li><strong>With Drivers:</strong> Necessary ride information with assigned drivers</li>
                <li><strong>Service Providers:</strong> With trusted third-party vendors for payment processing, mapping, and notifications</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect safety</li>
                <li><strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
              </ul>
              <p className="text-gray-700">
                We do not sell your personal information to third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Limited access to personal information on a need-to-know basis</li>
                <li>Secure payment processing through certified providers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">You have the following rights regarding your personal information:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and associated data</li>
                <li><strong>Portability:</strong> Request transfer of your data in a structured format</li>
                <li><strong>Location Controls:</strong> Manage location permissions through your device settings</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-700 mb-4">
                We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. We may retain certain information for legal, regulatory, safety, and security purposes.
              </p>
              <p className="text-gray-700">
                Account data is typically retained for the duration of your account plus a reasonable period thereafter to comply with legal obligations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-700">
                Our Service is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will take steps to delete such information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. International Data Transfers</h2>
              <p className="text-gray-700">
                Your information may be transferred to and processed in countries other than your country of residence. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> privacy@abiaride.com</p>
                <p className="text-gray-700"><strong>Address:</strong> Abia Ride Privacy Team, [Company Address]</p>
                <p className="text-gray-700"><strong>Response Time:</strong> We will respond to your inquiry within 30 days</p>
              </div>
            </section>
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
              <Link href="/contact" className="text-[#5F13FF] hover:text-[#4A10CC]">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
