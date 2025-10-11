'use client';

import Link from 'next/link';

export default function TermsOfServicePage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                Welcome to Abia Ride. These Terms of Service ("Terms") govern your use of our ride-sharing mobile application and related services (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these Terms.
              </p>
              <p className="text-gray-700">
                If you do not agree to these Terms, please do not use our Service. Your continued use of the Service constitutes your acceptance of these Terms and any future modifications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                Abia Ride is a technology platform that connects riders with drivers for transportation services. Our Service includes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6">
                <li>Mobile application for requesting rides</li>
                <li>Driver matching and dispatch system</li>
                <li>Real-time GPS tracking and navigation</li>
                <li>Payment processing and receipt generation</li>
                <li>Customer support and communication tools</li>
                <li>Safety features and emergency assistance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts and Registration</h2>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Account Creation</h3>
              <p className="text-gray-700 mb-4">
                To use our Service, you must create an account and provide accurate, complete, and current information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Age Requirements</h3>
              <p className="text-gray-700 mb-4">
                You must be at least 18 years old to use our Service. By creating an account, you represent that you meet this age requirement.
              </p>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Account Termination</h3>
              <p className="text-gray-700">
                We reserve the right to suspend or terminate your account at any time for violations of these Terms or for any other reason we deem necessary to protect our Service, users, or business interests.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Conduct and Responsibilities</h2>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Rider Responsibilities</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Provide accurate pickup and drop-off locations</li>
                <li>Be ready and available at the designated pickup location</li>
                <li>Treat drivers with respect and courtesy</li>
                <li>Follow all applicable laws and regulations</li>
                <li>Do not engage in unsafe or illegal activities</li>
                <li>Pay for services rendered as agreed</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Driver Responsibilities</h3>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Maintain valid driver's license and insurance</li>
                <li>Operate vehicles safely and legally</li>
                <li>Provide accurate vehicle and service information</li>
                <li>Arrive at pickup locations promptly</li>
                <li>Treat riders with respect and professionalism</li>
                <li>Comply with all local transportation regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Payment and Pricing</h2>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Fare Calculation</h3>
              <p className="text-gray-700 mb-4">
                Fares are calculated based on distance, time, demand, and other factors. You will be provided with an estimated fare before confirming your ride request. Actual fares may vary based on real-time conditions.
              </p>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Payment Methods</h3>
              <p className="text-gray-700 mb-4">
                We accept various payment methods including credit cards, debit cards, and digital wallets. All payments are processed securely through third-party payment processors.
              </p>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Cancellation Fees</h3>
              <p className="text-gray-700">
                Cancellation fees may apply if you cancel a ride after a driver has been dispatched or after the grace period has expired. Fees help compensate drivers for their time and effort.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Safety and Emergency Procedures</h2>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Safety Features</h3>
              <p className="text-gray-700 mb-4">
                Our Service includes safety features such as GPS tracking, emergency contacts, and driver background checks. However, you acknowledge that ride-sharing involves inherent risks.
              </p>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Emergency Situations</h3>
              <p className="text-gray-700 mb-4">
                In case of emergency, contact local authorities immediately. You can also use the in-app emergency button to share your location and ride details with emergency contacts.
              </p>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Reporting Incidents</h3>
              <p className="text-gray-700">
                Report any safety concerns, accidents, or inappropriate behavior through our in-app reporting system or customer support channels.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                The Service and its original content, features, and functionality are owned by Abia Ride and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="text-gray-700">
                You may not copy, modify, distribute, sell, or lease any part of our Service without our express written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Privacy and Data Protection</h2>
              <p className="text-gray-700">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Disclaimers and Limitations of Liability</h2>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Service "As Is"</h3>
              <p className="text-gray-700 mb-4">
                Our Service is provided on an "as is" and "as available" basis. We make no representations or warranties of any kind regarding the Service's availability, reliability, or accuracy.
              </p>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Limitation of Liability</h3>
              <p className="text-gray-700 mb-4">
                To the fullest extent permitted by law, Abia Ride shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.
              </p>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Third-Party Services</h3>
              <p className="text-gray-700">
                We are not responsible for the actions, omissions, errors, or failures of third-party drivers, payment processors, or other service providers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Indemnification</h2>
              <p className="text-gray-700">
                You agree to indemnify and hold harmless Abia Ride, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the Service, violation of these Terms, or infringement of any rights of another party.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your account and access to the Service immediately, without prior notice, for any reason, including breach of these Terms.
              </p>
              <p className="text-gray-700">
                Upon termination, your right to use the Service will cease immediately. Sections that by their nature should survive termination shall continue to apply.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Governing Law and Dispute Resolution</h2>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Governing Law</h3>
              <p className="text-gray-700 mb-4">
                These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to conflict of law principles.
              </p>

              <h3 className="text-xl font-medium text-gray-900 mb-3">Dispute Resolution</h3>
              <p className="text-gray-700">
                Any disputes arising from these Terms or your use of the Service shall be resolved through binding arbitration in accordance with the rules of [Arbitration Organization].
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these Terms at any time. We will notify users of material changes by email or through the Service. Your continued use of the Service after such notification constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> legal@abiaride.com</p>
                <p className="text-gray-700"><strong>Address:</strong> Abia Ride Legal Department, [Company Address]</p>
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
