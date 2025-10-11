// Notification Service for Abia Ride
import apiService from './api';

// Notification API endpoints
const NOTIFICATION_ENDPOINTS = {
  GET_NOTIFICATIONS: '/notifications',
  MARK_READ: '/notifications/:id/read',
  MARK_ALL_READ: '/notifications/read-all',
  SEND_NOTIFICATION: '/notifications/send',
  SUBSCRIBE: '/notifications/subscribe',
  UNSUBSCRIBE: '/notifications/unsubscribe'
};

// Notification types
export const NOTIFICATION_TYPES = {
  RIDE_REQUESTED: 'ride_requested',
  RIDE_ACCEPTED: 'ride_accepted',
  DRIVER_ARRIVED: 'driver_arrived',
  RIDE_STARTED: 'ride_started',
  RIDE_COMPLETED: 'ride_completed',
  RIDE_CANCELLED: 'ride_cancelled',
  PAYMENT_SUCCESS: 'payment_success',
  PROMOTION: 'promotion',
  SYSTEM: 'system'
};

// Notification priorities
export const NOTIFICATION_PRIORITIES = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent'
};

// Notification service class
class NotificationService {
  constructor() {
    this.isSupported = this.checkNotificationSupport();
    this.permission = 'default';
    this.subscriptions = new Map();
    this.worker = null;
  }

  // Check if notifications are supported
  checkNotificationSupport() {
    return (
      typeof window !== 'undefined' &&
      'Notification' in window &&
      'serviceWorker' in navigator
    );
  }

  // Request notification permission
  async requestPermission() {
    if (!this.isSupported) {
      throw new Error('Notifications not supported in this browser');
    }

    if (this.permission === 'granted') {
      return true;
    }

    try {
      this.permission = await Notification.requestPermission();
      return this.permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }

  // Initialize service worker for push notifications
  async initServiceWorker() {
    if (!this.isSupported) return false;

    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      this.worker = registration;

      // Subscribe to push notifications
      await this.subscribeToPushNotifications();

      return true;
    } catch (error) {
      console.error('Error initializing service worker:', error);
      return false;
    }
  }

  // Subscribe to push notifications
  async subscribeToPushNotifications() {
    if (!this.worker) return false;

    try {
      const subscription = await this.worker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.getApplicationServerKey()
      });

      // Send subscription to backend
      await apiService.post(NOTIFICATION_ENDPOINTS.SUBSCRIBE, {
        subscription: subscription.toJSON()
      });

