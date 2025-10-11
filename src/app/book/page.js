// Ride Booking Page
'use client';

import React from 'react';
import RideBooking from '@/components/RideBooking';
import AuthContext from '@/contexts/AuthContext';

const BookPage = () => {
  const { user } = React.useContext(AuthContext);

  const handleBookingSuccess = (rideData) => {
    console.log('Booking successful:', rideData);
    // Navigate to ride tracking page
    if (rideData.rideId) {
      window.location.href = `/ride/${rideData.rideId}`;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to book a ride</h1>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-[#5F13FF] text-white rounded-lg hover:bg-[#4A0FC8] transition-colors"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-[#5F13FF] hover:text-[#4A0FC8] transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        <RideBooking
          onBookingSuccess={handleBookingSuccess}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default BookPage;
