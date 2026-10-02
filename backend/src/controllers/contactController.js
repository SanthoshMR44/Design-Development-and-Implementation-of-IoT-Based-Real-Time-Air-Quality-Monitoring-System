const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');

// In-memory store (replace with DB model in production)
const requests = [];

exports.submitContact = (req, res) => {
  try {
    const { name, organization, email, phone, location, deploymentType, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required.',
      });
    }

    const entry = {
      id:             uuidv4(),
      type:           'contact',
      name,
      organization:   organization || '',
      email,
      phone:          phone || '',
      location:       location || '',
      deploymentType: deploymentType || 'Other',
      message,
      submittedAt:    new Date().toISOString(),
      status:         'received',
    };

    requests.push(entry);
    logger.info(`Contact request from ${name} <${email}>`);

    res.json({
      success: true,
      message: 'Your request has been received. The AQMS team will get in touch with you shortly.',
      id:      entry.id,
      note:    'Email delivery is not configured in demo mode. Request stored for review.',
    });
  } catch (err) {
    logger.error('Contact submission error: ' + err.message);
    res.status(500).json({ success: false, message: 'Failed to submit contact request.' });
  }
};

exports.submitDemoRequest = (req, res) => {
  try {
    const { name, organization, email, phone, location, deploymentType, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required.',
      });
    }

    const entry = {
      id:             uuidv4(),
      type:           'demo-request',
      name,
      organization:   organization || '',
      email,
      phone:          phone || '',
      location:       location || '',
      deploymentType: deploymentType || 'Other',
      message:        message || '',
      submittedAt:    new Date().toISOString(),
      status:         'pending',
    };

    requests.push(entry);
    logger.info(`Demo request from ${name} <${email}> — ${organization}`);

    res.json({
      success: true,
      message: 'Demo request submitted successfully. Our team will reach out to schedule your AQMS demonstration.',
      id:      entry.id,
      note:    'Request stored. Email delivery requires SMTP configuration.',
    });
  } catch (err) {
    logger.error('Demo request error: ' + err.message);
    res.status(500).json({ success: false, message: 'Failed to submit demo request.' });
  }
};
