const config = require('../config');

exports.getHealth = (req, res) => {
  res.json({
    status:    'healthy',
    service:   'AQMS Backend API',
    version:   '1.0.0',
    env:       config.env,
    database:  config.mongoUri ? 'configured' : 'demo-mode',
    uptime:    process.uptime(),
    timestamp: new Date().toISOString(),
    note:      'AQMS – IoT-Based Real-Time Air Quality Monitoring System',
  });
};
