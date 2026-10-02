/**
 * AQMS AQI Prediction Service
 *
 * JavaScript KNN classifier that mirrors the original Python sklearn workflow
 * from training_notebook.ipynb:
 *   - StandardScaler (z-score normalization) — NOT min-max
 *   - KNeighborsClassifier(n_neighbors=5)
 *   - Features: PM2, PM10, NO, NO2, CO, SO2, O3, AQI
 *   - Target: AQI_Bucket (Good | Satisfactory | Moderate | Poor | Very Poor | Severe)
 *   - Full dataset: Station.csv (108,035 rows, 49,285 after dropna)
 *
 * ACCURACY DISCLAIMER:
 *   The original sklearn model (research/model/knn_model.pkl), trained on the full
 *   49,285-row dataset, achieved ~89.0% accuracy on its held-out test split
 *   (as documented in research/notebook/training_notebook.ipynb).
 *
 *   This JavaScript implementation uses a representative 360-row BALANCED SAMPLE
 *   (60 rows per class) extracted from Station.csv. The StandardScaler mean/std
 *   values are computed from this sample — NOT from the full training set.
 *   Therefore, the 89% accuracy figure CANNOT be directly attributed to this
 *   JavaScript implementation. Actual JS accuracy on unseen data may differ.
 *
 *   Do not treat this as a production-validated medical or regulatory instrument.
 *
 * CIRCULAR FEATURE NOTE:
 *   AQI is included as an input feature because the original Station.csv dataset
 *   contains AQI as a computed column alongside the raw pollutant measurements,
 *   and the original training notebook used all 8 columns (PM2, PM10, NO, NO2,
 *   CO, SO2, O3, AQI) as input features X before dropping AQI_Bucket as the
 *   target y. This means the model classifies a pre-computed AQI value into a
 *   named bucket — it does NOT predict AQI from pollutants alone.
 *   The UI correctly describes this as "AQI Bucket Classification", not
 *   "AQI Prediction from raw pollutants".
 */

const stationData = require('../data/stationData');

// ─── Feature order (must match original X column order) ──────────────────────
const FEATURE_KEYS = ['PM2', 'PM10', 'NO', 'NO2', 'CO', 'SO2', 'O3', 'AQI'];

// ─── StandardScaler statistics ───────────────────────────────────────────────
// Computed from the balanced 360-row sample (60 rows per class) extracted from
// Station.csv. NOTE: These are NOT the same as fitting StandardScaler on the
// full 49,285-row training set. The original sklearn model's scaler was fitted
// on the full training split. Using sample-based stats is a necessary trade-off
// because loading all 49K rows into Node.js at startup is impractical.
// For production accuracy, retrain using the full Station.csv dataset with Python.
const SCALER_STATS = {
  PM2:  { mean: 101.279, std: 95.025  },
  PM10: { mean: 183.588, std: 159.626 },
  NO:   { mean: 15.423,  std: 20.465  },
  NO2:  { mean: 40.491,  std: 32.318  },
  CO:   { mean: 0.829,   std: 0.627   },
  SO2:  { mean: 15.414,  std: 8.692   },
  O3:   { mean: 37.721,  std: 27.710  },
  AQI:  { mean: 218.467, std: 161.063 },
};

/**
 * Apply z-score (StandardScaler) normalization to a feature vector.
 * z = (x - mean) / std
 */
function standardScale(vec) {
  return FEATURE_KEYS.map(k => {
    const { mean, std } = SCALER_STATS[k];
    return (vec[k] - mean) / std;
  });
}

// ─── Euclidean distance ───────────────────────────────────────────────────────
function euclidean(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += (a[i] - b[i]) * (a[i] - b[i]);
  }
  return Math.sqrt(sum);
}

// ─── Pre-scale the entire training set once at module load ───────────────────
// This matches sklearn's behavior: scaler.fit(X_train) then transform.
const scaledTrainingData = stationData
  .filter(d => d.bucket)
  .map(d => ({
    label:  d.bucket,
    scaled: standardScale(d),
  }));

