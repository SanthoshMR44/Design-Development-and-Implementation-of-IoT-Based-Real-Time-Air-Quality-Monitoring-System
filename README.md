# AQMS — IoT-Based Real-Time Air Quality Monitoring System

> **Real-Time Intelligence for Cleaner, Safer Indoor & Outdoor Environments**

**Design, Development and Implementation of IoT-Based Real-Time Air Quality Monitoring System**  
Academic project — JIT Davangere × RDL Technologies LTD — 7th Semester

---

## Project Overview

AQMS is a full-stack IoT environmental monitoring platform that provides real-time indoor and outdoor air quality monitoring, centralized device management, analytics, forecasting visualization, and AQI prediction. The platform is built with **Node.js + Express.js** as the backend and **React + Vite + Tailwind CSS** as the frontend.

All monitoring readings displayed in the application are **DEMO / SIMULATED DATA** generated server-side. No real ESP32 or AQMi/AQMo hardware is currently connected to this web application.

---

## Objectives

- Provide timely real-time air quality information (indoor + outdoor)
- Support prompt harmful-gas detection (target: < 5 seconds)
- Enable multi-location environmental mapping
- Support centralized device and sensor management
- Provide analytics and KNN-based AQI prediction
- Serve as a demonstration and research platform for IoT-based environmental monitoring

---

## Key Features

| Feature | Status |
|---|---|
| Indoor & Outdoor AQI Monitoring | ✅ Demo data |
| Centralized Device Management | ✅ Demo 4 devices |
| Analytics & Trend Charts | ✅ Simulated history |
| Environmental Mapping (6 locations) | ✅ Demo locations |
| Real-Time Alerts | ✅ Demo alerts |
| Device Diagnostics | ✅ Demo diagnostics |
| KNN AQI Prediction (JS port) | ✅ Functional |
| Socket.IO Real-Time Updates | ✅ Demo stream |
| Contact / Demo Request | ✅ In-memory store |
| ESP32 / AQMi / MQTT Integration | 🔲 Architecture ready, not connected |
| MongoDB Persistent Storage | 🔲 Optional, not required |

---

## Technology Stack

### AQMS Project Technology (Hardware/System)
IoT Sensors (PM2.5, PM10, Gas, Env), ESP32, AQMi Edge Logger, AQMo Edge Logger,  
Wi-Fi / 4G / 5G Connectivity, PCB Hardware, AQMS Cloud, AWS (BOM context),  
AQMS Application, Mobile Alerts, On-Premise Display, Edge Gateway, BMS integration

### Website Implementation Stack
| Layer | Technology |
|---|---|
| Backend | Node.js 18+, Express.js 4 |
| Real-Time | Socket.IO 4 |
| Frontend | React 18, Vite 5, Tailwind CSS 3 |
| Charts | Recharts 2 |
| HTTP Client | Axios |
| Icons | Lucide React |
| Database | MongoDB / Mongoose (optional — not active in demo mode) |
| Logging | Winston |
| Security | Helmet, CORS, rate-limiting |
| Prediction | JavaScript KNN (port of sklearn model) |

---

## Architecture

```
Browser (React SPA)
    │  REST API + Socket.IO
    ▼
Node.js + Express.js  (port 5000)
    │
    ├── /api/v1/*  — REST endpoints
    ├── Socket.IO  — real-time demo data stream
    ├── predictionService.js  — KNN AQI prediction
    ├── demoDataService.js    — simulated sensor data
    └── /frontend/dist        — serves production build
```

**Future IoT integration path:**
```
ESP32 / AQMi / AQMo
    │  MQTT or REST
    ▼
Node.js IoT Service
    │
    ├── Validation
    ├── MongoDB Storage
    └── Socket.IO broadcast → Dashboard
```

---

## Project Structure

