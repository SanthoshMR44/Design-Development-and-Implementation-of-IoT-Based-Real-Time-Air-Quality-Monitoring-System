const demoData = require('../services/demoDataService');
const logger   = require('../utils/logger');

exports.getMonitoring = (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        outdoor: demoData.generateOutdoorReading(),
        indoor:  demoData.generateIndoorReading(),
        dataSource: 'DEMO_SIMULATED',
        timestamp:  new Date().toISOString(),
      },
    });
  } catch (err) {
    logger.error('Monitoring error: ' + err.message);
    res.status(500).json({ success: false, message: 'Failed to load monitoring data.' });
  }
};

exports.getIndoor = (req, res) => {
  try {
    res.json({ success: true, data: demoData.generateIndoorReading() });
  } catch (err) {
    logger.error('Indoor monitoring error: ' + err.message);
    res.status(500).json({ success: false, message: 'Failed to load indoor data.' });
  }
};

exports.getOutdoor = (req, res) => {
  try {
    res.json({ success: true, data: demoData.generateOutdoorReading() });
  } catch (err) {
    logger.error('Outdoor monitoring error: ' + err.message);
    res.status(500).json({ success: false, message: 'Failed to load outdoor data.' });
  }
};
