// Rides Service for Abia Ride
import apiService, { RIDE_STATUS, RIDE_TYPES } from './api';

// Rides API endpoints
const RIDE_ENDPOINTS = {
  BOOK_RIDE: '/rides/book',
  GET_RIDES: '/rides',
  GET_RIDE: '/rides/:id',
  CANCEL_RIDE: '/rides/:id/cancel',
  UPDATE_STATUS: '/rides/:id/status',
  RATE_RIDE: '/rides/:id/rate',
  GET_ESTIMATE: '/rides/estimate',
  GET_HISTORY: '/rides/history',
  GET_ACTIVE_RIDE: '/rides/active'
};

// Ride service class
class RideService {
  // Book a new ride
  async bookRide(rideData) {
    try {
      const response = await apiService.post(RIDE_ENDPOINTS.BOOK_RIDE, {
        pickup_location: rideData.pickupLocation,
        destination_location: rideData.destinationLocation,
        pickup_coordinates: rideData.pickupCoordinates,
        destination_coordinates: rideData.destinationCoordinates,
        ride_type: rideData.rideType || RIDE_TYPES.ECONOMY,
        payment_method: rideData.paymentMethod,
        notes: rideData.notes,
        scheduled_time: rideData.scheduledTime
      });

      if (response.success) {
        return {
          success: true,
          data: response.data,
          ride: response.data.ride
        };
      }

      return {
        success: false,
        error: response.message || 'Failed to book ride'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to book ride'
      };
    }
  }

  // Get ride estimate
  async getEstimate(pickupCoords, destinationCoords, rideType = RIDE_TYPES.ECONOMY) {
    try {
      const response = await apiService.get(RIDE_ENDPOINTS.GET_ESTIMATE, {
        pickup_lat: pickupCoords.lat,
        pickup_lng: pickupCoords.lng,
        destination_lat: destinationCoords.lat,
        destination_lng: destinationCoords.lng,
        ride_type: rideType
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get estimate'
      };
    }
  }

  // Get user's rides
  async getRides(params = {}) {
    try {
      const response = await apiService.get(RIDE_ENDPOINTS.GET_RIDES, {
        page: params.page || 1,
        limit: params.limit || 10,
        status: params.status,
        ...params
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get rides'
      };
    }
  }

  // Get specific ride details
  async getRide(rideId) {
    try {
      const response = await apiService.get(RIDE_ENDPOINTS.GET_RIDE.replace(':id', rideId));
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get ride details'
      };
    }
  }

  // Get active ride
  async getActiveRide() {
    try {
      const response = await apiService.get(RIDE_ENDPOINTS.GET_ACTIVE_RIDE);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get active ride'
      };
    }
  }

  // Cancel a ride
  async cancelRide(rideId, reason) {
    try {
      const response = await apiService.post(RIDE_ENDPOINTS.CANCEL_RIDE.replace(':id', rideId), {
        reason: reason || 'Cancelled by user'
      });

      return {
        success: true,
        message: response.message || 'Ride cancelled successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to cancel ride'
      };
    }
  }

  // Rate a completed ride
  async rateRide(rideId, rating, feedback) {
    try {
      const response = await apiService.post(RIDE_ENDPOINTS.RATE_RIDE.replace(':id', rideId), {
        rating: rating,
        feedback: feedback
      });

      return {
        success: true,
        message: response.message || 'Rating submitted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to submit rating'
      };
    }
  }

  // Get ride history
  async getRideHistory(params = {}) {
    try {
      const response = await apiService.get(RIDE_ENDPOINTS.GET_HISTORY, {
        page: params.page || 1,
        limit: params.limit || 20,
        start_date: params.startDate,
        end_date: params.endDate,
        ...params
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get ride history'
      };
    }
  }

  // Update ride status (for drivers)
  async updateRideStatus(rideId, status, location = null) {
    try {
      const updateData = { status };

      if (location) {
        updateData.current_location = location;
      }

      const response = await apiService.patch(
        RIDE_ENDPOINTS.UPDATE_STATUS.replace(':id', rideId),
        updateData
      );

      return {
        success: true,
        message: response.message || 'Ride status updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to update ride status'
      };
    }
  }

  // Accept ride (for drivers)
  async acceptRide(rideId) {
    return this.updateRideStatus(rideId, RIDE_STATUS.ACCEPTED);
  }

  // Start ride (for drivers)
  async startRide(rideId, location) {
    return this.updateRideStatus(rideId, RIDE_STATUS.IN_PROGRESS, location);
  }

  // Complete ride (for drivers)
  async completeRide(rideId, location) {
    return this.updateRideStatus(rideId, RIDE_STATUS.COMPLETED, location);
  }

  // Get nearby drivers (for real-time updates)
  async getNearbyDrivers(pickupLocation, radius = 5) {
    try {
      const response = await apiService.get('/drivers/nearby', {
        lat: pickupLocation.lat,
        lng: pickupLocation.lng,
        radius: radius
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get nearby drivers'
      };
    }
  }

  // Subscribe to ride updates via WebSocket
  subscribeToRideUpdates(rideId, callback) {
    const socket = apiService.connectWebSocket();

    const handleMessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message.type === 'ride_update' && message.ride_id === rideId) {
          callback(message.data);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    apiService.onMessage(handleMessage);

    return () => {
      if (socket) {
        socket.removeEventListener('message', handleMessage);
      }
    };
  }

  // Calculate distance between two coordinates (Haversine formula)
  calculateDistance(coord1, coord2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(coord2.lat - coord1.lat);
    const dLon = this.toRadians(coord2.lng - coord1.lng);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRadians(coord1.lat)) * Math.cos(this.toRadians(coord2.lat)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Convert degrees to radians
  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  // Format ride duration
  formatDuration(minutes) {
    if (minutes < 60) {
      return `${Math.round(minutes)} min`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);

    if (remainingMinutes === 0) {
      return `${hours}h`;
    }

    return `${hours}h ${remainingMinutes}min`;
  }
}

// Export singleton instance
export const rideService = new RideService();
export default rideService;
