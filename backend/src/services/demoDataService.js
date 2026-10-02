/**
 * AQMS Demo Data Service
 * Generates realistic simulated sensor readings for demonstration purposes.
 * All data from this service is clearly marked as DEMO / SIMULATED DATA.
 * Replace with real MQTT/ESP32 integration for production hardware.
 */

const { v4: uuidv4 } = require('uuid');

// ─── Base sensor ranges ───────────────────────────────────────────────────────
const RANGES = {
  pm25:          { min: 12,  max: 145, unit: 'µg/m³' },
  pm10:          { min: 20,  max: 230, unit: 'µg/m³' },
  co:            { min: 0.05, max: 0.35, unit: 'ppm' },
  no2:           { min: 8,   max: 65,  unit: 'µg/m³' },
  so2:           { min: 5,   max: 38,  unit: 'µg/m³' },
  o3:            { min: 40,  max: 160, unit: 'µg/m³' },
  temperature:   { min: 18,  max: 38,  unit: '°C' },
  humidity:      { min: 35,  max: 85,  unit: '%' },
  pressure:      { min: 1005, max: 1025, unit: 'hPa' },
  eco2:          { min: 400, max: 2000, unit: 'ppm' },
  tvoc:          { min: 0,   max: 600, unit: 'ppb' },
  windSpeed:     { min: 0,   max: 25,  unit: 'm/s' },
  windDirection: { min: 0,   max: 360, unit: '°' },
  rainfall:      { min: 0,   max: 15,  unit: 'mm/h' },
  solarRadiation:{ min: 0,   max: 1100, unit: 'W/m²' },
};

// ─── Location definitions ─────────────────────────────────────────────────────
const LOCATIONS = [
  { id: 'loc-001', name: 'Davangere City Center',  type: 'urban',       lat: 14.4644, lng: 75.9218, environment: 'outdoor' },
  { id: 'loc-002', name: 'Industrial Zone – KIADB', type: 'industrial',  lat: 14.4510, lng: 75.9340, environment: 'outdoor' },
  { id: 'loc-003', name: 'MCC Traffic Junction',   type: 'traffic',     lat: 14.4682, lng: 75.9157, environment: 'outdoor' },
  { id: 'loc-004', name: 'JIT Davangere Campus',   type: 'campus',      lat: 14.4428, lng: 75.9120, environment: 'indoor'  },
  { id: 'loc-005', name: 'Davangere Market Area',  type: 'commercial',  lat: 14.4660, lng: 75.9195, environment: 'outdoor' },
  { id: 'loc-006', name: 'P.J. Extension – Green Zone', type: 'sensitive', lat: 14.4750, lng: 75.9280, environment: 'outdoor' },
];

