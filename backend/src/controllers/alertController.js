const demoData = require('../services/demoDataService');
const logger   = require('../utils/logger');

exports.getAlerts = (req, res) => {
  try {
    const count = parseInt(req.query.count, 10) || 10;
    const alerts = demoData.generateAlerts(Math.min(count, 20));
    res.json({ success: true, data: alerts, dataSource: 'DEMO_SIMULATED' });
  } catch (err) {
    logger.error('Alerts error: ' + err.message);
    res.status(500).json({ success: false, message: 'Failed to load alerts.' });
  }
};