      return true;
    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      return false;
    }
  }

  // Get application server key (should be from environment variable)
  getApplicationServerKey() {
    // This should be your VAPID public key
    const key = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!key) {
      console.warn('VAPID public key not found');
      return null;
    }

    return this.urlB64ToUint8Array(key);
  }

  // Convert base64 string to Uint8Array
  urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  }

  // Show notification
  async showNotification(title, options = {}) {
    if (!this.isSupported || this.permission !== 'granted') {
      console.warn('Cannot show notification: permission not granted or not supported');
      return null;
    }

    const defaultOptions = {
      icon: '/svgs/Logo.svg',
      badge: '/svgs/Logo.svg',
      tag: 'abia-ride-notification',
      requireInteraction: false,
      silent: false,
      ...options
    };

    try {
      const notification = new Notification(title, defaultOptions);

      // Auto-close notification after 5 seconds for non-urgent notifications
      if (options.priority !== NOTIFICATION_PRIORITIES.URGENT) {
        setTimeout(() => {
          notification.close();
        }, 5000);
      }

      // Handle notification click
      notification.onclick = () => {
        window.focus();
        notification.close();

        // Handle different notification types
        if (options.data?.type === NOTIFICATION_TYPES.RIDE_REQUESTED) {
          // Navigate to ride tracking
          if (options.data?.rideId) {
            window.location.href = `/ride/${options.data.rideId}`;
          }
        }
      };

      return notification;
    } catch (error) {
      console.error('Error showing notification:', error);
      return null;
    }
  }

  // Show ride status notification
  async showRideNotification(rideId, type, data = {}) {
    const notifications = {
      [NOTIFICATION_TYPES.RIDE_REQUESTED]: {
        title: 'Finding your driver...',
        body: 'Please wait while we find a driver for your ride',
        priority: NOTIFICATION_PRIORITIES.NORMAL
      },
      [NOTIFICATION_TYPES.RIDE_ACCEPTED]: {
        title: 'Driver on the way!',
        body: 'Your driver is heading to the pickup location',
        priority: NOTIFICATION_PRIORITIES.HIGH
      },
      [NOTIFICATION_TYPES.DRIVER_ARRIVED]: {
        title: 'Driver has arrived',
        body: 'Your driver is waiting at the pickup location',
        priority: NOTIFICATION_PRIORITIES.URGENT
      },
      [NOTIFICATION_TYPES.RIDE_STARTED]: {
        title: 'Ride started',
        body: 'Enjoy your ride! You are on the way to your destination',
        priority: NOTIFICATION_PRIORITIES.NORMAL
      },
      [NOTIFICATION_TYPES.RIDE_COMPLETED]: {
        title: 'Ride completed',
        body: 'Thank you for riding with Abia Ride!',
        priority: NOTIFICATION_PRIORITIES.NORMAL
      },
      [NOTIFICATION_TYPES.RIDE_CANCELLED]: {
        title: 'Ride cancelled',
        body: 'Your ride has been cancelled',
        priority: NOTIFICATION_PRIORITIES.HIGH
      }
    };

    const notification = notifications[type];
    if (!notification) return null;

    return this.showNotification(notification.title, {
      body: notification.body,
      priority: notification.priority,
      data: {
        type,
        rideId,
        ...data
      },
      actions: [
        {
          action: 'view',
          title: 'View Ride'
        }
      ]
    });
  }

  // Get user notifications
  async getNotifications(params = {}) {
    try {
      const response = await apiService.get(NOTIFICATION_ENDPOINTS.GET_NOTIFICATIONS, {
        page: params.page || 1,
        limit: params.limit || 20,
        read: params.read,
        type: params.type,
        ...params
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to get notifications'
      };
    }
  }

  // Mark notification as read
  async markAsRead(notificationId) {
    try {
      const response = await apiService.post(
        NOTIFICATION_ENDPOINTS.MARK_READ.replace(':id', notificationId)
      );

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to mark notification as read'
      };
    }
  }

  // Mark all notifications as read
  async markAllAsRead() {
    try {
      const response = await apiService.post(NOTIFICATION_ENDPOINTS.MARK_ALL_READ);

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to mark all notifications as read'
      };
    }
  }

  // Send custom notification
  async sendNotification(userId, title, body, options = {}) {
    try {
      const response = await apiService.post(NOTIFICATION_ENDPOINTS.SEND_NOTIFICATION, {
        user_id: userId,
        title,
        body,
        type: options.type || NOTIFICATION_TYPES.SYSTEM,
        priority: options.priority || NOTIFICATION_PRIORITIES.NORMAL,
        data: options.data || {}
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to send notification'
      };
    }
  }

  // Play notification sound
  playNotificationSound(type = 'default') {
    if (typeof window === 'undefined') return;

    try {
      // Create audio context for different notification sounds
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Different frequencies for different notification types
      const frequencies = {
        default: 800,
        success: 523, // C5
        warning: 659, // E5
        error: 294   // D4
      };

      oscillator.frequency.setValueAtTime(
        frequencies[type] || frequencies.default,
        audioContext.currentTime
      );

      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.5
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.warn('Could not play notification sound:', error);
    }
  }

  // Vibrate device (mobile)
  vibrate(pattern = [200, 100, 200]) {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (error) {
        console.warn('Could not vibrate device:', error);
      }
    }
  }

  // Show notification with sound and vibration
  async showNotificationWithFeedback(title, options = {}) {
    const notification = await this.showNotification(title, options);

    if (notification) {
      // Play sound based on priority
      if (options.priority === NOTIFICATION_PRIORITIES.URGENT) {
        this.playNotificationSound('warning');
        this.vibrate([300, 100, 300, 100, 300]);
      } else if (options.priority === NOTIFICATION_PRIORITIES.HIGH) {
        this.playNotificationSound('success');
        this.vibrate([200, 100, 200]);
      } else {
        this.playNotificationSound('default');
      }
    }

    return notification;
  }
}

// Export singleton instance
export const notificationService = new NotificationService();
export default notificationService;
