const demoData = require('../services/demoDataService');
const logger   = require('../utils/logger');

exports.getLocations = (req, res) => {
  try {
    const locations = demoData.LOCATIONS.map(loc => ({
      ...loc,
      reading:    loc.environment === 'indoor'
        ? demoData.generateIndoorReading('AQMS-002', loc.id)
        : demoData.generateOutdoorReading('AQMS-001', loc.id),
      dataSource: 'DEMO_SIMULATED',
    }));
    res.json({ success: true, data: locations });
  } catch (err) {
    logger.error('Locations error: ' + err.message);
    res.status(500).json({ success: false, message: 'Failed to load locations.' });
  }
};

exports.getLocationById = (req, res) => {
  try {
    const { id } = req.params;
    const location = demoData.LOCATIONS.find(l => l.id === id);
    if (!location) {
      return res.status(404).json({ success: false, message: `Location ${id} not found.` });
    }
    const reading = location.environment === 'indoor'
      ? demoData.generateIndoorReading('AQMS-002', id)
      : demoData.generateOutdoorReading('AQMS-001', id);

    const history = demoData.generateHistoricalData(location.environment, 24);
    res.json({ success: true, data: { location, reading, history, dataSource: 'DEMO_SIMULATED' } });
  } catch (err) {
    logger.error('Location detail error: ' + err.message);
    res.status(500).json({ success: false, message: 'Failed to load location.' });
  }
};
