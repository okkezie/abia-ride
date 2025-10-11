// Location Picker Component for Abia Ride
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { locationService } from '@/services/location';

const LocationPicker = ({
  onLocationSelect,
  placeholder = "Enter location",
  showCurrentLocation = true,
  showMap = false,
  className = ""
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const autocompleteRef = useRef(null);

  // Initialize Google Places Autocomplete
  useEffect(() => {
    const initAutocomplete = async () => {
      if (!inputRef.current) return;

      try {
        const autocomplete = await locationService.initAutocomplete(inputRef.current, {
          types: ['establishment', 'geocode'],
          componentRestrictions: { country: 'ng' }
        });

        autocompleteRef.current = autocomplete;

        // Handle place selection
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();

          if (place.geometry) {
            const location = {
              name: place.name || place.formatted_address,
              address: place.formatted_address,
              coordinates: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
              },
              placeId: place.place_id
            };

            handleLocationSelect(location);
          }
        });
      } catch (error) {
        console.error('Failed to initialize autocomplete:', error);
      }
    };

    initAutocomplete();

    return () => {
      if (autocompleteRef.current) {
        // Clean up autocomplete
        window.google?.maps?.event?.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []);

  // Handle location selection
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setInputValue(location.name || location.address);
    setShowSuggestions(false);
    onLocationSelect(location);
  };

  // Get current location
  const handleCurrentLocation = async () => {
    setIsGettingLocation(true);

    try {
      const position = await locationService.getCurrentLocation();
      const result = await locationService.reverseGeocode(position.lat, position.lng);

      if (result.success) {
        const location = {
          name: result.data.display_name || 'Current Location',
          address: result.data.formatted_address,
          coordinates: position,
          isCurrentLocation: true
        };

        handleLocationSelect(location);
      } else {
        throw new Error('Failed to get address for current location');
      }
    } catch (error) {
      console.error('Error getting current location:', error);
      alert('Failed to get your current location. Please check your location permissions.');
    } finally {
      setIsGettingLocation(false);
    }
  };

  // Handle input change
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);

    try {
      const result = await locationService.getLocationSuggestions(value);

      if (result.success) {
        setSuggestions(result.data.suggestions || []);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error('Error getting suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = async (suggestion) => {
    try {
      const result = await locationService.getPlaceDetails(suggestion.place_id);

      if (result.success) {
        const location = {
          name: suggestion.name,
          address: suggestion.formatted_address,
          coordinates: {
            lat: suggestion.geometry.location.lat,
            lng: suggestion.geometry.location.lng
          },
          placeId: suggestion.place_id
        };

        handleLocationSelect(location);
      }
    } catch (error) {
      console.error('Error getting place details:', error);
    }
  };

  // Handle input focus
  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Input Field */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5F13FF] focus:border-transparent"
          autoComplete="off"
        />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#5F13FF]"></div>
          </div>
        )}

        {/* Current Location Button */}
        {showCurrentLocation && (
          <button
            type="button"
            onClick={handleCurrentLocation}
            disabled={isGettingLocation}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-[#5F13FF] disabled:opacity-50"
            title="Use current location"
          >
            {isGettingLocation ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#5F13FF]"></div>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {suggestion.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {suggestion.formatted_address}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Selected Location Display */}
      {selectedLocation && (
        <div className="mt-2 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-[#5F13FF] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {selectedLocation.name}
              </p>
              {selectedLocation.address && (
                <p className="text-sm text-gray-500">
                  {selectedLocation.address}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