```
AQMS-main/
├── backend/
│   ├── src/
│   │   ├── config/index.js              — env configuration
│   │   ├── controllers/                 — route handlers
│   │   │   ├── healthController.js
│   │   │   ├── dashboardController.js
│   │   │   ├── monitoringController.js
│   │   │   ├── deviceController.js
│   │   │   ├── alertController.js
│   │   │   ├── analyticsController.js
│   │   │   ├── locationController.js
│   │   │   ├── predictionController.js
│   │   │   └── contactController.js
│   │   ├── routes/index.js              — API route table
│   │   ├── services/
│   │   │   ├── demoDataService.js       — simulated sensor data generator
│   │   │   └── predictionService.js     — KNN AQI classifier (StandardScaler)
│   │   ├── data/stationData.js          — 360-row balanced training sample
│   │   ├── middleware/errorHandler.js
│   │   ├── sockets/realtimeSocket.js    — Socket.IO broadcaster
│   │   ├── utils/logger.js
│   │   └── server.js                   — entry point
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx                      — root with lazy-loaded sections
│   │   ├── main.jsx
│   │   ├── index.css                    — Tailwind + custom styles
│   │   ├── components/
│   │   │   ├── layout/Navbar.jsx
│   │   │   ├── layout/Footer.jsx
│   │   │   └── ui/                      — DemoTag, AQIGauge, LoadingSpinner, etc.
│   │   ├── sections/                    — 17 page sections (lazy-loaded)
│   │   ├── services/
│   │   │   ├── api.js                   — centralized Axios API layer
│   │   │   └── socket.js                — Socket.IO singleton client
│   │   └── utils/aqiUtils.js
│   ├── public/
│   │   ├── hardware-prototype.jpg       — real AQMS hardware photo
│   │   └── hardware-placeholder.svg     — SVG fallback diagram
│   ├── .env
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── research/
│   ├── README.md
│   ├── legacy_flask/app.py              — original Flask prototype (reference)
│   ├── model/knn_model.pkl              — trained sklearn model (reference)
│   ├── data/Station.csv                 — full training dataset (108,035 rows)
│   └── notebook/training_notebook.ipynb — original training notebook
│
├── .gitignore
├── package.json                         — root workspace scripts
└── README.md
```

---

## Prerequisites

- **Node.js** ≥ 18.0.0
- **npm** ≥ 8.0.0
- **MongoDB** (optional — demo mode works without it)

---

## Installation

### 1. Install backend dependencies

```bash
cd backend
npm install
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

---

## Environment Variables

### Backend — `backend/.env`

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=              # Leave empty for demo mode (no DB required)
JWT_SECRET=your-secret-here
CORS_ORIGIN=http://localhost:5173
```

Copy from `.env.example`:
```bash
cp backend/.env.example backend/.env
```

### Frontend — `frontend/.env`

```env
VITE_API_BASE_URL=/api/v1
VITE_SOCKET_URL=http://localhost:5000
```

The frontend `.env` is already configured for local development.

---

## Development

Run backend and frontend in separate terminals:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# Starts with nodemon on http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
# Starts Vite dev server on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

---

## Production Build

### 1. Build the frontend

```bash
cd frontend
npm run build
# Output: frontend/dist/
```

### 2. Start the backend (serves frontend build)

```bash
cd backend
NODE_ENV=production node src/server.js
```

Visit **http://localhost:5000** — the backend serves the React SPA from `frontend/dist/`.

---

## API Reference

Base URL: `http://localhost:5000/api/v1`

### GET Endpoints

| Endpoint | Description | Data Source |
|---|---|---|
| `GET /health` | Service health check | Server |
| `GET /dashboard` | Full dashboard summary | Demo |
| `GET /monitoring` | Indoor + outdoor readings | Demo |
| `GET /monitoring/indoor` | Indoor sensor reading | Demo |
| `GET /monitoring/outdoor` | Outdoor sensor reading | Demo |
| `GET /sensors` | All sensor health statuses | Demo |
| `GET /devices` | All device statuses | Demo |
| `GET /devices/:id` | Single device detail + latest reading | Demo |
| `GET /alerts?count=N` | Alert list (max 20) | Demo |
| `GET /locations` | All monitoring locations with readings | Demo |
| `GET /locations/:id` | Location detail + 24h history | Demo |
| `GET /analytics?period=24h&env=outdoor` | Historical data (period: 24h/7d/30d) | Demo |
| `GET /analytics/history?env=outdoor&hours=24` | History by hours (1–8760) | Demo |
| `GET /analytics/forecast` | 24-hour forecast visualization | Demo (not scientific) |

### POST Endpoints

| Endpoint | Description |
|---|---|
| `POST /prediction` | KNN AQI bucket prediction |
| `POST /contact` | Submit contact request |
| `POST /demo-request` | Submit demo/deployment request |

### Analytics Point Counts

| Period | Hours | Points Returned |
|---|---|---|
| 24 Hours | 24 | 48 (every 30 min) |
| 7 Days | 168 | 84 (every 2 hours) |
| 30 Days | 720 | 120 (every 6 hours) |

