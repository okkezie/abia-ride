'use client';

import Link from 'next/link';

export default function SupportPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Support Center</h1>

          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Getting Started</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">How do I book a ride?</h3>
                  <p className="text-gray-700 mb-4">
                    Booking a ride with Abia Ride is simple:
                  </p>
                  <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                    <li>Open the app and enter your pickup location</li>
                    <li>Enter your destination</li>
                    <li>Select your preferred ride type (economy, premium, etc.)</li>
                    <li>Confirm your booking and wait for your driver</li>
                    <li>Track your driver's arrival in real-time</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">How do I create an account?</h3>
                  <p className="text-gray-700">
                    Download the Abia Ride app from your app store, then tap "Sign Up" to create your account. You'll need to provide your name, phone number, and email address. You can also sign up using your Google or Apple account for faster registration.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment & Billing</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">What payment methods do you accept?</h3>
                  <p className="text-gray-700">
                    We accept various payment methods including:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mt-2">
                    <li>Credit and debit cards (Visa, MasterCard, Verve)</li>
                    <li>Mobile money wallets</li>
                    <li>Bank transfers</li>
                    <li>Cash payment (in select locations)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">How do I add a payment method?</h3>
                  <p className="text-gray-700">
                    Go to your profile in the app, tap "Payment Methods," then "Add Payment Method." Follow the prompts to securely add your card or wallet information.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Why was I charged differently than estimated?</h3>
                  <p className="text-gray-700">
                    Final charges may differ from estimates due to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 mt-2">
                    <li>Traffic conditions causing longer travel time</li>
                    <li>Route changes requested during the trip</li>
                    <li>Tolls or additional fees</li>
                    <li>Dynamic pricing during peak hours</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Safety & Security</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">How do I verify my driver's identity?</h3>
                  <p className="text-gray-700">
                    Every driver undergoes thorough background checks. In the app, you can see your driver's name, photo, vehicle details, and license plate number. You can also share your trip details with trusted contacts for added security.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">What should I do in an emergency?</h3>
                  <p className="text-gray-700 mb-4">
                    Your safety is our top priority. In case of emergency:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Use the emergency button in the app to call local authorities</li>
                    <li>Share your live location with emergency contacts</li>
                    <li>Contact our 24/7 safety hotline: +234-XXX-XXX-XXXX</li>
                    <li>Report incidents through the app after the situation is resolved</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">How do I report a safety concern?</h3>
                  <p className="text-gray-700">
                    You can report safety concerns directly in the app by going to your trip history, selecting the ride, and tapping "Report Safety Issue." You can also email our safety team at safety@abiaride.com.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Account & App Issues</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">I'm having trouble logging in</h3>
                  <p className="text-gray-700 mb-4">
                    Try these troubleshooting steps:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Check your internet connection</li>
                    <li>Reset your password using "Forgot Password"</li>
                    <li>Clear the app cache and data</li>
                    <li>Update to the latest version of the app</li>
                    <li>Contact support if issues persist</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">The app is not showing my location</h3>
                  <p className="text-gray-700 mb-4">
                    To fix location issues:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Enable location services in your device settings</li>
                    <li>Allow Abia Ride to access your location</li>
                    <li>Check if GPS is enabled</li>
                    <li>Try restarting the app or your device</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">How do I update my payment information?</h3>
                  <p className="text-gray-700">
                    Go to your profile, tap "Payment Methods," select the card you want to update, and edit the information. For security reasons, you may need to re-enter your card details.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Driver Partnership</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">How do I become a driver?</h3>
                  <p className="text-gray-700 mb-4">
                    To join our driver network:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Download the Abia Ride Driver app</li>
                    <li>Complete the application process</li>
                    <li>Submit required documents (license, insurance, vehicle registration)</li>
                    <li>Pass background check and vehicle inspection</li>
                    <li>Complete driver training program</li>
                  </ul>
                  <p className="text-gray-700 mt-4">
                    Contact our driver recruitment team at drivers@abiaride.com for more information.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Driver earnings and payments</h3>
                  <p className="text-gray-700">
                    Driver earnings are calculated based on distance, time, and demand. Payments are processed weekly and deposited directly to your bank account or mobile wallet. Check the driver app for detailed earnings reports.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">General Support</h4>
                    <p className="text-gray-700">Email: support@abiaride.com</p>
                    <p className="text-gray-700">Phone: +234-XXX-XXX-XXXX</p>
                    <p className="text-gray-700">Hours: 24/7</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Safety & Security</h4>
                    <p className="text-gray-700">Email: safety@abiaride.com</p>
                    <p className="text-gray-700">Phone: +234-XXX-XXX-XXXX</p>
                    <p className="text-gray-700">Hours: 24/7</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/contact" className="inline-flex items-center px-4 py-2 bg-[#5F13FF] text-white rounded-lg hover:bg-[#4A10CC] transition-colors">
                    Contact Support Team
                  </Link>
                </div>
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
