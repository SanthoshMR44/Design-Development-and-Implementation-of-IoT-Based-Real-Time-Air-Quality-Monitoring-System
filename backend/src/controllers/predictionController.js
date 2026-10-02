const predictionService = require('../services/predictionService');
const logger = require('../utils/logger');

exports.predict = (req, res) => {
  try {
    const { PM2, PM10, NO, NO2, CO, SO2, O3, AQI } = req.body;

    const result = predictionService.predict({ PM2, PM10, NO, NO2, CO, SO2, O3, AQI });

    logger.info(`Prediction: ${result.prediction} (confidence: ${result.confidence}%)`);
    res.json({ success: true, data: result });
  } catch (err) {
    logger.error('Prediction error: ' + err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};
