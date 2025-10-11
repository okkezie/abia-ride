// Location Services for Abia Ride
import apiService from './api';

// Location API endpoints
const LOCATION_ENDPOINTS = {
  GEOCODE: '/location/geocode',
  REVERSE_GEOCODE: '/location/reverse-geocode',
  AUTOCOMPLETE: '/location/autocomplete',
  PLACE_DETAILS: '/location/place-details',
  DIRECTIONS: '/location/directions'
};

// Location service class
class LocationService {
  constructor() {
    this.googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    this.isGoogleMapsLoaded = false;
    this.googleMapsPromise = null;
  }

  // Load Google Maps API
  loadGoogleMaps() {
    if (this.isGoogleMapsLoaded) {
      return Promise.resolve();
    }

    if (this.googleMapsPromise) {
      return this.googleMapsPromise;
    }

    this.googleMapsPromise = new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('Google Maps can only be loaded on the client side'));
        return;
      }

      // Check if Google Maps is already loaded
      if (window.google && window.google.maps) {
        this.isGoogleMapsLoaded = true;
        resolve();
        return;
      }

      // Load Google Maps script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.googleMapsApiKey}&libraries=places,geometry`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        this.isGoogleMapsLoaded = true;
        resolve();
      };

      script.onerror = () => {
        reject(new Error('Failed to load Google Maps API'));
      };

      document.head.appendChild(script);
    });

    return this.googleMapsPromise;
  }

  // Initialize Google Places Autocomplete
  async initAutocomplete(inputElement, options = {}) {
    try {
      await this.loadGoogleMaps();

      const defaultOptions = {
        types: ['establishment', 'geocode'],
        componentRestrictions: { country: 'ng' }, // Nigeria
        fields: ['place_id', 'name', 'formatted_address', 'geometry', 'types']
      };

      const autocomplete = new window.google.maps.places.Autocomplete(
        inputElement,
        { ...defaultOptions, ...options }
      );

      return autocomplete;
    } catch (error) {
      console.error('Failed to initialize autocomplete:', error);
      throw error;
    }
  }

  // Get current location
  async getCurrentLocation(options = {}) {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      const defaultOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          let errorMessage = 'Failed to get current location';

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied by user';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
          }

          reject(new Error(errorMessage));
        },
        { ...defaultOptions, ...options }
      );
    });
  }

  // Reverse geocode coordinates to address
  async reverseGeocode(lat, lng) {
    try {
      const response = await apiService.get(LOCATION_ENDPOINTS.REVERSE_GEOCODE, {
        lat,
        lng
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to reverse geocode'
      };
    }
  }

  // Geocode address to coordinates
  async geocode(address) {
    try {
      const response = await apiService.get(LOCATION_ENDPOINTS.GEOCODE, {
        address
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to geocode address'
      };
    }
  }

  // Get place details by place ID
  async getPlaceDetails(placeId) {
    try {
      const response = await apiService.get(LOCATION_ENDPOINTS.PLACE_DETAILS, {
        place_id: placeId
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get place details'
      };
    }
  }

  // Get directions between two points
  async getDirections(origin, destination, mode = 'driving') {
    try {
      const response = await apiService.get(LOCATION_ENDPOINTS.DIRECTIONS, {
        origin: `${origin.lat},${origin.lng}`,
        destination: `${destination.lat},${destination.lng}`,
        mode
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get directions'
      };
    }
  }

  // Calculate distance between two coordinates
  calculateDistance(pos1, pos2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(pos2.lat - pos1.lat);
    const dLon = this.toRadians(pos2.lng - pos1.lng);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(pos1.lat)) * Math.cos(this.toRadians(pos2.lat)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Convert degrees to radians
  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  // Format address components
  formatAddress(components) {
    const address = {
      streetNumber: '',
      streetName: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      fullAddress: ''
    };

    components.forEach(component => {
      const types = component.types;

      if (types.includes('street_number')) {
        address.streetNumber = component.long_name;
      }
      if (types.includes('route')) {
        address.streetName = component.long_name;
      }
      if (types.includes('locality') || types.includes('administrative_area_level_3')) {
        address.city = component.long_name;
      }
      if (types.includes('administrative_area_level_1')) {
        address.state = component.long_name;
      }
      if (types.includes('country')) {
        address.country = component.long_name;
      }
      if (types.includes('postal_code')) {
        address.postalCode = component.long_name;
      }
    });

    address.fullAddress = [
      address.streetNumber,
      address.streetName,
      address.city,
      address.state,
      address.country
    ].filter(Boolean).join(', ');

    return address;
  }

  // Validate coordinate
  isValidCoordinate(lat, lng) {
    return (
      typeof lat === 'number' &&
      typeof lng === 'number' &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    );
  }

  // Check if location is within Nigeria
  isWithinNigeria(lat, lng) {
    // Nigeria bounding box
    const nigeriaBounds = {
      north: 13.892,
      south: 4.24,
      east: 14.678,
      west: 2.676
    };

    return (
      lat >= nigeriaBounds.south &&
      lat <= nigeriaBounds.north &&
      lng >= nigeriaBounds.west &&
      lng <= nigeriaBounds.east
    );
  }

  // Get location suggestions based on query
  async getLocationSuggestions(query, location = null) {
    try {
      const response = await apiService.get(LOCATION_ENDPOINTS.AUTOCOMPLETE, {
        input: query,
        location: location ? `${location.lat},${location.lng}` : null,
        radius: 50000 // 50km radius
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get location suggestions'
      };
    }
  }
}

// Export singleton instance
export const locationService = new LocationService();
export default locationService;