---

## Prediction API

### Request

```json
POST /api/v1/prediction
Content-Type: application/json

{
  "PM2":  88,
  "PM10": 140,
  "NO":   5,
  "NO2":  30,
  "CO":   0.12,
  "SO2":  18,
  "O3":   110,
  "AQI":  200
}
```

**Note:** `AQI` is a direct input feature matching the original `Station.csv` training data. This is intentional — the original notebook includes AQI as a feature column in X.

### Response

```json
{
  "success": true,
  "data": {
    "prediction":   "Moderate",
    "confidence":   60,
    "color":        "#f59e0b",
    "description":  "Sensitive individuals may experience health effects.",
    "level":        3,
    "icon":         "😐",
    "votes":        { "Moderate": 3, "Poor": 2 },
    "scalerUsed":   "StandardScaler (z-score normalization)",
    "trainingRows": 360,
    "accuracy":     "~89% on held-out test split (as reported by original notebook)",
    "note":         "For research and demonstration purposes."
  }
}
```

### Prediction Model Details

| Property | Value |
|---|---|
| Algorithm | K-Nearest Neighbours, k=5 |
| Normalization | **StandardScaler (z-score)** — matching original sklearn behavior |
| Training data | 360-row balanced sample (60 rows per class) from Station.csv |
| Full dataset | 108,035 rows, 49,285 after dropna |
| Classes | Good / Satisfactory / Moderate / Poor / Very Poor / Severe |
| Reported accuracy | ~89% on test split — **original sklearn model only** (full 49K-row dataset, training notebook). The JS implementation uses a 360-row sample and its accuracy has not been independently verified. |
| Implementation | JavaScript port in `backend/src/services/predictionService.js` |
| Reference model | `research/model/knn_model.pkl` (sklearn KNeighborsClassifier) |

**Important:** The JS implementation uses a 360-row balanced sample rather than the full 49,285-row training set, and the StandardScaler statistics are computed from that sample rather than the full training data. Therefore, the 89% accuracy figure applies only to the original sklearn model — it cannot be directly attributed to the JavaScript implementation. The JS implementation is suitable for research and demonstration. Use `research/notebook/training_notebook.ipynb` with the full `research/data/Station.csv` for full reproducibility.

**What the model actually does:** The model classifies a pre-computed AQI value into a named bucket. AQI is an input feature (not the output), so the model does NOT predict AQI from raw pollutants alone. It maps the combination of pollutant levels plus the known AQI to one of six named categories.

---

### AQI Classification

Two consistent classification systems are used:

| # | Where Used | Labels | Source |
|---|---|---|---|
| 1 | Dashboard / monitoring display | Good, Satisfactory, Moderate, Poor, Very Poor, Severe | Aligned with Station.csv AQI_Bucket naming |
| 2 | KNN prediction model output | Good, Satisfactory, Moderate, Poor, Very Poor, Severe | Direct from Station.csv AQI_Bucket column |

Both use the same six category names for consistency. Neither constitutes official CPCB regulatory certification. All dashboard values are demo/simulated.

The backend broadcasts demo sensor data via Socket.IO:

| Event | Interval | Payload |
|---|---|---|
| `outdoor:reading` | Every 5 seconds | Outdoor sensor object |
| `indoor:reading` | Every 8 seconds | Indoor sensor object |
| `alerts:update` | Every 30 seconds | Array of alert objects |
| `devices:status` | On connect only | Array of device status objects |
| `dashboard:summary` | On connect only | Full dashboard summary |

The DashboardSection subscribes to `outdoor:reading` and `indoor:reading` for live metric updates between REST polling cycles.

---

## Demo / Simulated Data

All sensor readings, device statuses, alerts, and location data are generated by `backend/src/services/demoDataService.js`. Every API response includes `"dataSource": "DEMO_SIMULATED"` and the UI displays a **DEMO / SIMULATED DATA** badge on all monitoring panels.

To replace demo data with real sensor readings, implement `backend/src/services/mqttService.js` to subscribe to:
```
aqms/device/{deviceId}/data
```
and replace calls to `demoDataService` in controllers with database queries.

---

## Deployment

### Single-server (Node.js serves built frontend)

