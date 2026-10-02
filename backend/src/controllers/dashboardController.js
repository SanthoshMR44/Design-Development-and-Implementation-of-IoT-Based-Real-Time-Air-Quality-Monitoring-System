const demoData = require('../services/demoDataService');
const logger   = require('../utils/logger');

exports.getDashboard = (req, res) => {
  try {
    const summary = demoData.generateDashboardSummary();
    res.json({ success: true, data: summary });
  } catch (err) {
    logger.error('Dashboard error: ' + err.message);
    res.status(500).json({ success: false, message: 'Failed to load dashboard data.' });
  }
};
