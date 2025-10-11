// Authentication Service for Abia Ride
import apiService from './api';

// Authentication API endpoints
const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  PROFILE: '/auth/profile',
  UPDATE_PROFILE: '/auth/profile',
  CHANGE_PASSWORD: '/auth/change-password',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password'
};

// User authentication service class
class AuthService {
  // User login
  async login(credentials) {
    try {
      const response = await apiService.post(AUTH_ENDPOINTS.LOGIN, credentials);

      if (response.success && response.data.token) {
        apiService.setAuthToken(response.data.token);
        return {
          success: true,
          data: response.data,
          user: response.data.user
        };
      }

      return {
        success: false,
        error: response.message || 'Login failed'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Login failed'
      };
    }
  }

  // User registration
  async register(userData) {
    try {
      const response = await apiService.post(AUTH_ENDPOINTS.REGISTER, userData);

      if (response.success) {
        return {
          success: true,
          data: response.data,
          message: response.message || 'Registration successful'
        };
      }

      return {
        success: false,
        error: response.message || 'Registration failed'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Registration failed'
      };
    }
  }

  // User logout
  async logout() {
    try {
      await apiService.post(AUTH_ENDPOINTS.LOGOUT);
      apiService.removeAuthToken();
      apiService.disconnectWebSocket();
      return { success: true };
    } catch (error) {
      // Even if logout fails on server, remove local token
      apiService.removeAuthToken();
      apiService.disconnectWebSocket();
      return { success: false, error: error.message };
    }
  }

  // Get user profile
  async getProfile() {
    try {
      const response = await apiService.get(AUTH_ENDPOINTS.PROFILE);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await apiService.put(AUTH_ENDPOINTS.UPDATE_PROFILE, profileData);
      return {
        success: true,
        data: response.data,
        message: response.message || 'Profile updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Change password
  async changePassword(passwordData) {
    try {
      const response = await apiService.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, passwordData);
      return {
        success: true,
        message: response.message || 'Password changed successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Forgot password
  async forgotPassword(email) {
    try {
      const response = await apiService.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email });
      return {
        success: true,
        message: response.message || 'Password reset email sent'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Reset password
  async resetPassword(resetData) {
    try {
      const response = await apiService.post(AUTH_ENDPOINTS.RESET_PASSWORD, resetData);
      return {
        success: true,
        message: response.message || 'Password reset successful'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = apiService.getAuthToken();
    if (!token) return false;

    try {
      // Basic JWT expiration check
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  // Get current user from token
  getCurrentUser() {
    const token = apiService.getAuthToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      return null;
    }
  }

  // Refresh authentication token
  async refreshToken() {
    try {
      const response = await apiService.post(AUTH_ENDPOINTS.REFRESH);
      if (response.success && response.data.token) {
        apiService.setAuthToken(response.data.token);
        return { success: true, token: response.data.token };
      }
      return { success: false };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