// ─── KNN classifier (k=5) ────────────────────────────────────────────────────
function knnPredict(inputVec, k = 5) {
  // Calculate distance from input to every training point
  const distances = scaledTrainingData.map(d => ({
    label:    d.label,
    distance: euclidean(inputVec, d.scaled),
  }));

  // Sort ascending by distance and take k nearest
  distances.sort((a, b) => a.distance - b.distance);
  const kNearest = distances.slice(0, k);

  // Majority vote
  const votes = {};
  for (const neighbor of kNearest) {
    votes[neighbor.label] = (votes[neighbor.label] || 0) + 1;
  }

  // Winner = class with most votes (ties broken by first occurrence after sort)
  const sortedVotes = Object.entries(votes).sort((a, b) => b[1] - a[1]);
  const prediction  = sortedVotes[0][0];
  const confidence  = parseFloat(((votes[prediction] / k) * 100).toFixed(1));

  return { prediction, confidence, votes };
}

// ─── AQI bucket metadata ─────────────────────────────────────────────────────
const BUCKET_META = {
  'Good':        { color: '#22c55e', description: 'Air quality is satisfactory with little or no risk.',              level: 1, icon: '😊' },
  'Satisfactory':{ color: '#84cc16', description: 'Air quality is acceptable; sensitive groups may notice mild effects.', level: 2, icon: '🙂' },
  'Moderate':    { color: '#f59e0b', description: 'Sensitive individuals may experience health effects.',              level: 3, icon: '😐' },
  'Poor':        { color: '#f97316', description: 'Everyone may experience health effects with prolonged exposure.',   level: 4, icon: '😷' },
  'Very Poor':   { color: '#ef4444', description: 'Health warnings for everyone. Avoid prolonged outdoor activity.',  level: 5, icon: '⚠️' },
  'Severe':      { color: '#7f1d1d', description: 'Emergency conditions. Serious health effects for all populations.',level: 6, icon: '🚨' },
};

// ─── Input validation ─────────────────────────────────────────────────────────
function validateInputs(inputs) {
  const errors = [];
  const FIELD_LIMITS = {
    PM2:  { min: 0,    max: 1000, label: 'PM2.5'  },
    PM10: { min: 0,    max: 1200, label: 'PM10'   },
    NO:   { min: 0,    max: 1000, label: 'NO'     },
    NO2:  { min: 0,    max: 1000, label: 'NO₂'    },
    CO:   { min: 0,    max: 50,   label: 'CO'     },
    SO2:  { min: 0,    max: 1000, label: 'SO₂'    },
    O3:   { min: 0,    max: 1000, label: 'O₃'     },
    AQI:  { min: 0,    max: 1000, label: 'AQI'    },
  };

  for (const [key, limits] of Object.entries(FIELD_LIMITS)) {
    const raw = inputs[key];
    if (raw === undefined || raw === null || raw === '') {
      errors.push(`${limits.label} is required.`);
      continue;
    }
    const val = parseFloat(raw);
    if (isNaN(val)) {
      errors.push(`${limits.label} must be a number.`);
    } else if (val < limits.min || val > limits.max) {
      errors.push(`${limits.label} must be between ${limits.min} and ${limits.max}.`);
    }
  }

  return errors;
}

// ─── Public predict function ──────────────────────────────────────────────────
function predict(inputs) {
  const errors = validateInputs(inputs);
  if (errors.length > 0) {
    throw new Error(errors.join(' '));
  }

  const parsed = {};
  for (const key of FEATURE_KEYS) {
    parsed[key] = parseFloat(inputs[key]);
  }

  // Scale input using same StandardScaler parameters
  const scaledInput = standardScale(parsed);

  const result = knnPredict(scaledInput, 5);
  const meta   = BUCKET_META[result.prediction] || BUCKET_META['Moderate'];

  return {
    prediction:    result.prediction,
    confidence:    result.confidence,
    color:         meta.color,
    description:   meta.description,
    level:         meta.level,
    icon:          meta.icon,
    votes:         result.votes,
    inputs:        parsed,
    scalerUsed:    'StandardScaler (z-score normalization)',
    trainingRows:  scaledTrainingData.length,
    model:         'KNN (k=5) — JavaScript implementation matching sklearn KNeighborsClassifier',
    accuracy:      'Reference sklearn model: ~89% on held-out test split (full 49K-row dataset, original notebook). JS implementation uses 360-row sample — accuracy not independently verified.',
    note:          'This model classifies a pre-computed AQI value into a named bucket (Good/Satisfactory/Moderate/Poor/Very Poor/Severe). It does NOT predict AQI from raw pollutants alone — AQI is an input feature. For research and demonstration purposes only. Not a certified air-quality instrument.',
    timestamp:     new Date().toISOString(),
  };
}

module.exports = { predict, BUCKET_META, SCALER_STATS };
