require('dotenv').config();

const express    = require('express');
const http       = require('http');
const { Server } = require('socket.io');
const cors       = require('cors');
const helmet     = require('helmet');
const morgan     = require('morgan');
const compression= require('compression');
const rateLimit  = require('express-rate-limit');
const path       = require('path');

const config     = require('./config');
const routes     = require('./routes');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const { initRealtimeSocket }     = require('./sockets/realtimeSocket');
const logger     = require('./utils/logger');

// ─── App & HTTP server ────────────────────────────────────────────────────────
const app    = express();
const server = http.createServer(app);

// ─── Socket.IO ────────────────────────────────────────────────────────────────
const io = new Server(server, {
  cors: {
    origin:  config.corsOrigin,
    methods: ['GET', 'POST'],
  },
});

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(cors({ origin: config.corsOrigin, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(config.env === 'development' ? 'dev' : 'combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 500,
  standardHeaders: true,
  legacyHeaders:  false,
  message: { success: false, message: 'Too many requests. Please slow down.' },
});
app.use(limiter);

// ─── Static file serving (for production build) ───────────────────────────────
const frontendBuild = path.join(__dirname, '..', '..', 'frontend', 'dist');
app.use(express.static(frontendBuild));

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/v1', routes);

// Legacy alias
app.use('/api', routes);

// ─── SPA fallback (serve React app for non-API routes) ────────────────────────
app.get('*', (req, res) => {
  const indexPath = path.join(frontendBuild, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).json({
        service: 'AQMS Backend API',
        version: '1.0.0',
        status:  'running',
        docs:    'See /api/v1/health',
        note:    'Start the React frontend (npm run dev in /frontend) for the full UI.',
      });
    }
  });
});

// ─── Error handling ───────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Real-time socket ─────────────────────────────────────────────────────────
initRealtimeSocket(io);

// ─── Start server ─────────────────────────────────────────────────────────────
server.listen(config.port, () => {
  logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  logger.info(' AQMS Backend API — Started');
  logger.info(` Port:     ${config.port}`);
  logger.info(` Env:      ${config.env}`);
  logger.info(` Database: ${config.mongoUri ? 'MongoDB configured' : 'Demo mode (no DB)'}`);
  logger.info(` API:      http://localhost:${config.port}/api/v1`);
  logger.info(` Health:   http://localhost:${config.port}/api/v1/health`);
  logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});

module.exports = { app, server };
