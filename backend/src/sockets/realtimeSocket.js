/**
 * AQMS Real-Time Socket.IO Layer
 * Streams demo sensor data to connected dashboard clients.
 * Replace demo data generators with real MQTT/ESP32 integration when hardware is connected.
 */

const demoData = require('../services/demoDataService');
const logger   = require('../utils/logger');

const OUTDOOR_INTERVAL_MS = 5000;  // 5-second updates (matches target <5s response)
const INDOOR_INTERVAL_MS  = 8000;
const ALERT_INTERVAL_MS   = 30000;

let outdoorTimer = null;
let indoorTimer  = null;
let alertTimer   = null;

function initRealtimeSocket(io) {
  io.on('connection', (socket) => {
    logger.info(`Socket connected: ${socket.id}`);

    // Send initial data immediately on connect
    socket.emit('outdoor:reading', demoData.generateOutdoorReading());
    socket.emit('indoor:reading',  demoData.generateIndoorReading());
    socket.emit('alerts:update',   demoData.generateAlerts(5));
    socket.emit('devices:status',  demoData.generateDeviceStatus());
    socket.emit('dashboard:summary', demoData.generateDashboardSummary());

    // Subscribe to specific rooms
    socket.on('subscribe', (room) => {
      socket.join(room);
      logger.info(`Socket ${socket.id} joined room: ${room}`);
    });

    socket.on('unsubscribe', (room) => {
      socket.leave(room);
    });

    socket.on('disconnect', () => {
      logger.info(`Socket disconnected: ${socket.id}`);
    });
  });

  // Broadcast outdoor readings every 5 seconds
  outdoorTimer = setInterval(() => {
    const reading = demoData.generateOutdoorReading();
    io.emit('outdoor:reading', reading);
  }, OUTDOOR_INTERVAL_MS);

  // Broadcast indoor readings every 8 seconds
  indoorTimer = setInterval(() => {
    const reading = demoData.generateIndoorReading();
    io.emit('indoor:reading', reading);
  }, INDOOR_INTERVAL_MS);

  // Broadcast alert updates every 30 seconds
  alertTimer = setInterval(() => {
    const alerts = demoData.generateAlerts(5);
    io.emit('alerts:update', alerts);
  }, ALERT_INTERVAL_MS);

  logger.info('Real-time socket layer initialized (DEMO MODE)');
}

function stopRealtimeSocket() {
  if (outdoorTimer) clearInterval(outdoorTimer);
  if (indoorTimer)  clearInterval(indoorTimer);
  if (alertTimer)   clearInterval(alertTimer);
}

module.exports = { initRealtimeSocket, stopRealtimeSocket };
