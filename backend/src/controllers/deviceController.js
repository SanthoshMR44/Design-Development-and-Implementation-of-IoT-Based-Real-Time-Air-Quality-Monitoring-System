const demoData = require('../services/demoDataService');
const logger   = require('../utils/logger');

exports.getDevices = (req, res) => {
  try {
    const devices = demoData.generateDeviceStatus();
    res.json({ success: true, data: devices, dataSource: 'DEMO_SIMULATED' });
  } catch (err) {
    logger.error('Device list error: ' + err.message);
    res.status(500).json({ success: false, message: 'Failed to load device data.' });
  }
};

exports.getDeviceById = (req, res) => {
  try {
    const { id } = req.params;
    const devices = demoData.generateDeviceStatus();
    const device  = devices.find(d => d.id === id);

    if (!device) {
      return res.status(404).json({ success: false, message: `Device ${id} not found.` });
    }

    const reading = device.environment === 'indoor'
      ? demoData.generateIndoorReading(device.id, device.locationId)
      : demoData.generateOutdoorReading(device.id, device.locationId);

    res.json({
      success: true,
      data: { device, latestReading: reading, dataSource: 'DEMO_SIMULATED' },
    });
  } catch (err) {
    logger.error('Device detail error: ' + err.message);
    res.status(500).json({ success: false, message: 'Failed to load device.' });
  }
};

exports.getSensors = (req, res) => {
  try {
    const devices = demoData.generateDeviceStatus();
    const sensors = devices.flatMap(d =>
      Object.entries(d.sensorHealth).map(([sensor, status]) => ({
        deviceId:   d.id,
        deviceName: d.name,
        sensor,
        status,
        lastChecked: new Date().toISOString(),
        dataSource:  'DEMO_SIMULATED',
      }))
    );
    res.json({ success: true, data: sensors });
  } catch (err) {
    logger.error('Sensors error: ' + err.message);
    res.status(500).json({ success: false, message: 'Failed to load sensor data.' });
  }
};