```bash
# 1. Build frontend
cd frontend && npm run build

# 2. Configure production environment
cp backend/.env.example backend/.env
# Set NODE_ENV=production, PORT, CORS_ORIGIN

# 3. Start backend
cd backend && node src/server.js
```

### Separate deployment (e.g. Vercel + Render)

- **Backend**: Deploy `backend/` to Render, Railway, AWS EC2, or any Node.js host
- **Frontend**: Build `frontend/dist/` and deploy to Vercel or Netlify
- Set `VITE_API_BASE_URL=https://your-backend.com/api/v1` before building
- Set `CORS_ORIGIN=https://your-frontend.com` in backend environment

### Environment Platforms

Compatible with: Render, Railway, Heroku, AWS EC2/ECS, Azure App Service, DigitalOcean App Platform, VPS

---

## MongoDB Setup (Optional)

The application runs fully in demo mode without MongoDB. To enable persistent storage:

1. Install MongoDB: https://www.mongodb.com/docs/manual/installation/
2. Set `MONGODB_URI=mongodb://localhost:27017/aqms` in `backend/.env`
3. Restart the backend — the health endpoint will report `database: connected`

Mongoose models are defined in `backend/src/models/` (scaffold only — not used in demo mode).

---

## Future Hardware Integration

When physical AQMi/AQMo devices with ESP32 are available:

1. Configure the MQTT broker URL in `backend/.env`
2. Create `backend/src/services/mqttService.js`:
   - Subscribe to `aqms/device/{deviceId}/data`
   - Validate incoming readings
   - Store to MongoDB via Mongoose models
   - Emit to Socket.IO clients
3. Update controllers to query MongoDB instead of `demoDataService`
4. The frontend requires no changes — it already consumes the correct API shape

---

## Troubleshooting

| Problem | Solution |
|---|---|
| Backend won't start | Check `backend/.env` exists; run `npm install` in `backend/` |
| Frontend shows blank | Ensure backend is running on port 5000; check browser console |
| API returns 404 | Confirm base URL is `/api/v1`; check route in `backend/src/routes/index.js` |
| Charts show no data | Backend must be running; click Refresh; check network tab |
| Socket.IO not connecting | Backend must be running; CORS_ORIGIN must match frontend URL |
| Prediction returns error | Verify all 8 numeric fields are provided and within valid ranges |
| Hardware image missing | Place `hardware-prototype.jpg` in `frontend/public/`; SVG fallback shown otherwise |

---

## Known Limitations

| Limitation | Detail |
|---|---|
| Simulated sensor data | No real ESP32/AQMi/AQMo hardware connected |
| No persistent storage | Requests stored in memory only; restart clears them |
| Demo forecast | Random walk simulation — not a validated ML forecast model |
| KNN training sample | 360-row balanced sample used (not full 49K rows) |
| No email delivery | Contact/demo requests stored but not emailed (needs SMTP config) |
| No authentication | API endpoints are public — add auth before production deployment |
| No MQTT | Architecture ready; not implemented |

---

## Team

| Name | Role | Department |
|---|---|---|
| Deepa Chandrashekhar Rathod | Python Developer | CSE, 7th Sem, AIML |
| Santhosh MR | Cloud Computing | CSE, 7th Sem, AIML |
| Arpitha GA | Web Development | CSE, 7th Sem, AIML |
| Brunda U Jajur | Web Development | CSE, 7th Sem |
| Keerthi M Rao | Cloud Computing | ISE, 7th Sem, AIML |

**Mentors / Advisors**

| Name | Role | Affiliation |
|---|---|---|
| Dr. Latha B M | Professor & HOD | Department of CS&E, JIT Davangere |
| Dr. H.S. Saraswathi | Professor & HOD | Department of IS&E, JIT Davangere |
| Vinutha L B | Assistant Professor | Department of EC&E, JIT Davangere |
| Raghavendra G Shetty | Co-Founder & CEO | RDL Technologies LTD |

---

## Research & Legacy Files

See `research/README.md` for documentation of:
- Original Flask prototype (`research/legacy_flask/app.py`)
- Trained sklearn model (`research/model/knn_model.pkl`)
- Full training dataset (`research/data/Station.csv`)
- Training notebook (`research/notebook/training_notebook.ipynb`)

---

## License

Academic research project — JIT Davangere. Not licensed for commercial distribution without permission.

---

*© 2026 AQMS — JIT Davangere, 7th Semester. All monitoring data is DEMO / SIMULATED unless stated otherwise.*
#
