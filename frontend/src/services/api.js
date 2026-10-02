import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Response interceptor — unwrap data and handle errors gracefully
api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const message = err.response?.data?.message || err.message || 'Network error';
    return Promise.reject(new Error(message));
  }
);

// ─── Dashboard ───────────────────────────────────────────────────────────────
export const getDashboard    = () => api.get('/dashboard');

// ─── Monitoring ──────────────────────────────────────────────────────────────
export const getMonitoring   = () => api.get('/monitoring');
export const getIndoor       = () => api.get('/monitoring/indoor');
export const getOutdoor      = () => api.get('/monitoring/outdoor');

// ─── Devices ─────────────────────────────────────────────────────────────────
export const getDevices      = () => api.get('/devices');
export const getDeviceById   = (id) => api.get(`/devices/${id}`);
export const getSensors      = () => api.get('/sensors');

// ─── Alerts ──────────────────────────────────────────────────────────────────
export const getAlerts       = (count = 10) => api.get(`/alerts?count=${count}`);

// ─── Locations / Mapping ─────────────────────────────────────────────────────
export const getLocations    = () => api.get('/locations');
export const getLocationById = (id) => api.get(`/locations/${id}`);

// ─── Analytics & Forecast ────────────────────────────────────────────────────
export const getAnalytics    = (period = '24h', env = 'outdoor') => api.get(`/analytics?period=${period}&env=${env}`);
export const getHistory      = (env = 'outdoor', hours = 24) => api.get(`/analytics/history?env=${env}&hours=${hours}`);
export const getForecast     = () => api.get('/analytics/forecast');

// ─── AQI Prediction (KNN) ────────────────────────────────────────────────────
export const predictAQI = (inputs) => api.post('/prediction', inputs);

// ─── Contact & Demo ──────────────────────────────────────────────────────────
export const submitContact     = (data) => api.post('/contact', data);
export const submitDemoRequest = (data) => api.post('/demo-request', data);

// ─── Health ──────────────────────────────────────────────────────────────────
export const getHealth = () => api.get('/health');

export default api;
