// Map Component for Abia Ride
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { locationService } from '@/services/location';

const Map = ({
  center = { lat: 9.0765, lng: 8.6753 }, // Nigeria center
  zoom = 10,
  markers = [],
  onMapClick,
  className = "",
  height = "400px",
  showControls = true
}) => {
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markersRef = useRef([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize map
  useEffect(() => {
    const initMap = async () => {
      try {
        setIsLoading(true);
        await locationService.loadGoogleMaps();

        if (!window.google || !window.google.maps) {
          throw new Error('Google Maps not loaded');
        }

        const mapOptions = {
          center,
          zoom,
          mapTypeControl: showControls,
          streetViewControl: showControls,
          fullscreenControl: showControls,
          zoomControl: showControls,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        };

        googleMapRef.current = new window.google.maps.Map(mapRef.current, mapOptions);

        // Add click listener
        if (onMapClick) {
          googleMapRef.current.addListener('click', (event) => {
            const location = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng()
            };
            onMapClick(location);
          });
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Error initializing map:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    initMap();

    return () => {
      // Clean up markers
      markersRef.current.forEach(marker => {
        if (marker) marker.setMap(null);
      });
      markersRef.current = [];
    };
  }, [center, zoom, onMapClick, showControls]);

  // Update markers when markers prop changes
  useEffect(() => {
    if (!googleMapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      if (marker) marker.setMap(null);
    });
    markersRef.current = [];

    // Add new markers
    markers.forEach((markerData, index) => {
      if (!markerData.position) return;

      const markerOptions = {
        position: markerData.position,
        map: googleMapRef.current,
        title: markerData.title || '',
        draggable: markerData.draggable || false,
        icon: markerData.icon || getDefaultMarkerIcon(markerData.type)
      };

      const marker = new window.google.maps.Marker(markerOptions);

      // Add click listener
      if (markerData.onClick) {
        marker.addListener('click', () => {
          markerData.onClick(markerData);
        });
      }

      // Add drag listener
      if (markerData.draggable && markerData.onDragEnd) {
        marker.addListener('dragend', (event) => {
          const position = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          };
          markerData.onDragEnd(position, markerData);
        });
      }

      markersRef.current.push(marker);
    });

    // Fit bounds to show all markers
    if (markers.length > 1) {
      const bounds = new window.google.maps.LatLngBounds();

      markers.forEach(marker => {
        if (marker.position) {
          bounds.extend(marker.position);
        }
      });

      googleMapRef.current.fitBounds(bounds);

      // Don't zoom in too much
      const listener = window.google.maps.event.addListener(googleMapRef.current, 'idle', () => {
        if (googleMapRef.current.getZoom() > 15) {
          googleMapRef.current.setZoom(15);
        }
        window.google.maps.event.removeListener(listener);
      });
    }
  }, [markers]);

  // Get default marker icon based on type
  const getDefaultMarkerIcon = (type) => {
    const iconMap = {
      pickup: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" fill="#5F13FF" stroke="white" stroke-width="4"/>
            <circle cx="16" cy="16" r="6" fill="white"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(32, 32),
        anchor: new window.google.maps.Point(16, 16)
      },
      destination: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" fill="#FF4444" stroke="white" stroke-width="4"/>
            <path d="M16 8v16M8 16h16" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(32, 32),
        anchor: new window.google.maps.Point(16, 16)
      },
      driver: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" fill="#00AA00" stroke="white" stroke-width="4"/>
            <path d="M16 10c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="white"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(32, 32),
        anchor: new window.google.maps.Point(16, 16)
      }
    };

    return iconMap[type] || iconMap.pickup;
  };

  // Loading state
  if (isLoading) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}
        style={{ height }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5F13FF] mx-auto mb-2"></div>
          <p className="text-gray-600 text-sm">Loading map...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-red-50 border border-red-200 rounded-lg ${className}`}
        style={{ height }}
      >
        <div className="text-center text-red-600">
          <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-sm">Failed to load map</p>
          <p className="text-xs text-gray-500 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div
        ref={mapRef}
        className="w-full rounded-lg shadow-sm"
        style={{ height }}
      />

      {/* Map overlay for additional info */}
      {markers.length > 0 && (
        <div className="absolute top-2 left-2 bg-white bg-opacity-90 rounded-lg px-3 py-2 shadow-sm">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-[#5F13FF] rounded-full"></div>
              <span className="text-xs text-gray-600">Pickup</span>
            </div>
            {markers.length > 1 && (
              <>
                <div className="w-px h-3 bg-gray-300"></div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-[#FF4444] rounded-full"></div>
                  <span className="text-xs text-gray-600">Destination</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
