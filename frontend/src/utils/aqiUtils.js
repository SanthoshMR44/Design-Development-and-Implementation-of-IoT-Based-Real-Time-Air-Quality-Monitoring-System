/**
 * AQMS AQI Utility Functions
 *
 * IMPORTANT — Two separate AQI classification systems are used in this project:
 *
 * 1. DASHBOARD / MONITORING STATUS (this file — getAQIStatus)
 *    Used for colour-coding live sensor AQI values on the dashboard and map.
 *    These are generic numeric-range labels for DEMONSTRATION purposes only.
 *    They are NOT the official Indian CPCB AQI sub-index categories.
 *    Labels: Good | Satisfactory | Moderate | Poor | Very Poor | Severe
 *    (aligned with Indian CPCB AQI bucket naming for academic consistency)
 *
 * 2. KNN PREDICTION MODEL (predictionService.js — BUCKET_META)
 *    Used to label the output of the KNN classifier trained on Station.csv.
 *    These class names come directly from the AQI_Bucket column in the dataset.
 *    Labels: Good | Satisfactory | Moderate | Poor | Very Poor | Severe
 *
 * Both systems use the same six category names for consistency.
 * Neither system constitutes official regulatory AQI certification.
 */

export function getAQIStatus(aqi) {
  if (!aqi && aqi !== 0) return {
    label: 'Unknown', color: '#64748b',
    bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500/30',
  };
  // Thresholds below are approximate numeric ranges for demonstration.
  // They align with common AQI bucket breakpoints used in the training dataset.
  if (aqi <= 50)  return { label: 'Good',        color: '#22c55e', bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' };
  if (aqi <= 100) return { label: 'Satisfactory', color: '#84cc16', bg: 'bg-lime-500/20',    text: 'text-lime-400',    border: 'border-lime-500/30' };
  if (aqi <= 200) return { label: 'Moderate',    color: '#f59e0b', bg: 'bg-amber-500/20',   text: 'text-amber-400',   border: 'border-amber-500/30' };
  if (aqi <= 300) return { label: 'Poor',        color: '#f97316', bg: 'bg-orange-500/20',  text: 'text-orange-400',  border: 'border-orange-500/30' };
  if (aqi <= 400) return { label: 'Very Poor',   color: '#ef4444', bg: 'bg-red-500/20',     text: 'text-red-400',     border: 'border-red-500/30' };
  return                  { label: 'Severe',     color: '#7f1d1d', bg: 'bg-red-900/40',     text: 'text-red-300',     border: 'border-red-700/50' };
}

export function formatTimestamp(ts) {
  if (!ts) return '—';
  return new Date(ts).toLocaleString('en-IN', {
    day:    '2-digit',
    month:  'short',
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export function formatTimeShort(ts) {
  if (!ts) return '';
  return new Date(ts).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

export function getPollutantLabel(key) {
  const map = {
    pm25: 'PM2.5', pm10: 'PM10', co: 'CO', no2: 'NO₂', so2: 'SO₂', o3: 'O₃',
    temperature: 'Temperature', humidity: 'Humidity', pressure: 'Pressure',
    eco2: 'eCO₂', tvoc: 'TVOC',
    windSpeed: 'Wind Speed', windDirection: 'Wind Direction',
    rainfall: 'Rainfall', solarRadiation: 'Solar Radiation',
    aqi: 'AQI',
  };
  return map[key] || key;
}

export function getPollutantUnit(key) {
  const map = {
    pm25: 'µg/m³', pm10: 'µg/m³', co: 'ppm', no2: 'µg/m³', so2: 'µg/m³', o3: 'µg/m³',
    temperature: '°C', humidity: '%', pressure: 'hPa',
    eco2: 'ppm', tvoc: 'ppb',
    windSpeed: 'm/s', windDirection: '°', rainfall: 'mm/h', solarRadiation: 'W/m²',
    aqi: '',
  };
  return map[key] || '';
}

export function getWindDirectionLabel(degrees) {
  const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  return dirs[Math.round(degrees / 22.5) % 16];
}

export function getSeverityColor(severity) {
  const colors = { info: '#06b6d4', warning: '#f59e0b', error: '#ef4444', critical: '#a855f7' };
  return colors[severity] || '#64748b';
}
