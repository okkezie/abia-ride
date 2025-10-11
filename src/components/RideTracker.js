// Ride Tracker Component for Real-time Ride Updates
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { rideService, RIDE_STATUS } from '@/services/rides';
import { locationService } from '@/services/location';
import Map from './Map';

const RideTracker = ({ rideId, onRideUpdate, className = "" }) => {
  const [ride, setRide] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [estimatedArrival, setEstimatedArrival] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');

  const reconnectTimeoutRef = useRef(null);
  const unsubscribeRef = useRef(null);

  // Load ride data
  useEffect(() => {
    loadRideData();

    return () => {
      // Clean up WebSocket connection
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [rideId]);

  // Load ride data
  const loadRideData = async () => {
    try {
      setIsLoading(true);
      const result = await rideService.getRide(rideId);

      if (result.success) {
        setRide(result.data.ride);
        setError(null);

        // Start real-time tracking if ride is active
        if (result.data.ride.status !== RIDE_STATUS.COMPLETED &&
            result.data.ride.status !== RIDE_STATUS.CANCELLED) {
          startRealTimeTracking();
        }
      } else {
        setError(result.error || 'Failed to load ride data');
      }
    } catch (err) {
      console.error('Error loading ride:', err);
      setError('Failed to load ride data');
    } finally {
      setIsLoading(false);
    }
  };

  // Start real-time tracking
  const startRealTimeTracking = () => {
    setConnectionStatus('connecting');

    try {
      // Subscribe to ride updates
      unsubscribeRef.current = rideService.subscribeToRideUpdates(rideId, (update) => {
        handleRideUpdate(update);
      });

      setConnectionStatus('connected');
    } catch (error) {
      console.error('Error starting real-time tracking:', error);
      setConnectionStatus('error');

      // Retry connection after 5 seconds
      reconnectTimeoutRef.current = setTimeout(() => {
        startRealTimeTracking();
      }, 5000);
    }
  };

  // Handle real-time ride updates
  const handleRideUpdate = (update) => {
    console.log('Ride update received:', update);

    setRide(prevRide => ({
      ...prevRide,
      ...update,
      status: update.status || prevRide.status
    }));

    // Update driver location if provided
    if (update.driver_location) {
      setDriverLocation(update.driver_location);
    }

    // Update estimated arrival
    if (update.estimated_arrival) {
      setEstimatedArrival(update.estimated_arrival);
    }

    // Notify parent component
    onRideUpdate?.(update);
  };

  // Get status display info
  const getStatusInfo = (status) => {
    const statusMap = {
      [RIDE_STATUS.REQUESTED]: {
        label: 'Finding Driver',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
        icon: '🔍',
        description: 'Looking for a driver near you'
      },
      [RIDE_STATUS.ACCEPTED]: {
        label: 'Driver Found',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        icon: '👋',
        description: 'Driver is on the way to pickup location'
      },
      [RIDE_STATUS.IN_PROGRESS]: {
        label: 'In Progress',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        icon: '🚗',
        description: 'On the way to your destination'
      },
      [RIDE_STATUS.COMPLETED]: {
        label: 'Completed',
        color: 'text-gray-600',
        bgColor: 'bg-gray-100',
        icon: '✅',
        description: 'Ride completed successfully'
      },
      [RIDE_STATUS.CANCELLED]: {
        label: 'Cancelled',
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        icon: '❌',
        description: 'Ride has been cancelled'
      }
    };

    return statusMap[status] || statusMap[RIDE_STATUS.REQUESTED];
  };

  // Map markers
  const mapMarkers = [];

  // Add pickup location
  if (ride?.pickup_coordinates) {
    mapMarkers.push({
      position: ride.pickup_coordinates,
      type: 'pickup',
      title: ride.pickup_location || 'Pickup Location'
    });
  }

  // Add destination location
  if (ride?.destination_coordinates) {
    mapMarkers.push({
      position: ride.destination_coordinates,
      type: 'destination',
      title: ride.destination_location || 'Destination'
    });
  }

  // Add driver location
  if (driverLocation) {
    mapMarkers.push({
      position: driverLocation,
      type: 'driver',
      title: 'Driver Location'
    });
  }

  // Map center
  const mapCenter = driverLocation || ride?.pickup_coordinates || { lat: 9.0765, lng: 8.6753 };

  // Loading state
  if (isLoading) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5F13FF] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading ride details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <div className="text-center py-12">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <h3 className="text-lg font-semibold mb-2">Error Loading Ride</h3>
            <p className="text-sm">{error}</p>
          </div>
          <button
            onClick={loadRideData}
            className="px-4 py-2 bg-[#5F13FF] text-white rounded-lg hover:bg-[#4A0FC8] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!ride) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <div className="text-center py-12">
          <p className="text-gray-600">No ride data available</p>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(ride.status);

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Ride #{ride.id?.slice(-8)}</h2>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color} ${statusInfo.bgColor}`}>
            <span className="mr-1">{statusInfo.icon}</span>
            {statusInfo.label}
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-1">{statusInfo.description}</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Connection Status */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Live Tracking:</span>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected' ? 'bg-green-500' :
              connectionStatus === 'connecting' ? 'bg-yellow-500' :
              connectionStatus === 'error' ? 'bg-red-500' : 'bg-gray-400'
            }`}></div>
            <span className="capitalize text-gray-600">{connectionStatus}</span>
          </div>
        </div>

        {/* Map */}
        <div className="border rounded-lg overflow-hidden">
          <Map
            center={mapCenter}
            zoom={14}
            markers={mapMarkers}
            height="300px"
            className="w-full"
          />
        </div>

        {/* Ride Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pickup */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#5F13FF] rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Pickup</span>
            </div>
            <p className="text-sm text-gray-900 ml-5">{ride.pickup_location}</p>
          </div>

          {/* Destination */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#FF4444] rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">Destination</span>
            </div>
            <p className="text-sm text-gray-900 ml-5">{ride.destination_location}</p>
          </div>
        </div>

        {/* Driver Info */}
        {ride.driver && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Driver Information</h3>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#5F13FF] rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {ride.driver.name?.charAt(0) || 'D'}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{ride.driver.name || 'Driver'}</p>
                <p className="text-sm text-gray-600">{ride.driver.phone || 'Phone not available'}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-500">Rating:</span>
                  <div className="flex items-center">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm text-gray-600 ml-1">
                      {ride.driver.rating || '4.8'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Estimated Arrival */}
        {estimatedArrival && (
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-blue-900">Estimated Arrival</span>
            </div>
            <p className="text-blue-800 mt-1">{estimatedArrival}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {ride.driver?.phone && (
            <button className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              📞 Call Driver
            </button>
          )}
          <button className="flex-1 py-3 px-4 bg-[#5F13FF] text-white rounded-lg hover:bg-[#4A0FC8] transition-colors">
            💬 Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideTracker;
