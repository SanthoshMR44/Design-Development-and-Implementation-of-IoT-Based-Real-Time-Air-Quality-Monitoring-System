const demoData = require('../services/demoDataService');
const logger   = require('../utils/logger');

// Map period shorthand to hours
const HOURS_MAP = { '24h': 24, '7d': 168, '30d': 720 };

exports.getAnalytics = (req, res) => {
  try {
    const { period = '24h', env = 'outdoor' } = req.query;
    const hours   = HOURS_MAP[period] || 24;
    const history = demoData.generateHistoricalData(env, hours);

    res.json({
      success:     true,
      data:        history,
      period,
      hours,
      environment: env,
      pointCount:  history.length,
      dataSource:  'DEMO_SIMULATED',
    });
  } catch (err) {
    logger.error('Analytics error: ' + err.message);
    res.status(500).json({ success: false, message: 'Failed to load analytics data.' });
  }
};

exports.getHistory = (req, res) => {
  try {
    const { env = 'outdoor', hours = '24' } = req.query;
    const hoursInt = parseInt(hours, 10);
    if (isNaN(hoursInt) || hoursInt < 1 || hoursInt > 8760) {
      return res.status(400).json({ success: false, message: 'hours must be a number between 1 and 8760.' });
    }
    const history = demoData.generateHistoricalData(env, hoursInt);
    res.json({
      success:    true,
      data:       history,
      hours:      hoursInt,
      environment: env,
      pointCount: history.length,
      dataSource: 'DEMO_SIMULATED',
    });
  } catch (err) {
    logger.error('History error: ' + err.message);
    res.status(500).json({ success: false, message: 'Failed to load history data.' });
  }
};

exports.getForecast = (req, res) => {
  try {
    const forecast = demoData.generateForecast(24);
    res.json({
      success:    true,
      data:       forecast,
      pointCount: forecast.length,
      dataSource: 'DEMO_FORECAST',
      note:       'Demonstration forecast visualization only. Not a validated scientific model. Do not use for health or safety decisions.',
    });
  } catch (err) {
    logger.error('Forecast error: ' + err.message);
    res.status(500).json({ success: false, message: 'Failed to load forecast data.' });
  }
};
