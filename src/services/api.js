import axios from 'axios';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:5000/api'; // Change this to your server URL

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Socket.IO instance
let socket = null;

// API methods
export const apiService = {
  // Auth
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  },

  logout: async () => {
    await api.post('/auth/logout');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },

  // Orders
  getOrders: () => api.get('/orders'),
  getActiveOrders: () => api.get('/orders/active'),
  createOrder: (orderData) => api.post('/orders', orderData),
  updateOrderStatus: (orderId, status) => 
    api.patch(`/orders/${orderId}/status`, { status }),

  // Analytics
  getDailyStats: () => api.get('/analytics/daily-stats'),
  getHourlyOrders: () => api.get('/analytics/hourly-orders'),
  getPeakHours: () => api.get('/analytics/peak-hours'),

  // Socket.IO
  connectSocket: async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return;

    socket = io(API_URL.replace('/api', ''), {
      auth: { token },
    });

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    return socket;
  },

  getSocket: () => socket,

  // Helper methods
  isAuthenticated: async () => {
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    return !!(token && user);
  },

  getCurrentUser: async () => {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};