// ─── Device definitions ───────────────────────────────────────────────────────
const DEVICES = [
  {
    id: 'AQMS-001', name: 'AQMo Outdoor Logger #1',
    type: 'AQMo', environment: 'outdoor', locationId: 'loc-001',
    firmware: 'v2.1.4', model: 'RDL838',
    lastCalibrated: '2026-03-15',
  },
  {
    id: 'AQMS-002', name: 'AQMi Indoor Logger #1',
    type: 'AQMi', environment: 'indoor', locationId: 'loc-004',
    firmware: 'v2.1.3', model: 'RDL838',
    lastCalibrated: '2026-03-10',
  },
  {
    id: 'AQMS-003', name: 'AQMo Outdoor Logger #2',
    type: 'AQMo', environment: 'outdoor', locationId: 'loc-002',
    firmware: 'v2.0.9', model: 'RDL838',
    lastCalibrated: '2026-02-28',
  },
  {
    id: 'AQMS-004', name: 'AQMo Traffic Monitor',
    type: 'AQMo', environment: 'outdoor', locationId: 'loc-003',
    firmware: 'v2.1.4', model: 'RDL838',
    lastCalibrated: '2026-03-20',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function rand(min, max, decimals = 2) {
  const v = Math.random() * (max - min) + min;
  return parseFloat(v.toFixed(decimals));
}

function jitter(base, pct = 0.08) {
  const delta = base * pct;
  return parseFloat((base + rand(-delta, delta)).toFixed(2));
}

// AQI calculation based on PM2.5 (simplified linear scale for demo)
// Simplified linear AQI approximation based on PM2.5 — used for DEMO DATA GENERATION only.
// This is NOT the official US EPA or Indian CPCB AQI sub-index formula.
// It produces plausible-looking AQI values for visual demonstration purposes.
function calcAQI(pm25) {
  if (pm25 <= 12)   return Math.round(pm25 * 4.17);          // 0–50
  if (pm25 <= 35.4) return Math.round(50 + (pm25 - 12) * 2.1);  // 51–100
  if (pm25 <= 55.4) return Math.round(100 + (pm25 - 35.4) * 0.99); // 101–120
  if (pm25 <= 150.4)return Math.round(120 + (pm25 - 55.4) * 0.99); // 121–215
  return Math.round(215 + (pm25 - 150.4) * 1.0);
}

function getAQIStatus(aqi) {
  // Demo AQI status labels — aligned with the AQI_Bucket categories from Station.csv
  // for consistency with the KNN prediction model output.
  // These are NOT official CPCB regulatory thresholds.
  if (aqi <= 50)  return { label: 'Good',         color: '#22c55e', severity: 1 };
  if (aqi <= 100) return { label: 'Satisfactory',  color: '#84cc16', severity: 2 };
  if (aqi <= 200) return { label: 'Moderate',      color: '#f59e0b', severity: 3 };
  if (aqi <= 300) return { label: 'Poor',          color: '#f97316', severity: 4 };
  if (aqi <= 400) return { label: 'Very Poor',     color: '#ef4444', severity: 5 };
  return           { label: 'Severe',              color: '#7f1d1d', severity: 6 };
}

// ─── Generate a single outdoor reading ───────────────────────────────────────
function generateOutdoorReading(deviceId = 'AQMS-001', locationId = 'loc-001') {
  const pm25 = rand(RANGES.pm25.min, RANGES.pm25.max);
  const aqi  = calcAQI(pm25);
  const status = getAQIStatus(aqi);
  return {
    readingId:   uuidv4(),
    deviceId,
    locationId,
    environment: 'outdoor',
    timestamp:   new Date().toISOString(),
    dataSource:  'DEMO_SIMULATED',
    aqi,
    aqiStatus:   status,
    pm25,
    pm10:        rand(RANGES.pm10.min, RANGES.pm10.max),
    co:          rand(RANGES.co.min,   RANGES.co.max,  3),
    no2:         rand(RANGES.no2.min,  RANGES.no2.max),
    so2:         rand(RANGES.so2.min,  RANGES.so2.max),
    o3:          rand(RANGES.o3.min,   RANGES.o3.max),
    temperature: rand(RANGES.temperature.min, RANGES.temperature.max, 1),
    humidity:    rand(RANGES.humidity.min,    RANGES.humidity.max,    1),
    pressure:    rand(RANGES.pressure.min,    RANGES.pressure.max,    1),
    windSpeed:   rand(RANGES.windSpeed.min,   RANGES.windSpeed.max,   1),
    windDirection: rand(RANGES.windDirection.min, RANGES.windDirection.max, 0),
    rainfall:    rand(0, 3, 2),
    solarRadiation: rand(200, 900, 1),
  };
}

// ─── Generate a single indoor reading ────────────────────────────────────────
function generateIndoorReading(deviceId = 'AQMS-002', locationId = 'loc-004') {
  const pm25 = rand(5, 55);
  const eco2 = rand(RANGES.eco2.min, RANGES.eco2.max, 0);
  const tvoc = rand(RANGES.tvoc.min, RANGES.tvoc.max, 0);
  const aqi  = calcAQI(pm25);
  const status = getAQIStatus(aqi);
  return {
    readingId:   uuidv4(),
    deviceId,
    locationId,
    environment: 'indoor',
    timestamp:   new Date().toISOString(),
    dataSource:  'DEMO_SIMULATED',
    aqi,
    aqiStatus:   status,
    pm25,
    pm10:        rand(10, 80),
    co:          rand(0.02, 0.15, 3),
    no2:         rand(5, 25),
    so2:         rand(2, 15),
    o3:          rand(15, 60),
    temperature: rand(20, 28, 1),
    humidity:    rand(40, 70, 1),
    pressure:    rand(1008, 1020, 1),
    eco2,
    tvoc,
  };
}

// ─── Generate historical data ─────────────────────────────────────────────────
// Point count scales with period: 48 for 24h, 84 for 7d, 120 for 30d.
// Each period uses an appropriate time-step so timestamps are realistic.
function generateHistoricalData(environment = 'outdoor', hours = 24) {
  const now = Date.now();
  // Scale point count with period so longer periods have more data points
  let pointCount;
  if (hours <= 24)       pointCount = 48;   // every 30 min
  else if (hours <= 168) pointCount = 84;   // every 2 hours over 7d
  else                   pointCount = 120;  // every 6 hours over 30d

  const step = (hours * 3600 * 1000) / pointCount;
  const data = [];
  let basePM25 = rand(30, 90);

  for (let i = pointCount - 1; i >= 0; i--) {
    basePM25 = Math.max(10, Math.min(150, jitter(basePM25, 0.12)));
    const ts = new Date(now - i * step).toISOString();
    const aqi = calcAQI(basePM25);

    if (environment === 'indoor') {
      data.push({
        timestamp: ts,
        pm25: parseFloat(basePM25.toFixed(1)),
        pm10: parseFloat((basePM25 * 1.5 + rand(-5, 5)).toFixed(1)),
        eco2: rand(400, 1600, 0),
        tvoc: rand(0, 450, 0),
        temperature: rand(20, 28, 1),
        humidity: rand(40, 70, 1),
        pressure: rand(1008, 1020, 1),
        aqi,
      });
    } else {
      data.push({
        timestamp: ts,
        pm25: parseFloat(basePM25.toFixed(1)),
        pm10: parseFloat((basePM25 * 1.8 + rand(-10, 10)).toFixed(1)),
        co:   rand(0.05, 0.30, 3),
        no2:  rand(10, 55),
        so2:  rand(5, 35),
        o3:   rand(40, 155),
        temperature: rand(22, 36, 1),
        humidity: rand(38, 80, 1),
        windSpeed: rand(0, 20, 1),
        aqi,
      });
    }
  }
  return data;
}

// ─── Generate device status ───────────────────────────────────────────────────
function generateDeviceStatus() {
  return DEVICES.map(device => {
    const online = Math.random() > 0.1; // 90% chance online
    return {
      ...device,
      status:         online ? 'online' : 'offline',
      connectivity:   online ? (Math.random() > 0.15 ? 'WiFi' : '4G') : 'disconnected',
      signalStrength: online ? rand(50, 100, 0) : 0,
      batteryLevel:   rand(45, 100, 0),
      lastSeen:       new Date(Date.now() - rand(0, 300000)).toISOString(),
      sensorHealth: {
        pm:          online && Math.random() > 0.05 ? 'healthy' : 'warning',
        gas:         online && Math.random() > 0.08 ? 'healthy' : 'warning',
        environmental: 'healthy',
        connectivity: online ? 'healthy' : 'error',
      },
      dataTransmission: online ? 'active' : 'stopped',
      calibrationDue:   Math.random() > 0.7,
      readingCount24h:  online ? rand(280, 300, 0) : 0,
      uptime:           online ? rand(1, 720, 0) : 0, // hours
    };
  });
}

// ─── Generate alerts ──────────────────────────────────────────────────────────
const ALERT_TEMPLATES = [
  { type: 'elevated_pm25',        severity: 'warning',  message: 'PM2.5 levels elevated above threshold',             sensor: 'PM2.5' },
  { type: 'high_co',              severity: 'critical', message: 'CO concentration at hazardous level',               sensor: 'CO' },
  { type: 'poor_indoor_air',      severity: 'warning',  message: 'Indoor eCO₂ exceeds comfort threshold (>1000 ppm)', sensor: 'eCO₂' },
  { type: 'sensor_malfunction',   severity: 'error',    message: 'Sensor data transmission interrupted',              sensor: 'PM10' },
  { type: 'connectivity_loss',    severity: 'error',    message: 'Device lost connectivity',                          sensor: 'Network' },
  { type: 'battery_warning',      severity: 'info',     message: 'Device battery below 20%',                         sensor: 'Power' },
  { type: 'high_tvoc',            severity: 'warning',  message: 'TVOC levels elevated — improve ventilation',        sensor: 'TVOC' },
  { type: 'abnormal_o3',          severity: 'warning',  message: 'O₃ concentration abnormally high',                 sensor: 'O₃' },
  { type: 'maintenance_due',      severity: 'info',     message: 'Scheduled calibration/maintenance due',             sensor: 'System' },
  { type: 'high_no2',             severity: 'warning',  message: 'NO₂ concentration above safe limit',               sensor: 'NO₂' },
];

function generateAlerts(count = 8) {
  const alerts = [];
  const deviceIds = DEVICES.map(d => d.id);
  const locationMap = Object.fromEntries(DEVICES.map(d => [d.id, d.locationId]));

  for (let i = 0; i < count; i++) {
    const template = ALERT_TEMPLATES[i % ALERT_TEMPLATES.length];
    const deviceId = deviceIds[i % deviceIds.length];
    const locationId = locationMap[deviceId];
    const location = LOCATIONS.find(l => l.id === locationId);

    alerts.push({
      id:        uuidv4(),
      ...template,
      deviceId,
      locationId,
      locationName: location ? location.name : 'Unknown Location',
      timestamp: new Date(Date.now() - rand(0, 3600000 * 12)).toISOString(),
      acknowledged: Math.random() > 0.6,
      dataSource: 'DEMO_SIMULATED',
    });
  }

  return alerts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

// ─── Aggregate dashboard summary ─────────────────────────────────────────────
function generateDashboardSummary() {
  const outdoorReading = generateOutdoorReading();
  const indoorReading  = generateIndoorReading();
  const devices        = generateDeviceStatus();
  const alerts         = generateAlerts(6);
  const onlineDevices  = devices.filter(d => d.status === 'online').length;

  return {
    dataSource:  'DEMO_SIMULATED',
    timestamp:   new Date().toISOString(),
    summary: {
      overallAQI:       outdoorReading.aqi,
      aqiStatus:        outdoorReading.aqiStatus,
      devicesOnline:    onlineDevices,
      devicesTotal:     devices.length,
      activeAlerts:     alerts.filter(a => !a.acknowledged).length,
      locationsMonitored: LOCATIONS.length,
    },
    outdoor: outdoorReading,
    indoor:  indoorReading,
    devices,
    alerts,
    locations: LOCATIONS,
  };
}

// ─── Forecast data (demo) ─────────────────────────────────────────────────────
function generateForecast(hours = 24) {
  const data = [];
  let basePM25 = rand(35, 80);
  for (let i = 1; i <= hours; i++) {
    basePM25 = Math.max(10, Math.min(140, jitter(basePM25, 0.10)));
    const aqi = calcAQI(basePM25);
    data.push({
      hour: i,
      timestamp: new Date(Date.now() + i * 3600 * 1000).toISOString(),
      pm25Forecast:  parseFloat(basePM25.toFixed(1)),
      aqiForecast:   aqi,
      confidence:    parseFloat((95 - i * 1.5).toFixed(1)),
      dataSource:    'DEMO_FORECAST',
    });
  }
  return data;
}

module.exports = {
  generateOutdoorReading,
  generateIndoorReading,
  generateHistoricalData,
  generateDeviceStatus,
  generateAlerts,
  generateDashboardSummary,
  generateForecast,
  LOCATIONS,
  DEVICES,
  RANGES,
  calcAQI,
  getAQIStatus,
};
