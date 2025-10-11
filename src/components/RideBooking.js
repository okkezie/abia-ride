// Ride Booking Component for Abia Ride
'use client';

import React, { useState, useEffect } from 'react';
import rideService from '@/services/rides';
import { locationService } from '@/services/location';
import LocationPicker from './LocationPicker';
import RIDE_TYPES from '@/services/api';
import Map from './Map';

const RideBooking = ({ onRideBooked, className = "" }) => {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [selectedRideType, setSelectedRideType] = useState(RIDE_TYPES.ECONOMY);
  const [estimate, setEstimate] = useState(null);
  const [isLoadingEstimate, setIsLoadingEstimate] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // Ride type options
  const rideTypes = [
    {
      type: RIDE_TYPES.ECONOMY,
      name: 'Economy',
      description: 'Affordable rides for everyday',
      icon: '🚗',
      estimatedTime: '2-5 min'
    },
    {
      type: RIDE_TYPES.PREMIUM,
      name: 'Premium',
      description: 'Comfortable rides with extra space',
      icon: '🚙',
      estimatedTime: '3-7 min'
    },
    {
      type: RIDE_TYPES.LUXURY,
      name: 'Luxury',
      description: 'Premium vehicles with top drivers',
      icon: '🚐',
      estimatedTime: '5-10 min'
    }
  ];

  // Get estimate when locations change
  useEffect(() => {
    if (pickupLocation && destinationLocation) {
      getEstimate();
    } else {
      setEstimate(null);
    }
  }, [pickupLocation, destinationLocation, selectedRideType]);

  // Get ride estimate
  const getEstimate = async () => {
    if (!pickupLocation?.coordinates || !destinationLocation?.coordinates) return;

    setIsLoadingEstimate(true);

    try {
      const result = await rideService.getEstimate(
        pickupLocation.coordinates,
        destinationLocation.coordinates,
        selectedRideType
      );

      if (result.success) {
        setEstimate(result.data);
      }
    } catch (error) {
      console.error('Error getting estimate:', error);
    } finally {
      setIsLoadingEstimate(false);
    }
  };

  // Handle location selection
  const handleLocationSelect = (location, type) => {
    if (type === 'pickup') {
      setPickupLocation(location);
    } else {
      setDestinationLocation(location);
    }
  };

  // Book ride
  const bookRide = async () => {
    if (!pickupLocation || !destinationLocation) {
      alert('Please select both pickup and destination locations');
      return;
    }

    setIsBooking(true);

    try {
      const rideData = {
        pickupLocation: pickupLocation.name || pickupLocation.address,
        destinationLocation: destinationLocation.name || destinationLocation.address,
        pickupCoordinates: pickupLocation.coordinates,
        destinationCoordinates: destinationLocation.coordinates,
        rideType: selectedRideType,
        paymentMethod: 'cash' // Default payment method
      };

      const result = await rideService.bookRide(rideData);

      if (result.success) {
        alert('Ride booked successfully!');
        onRideBooked?.(result.ride);

        // Reset form
        setPickupLocation(null);
        setDestinationLocation(null);
        setEstimate(null);
      } else {
        alert(result.error || 'Failed to book ride');
      }
    } catch (error) {
      console.error('Error booking ride:', error);
      alert('Failed to book ride. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  // Map markers
  const mapMarkers = [];
  if (pickupLocation?.coordinates) {
    mapMarkers.push({
      position: pickupLocation.coordinates,
      type: 'pickup',
      title: pickupLocation.name || 'Pickup Location'
    });
  }
  if (destinationLocation?.coordinates) {
    mapMarkers.push({
      position: destinationLocation.coordinates,
      type: 'destination',
      title: destinationLocation.name || 'Destination'
    });
  }

  // Map center
  const mapCenter = pickupLocation?.coordinates || destinationLocation?.coordinates || { lat: 9.0765, lng: 8.6753 };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Book a Ride</h2>
        <button
          onClick={() => setShowMap(!showMap)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">Map</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Location Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pickup Location
            </label>
            <LocationPicker
              onLocationSelect={(location) => handleLocationSelect(location, 'pickup')}
              placeholder="Enter pickup location"
              value={pickupLocation?.name || ''}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destination
            </label>
            <LocationPicker
              onLocationSelect={(location) => handleLocationSelect(location, 'destination')}
              placeholder="Enter destination"
              value={destinationLocation?.name || ''}
            />
          </div>
        </div>

        {/* Map View */}
        {showMap && (
          <div className="border rounded-lg overflow-hidden">
            <Map
              center={mapCenter}
              zoom={13}
              markers={mapMarkers}
              height="300px"
              className="w-full"
            />
          </div>
        )}

        {/* Ride Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Choose Ride Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {rideTypes.map((rideType) => (
              <button
                key={rideType.type}
                onClick={() => setSelectedRideType(rideType.type)}
                className={`p-4 border-2 rounded-lg text-left transition-all ${
                  selectedRideType === rideType.type
                    ? 'border-[#5F13FF] bg-[#5F13FF] bg-opacity-5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{rideType.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{rideType.name}</h3>
                    <p className="text-sm text-gray-600">{rideType.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{rideType.estimatedTime}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Estimate Display */}
        {estimate && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Ride Estimate</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Distance:</span>
                <span className="font-medium ml-2">{estimate.distance} km</span>
              </div>
              <div>
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium ml-2">{estimate.duration}</span>
              </div>
              <div>
                <span className="text-gray-600">Base Fare:</span>
                <span className="font-medium ml-2">₦{estimate.baseFare}</span>
              </div>
              <div>
                <span className="text-gray-600">Total:</span>
                <span className="font-medium ml-2 text-[#5F13FF]">₦{estimate.totalFare}</span>
              </div>
            </div>
          </div>
        )}

        {/* Loading Estimate */}
        {isLoadingEstimate && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#5F13FF]"></div>
              <span className="text-sm text-gray-600">Calculating estimate...</span>
            </div>
          </div>
        )}

        {/* Book Ride Button */}
        <button
          onClick={bookRide}
          disabled={!pickupLocation || !destinationLocation || isBooking}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-colors ${
            pickupLocation && destinationLocation && !isBooking
              ? 'bg-[#5F13FF] hover:bg-[#4A0FC8]'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {isBooking ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Booking Ride...</span>
            </div>
          ) : (
            'Book Ride'
          )}
        </button>
      </div>
    </div>
  );
};

export default RideBooking;
