const express = require('express');
const router  = express.Router();

const healthCtrl     = require('../controllers/healthController');
const dashCtrl       = require('../controllers/dashboardController');
const monitorCtrl    = require('../controllers/monitoringController');
const deviceCtrl     = require('../controllers/deviceController');
const alertCtrl      = require('../controllers/alertController');
const analyticsCtrl  = require('../controllers/analyticsController');
const locationCtrl   = require('../controllers/locationController');
const predictionCtrl = require('../controllers/predictionController');
const contactCtrl    = require('../controllers/contactController');

// Health
router.get('/health',                  healthCtrl.getHealth);

// Dashboard
router.get('/dashboard',               dashCtrl.getDashboard);

// Monitoring
router.get('/monitoring',              monitorCtrl.getMonitoring);
router.get('/monitoring/indoor',       monitorCtrl.getIndoor);
router.get('/monitoring/outdoor',      monitorCtrl.getOutdoor);

// Sensors & Devices
router.get('/sensors',                 deviceCtrl.getSensors);
router.get('/devices',                 deviceCtrl.getDevices);
router.get('/devices/:id',             deviceCtrl.getDeviceById);

// Alerts
router.get('/alerts',                  alertCtrl.getAlerts);

// Locations / Mapping
router.get('/locations',               locationCtrl.getLocations);
router.get('/locations/:id',           locationCtrl.getLocationById);

// Analytics & Forecasting
router.get('/analytics',               analyticsCtrl.getAnalytics);
router.get('/analytics/history',       analyticsCtrl.getHistory);
router.get('/analytics/forecast',      analyticsCtrl.getForecast);

// AQI Prediction (KNN model)
router.post('/prediction',             predictionCtrl.predict);

// Contact & Demo Requests
router.post('/contact',                contactCtrl.submitContact);
router.post('/demo-request',           contactCtrl.submitDemoRequest);

module.exports = router;
