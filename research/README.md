# AQMS — Research & Legacy Files

This directory contains the original research and prototype materials for the AQMS project.
The primary application is the Node.js + React platform in `/backend` and `/frontend`.

---

## Contents

### `legacy_flask/`

- **`app.py`** — Original Flask web application (Python). Superseded by the Node.js backend.
  - Do NOT run this alongside the Node.js backend.
  - Preserved for reference and academic review only.
- **`background.jpg`** — Original legacy static image from the Flask prototype.

### `model/`

- **`knn_model.pkl`** — Trained sklearn KNeighborsClassifier (k=5) serialized with pickle.
  - Requires Python 3.11 and scikit-learn to load.
  - The JavaScript equivalent is in `backend/src/services/predictionService.js`.
  - Preserved for model validation and comparison against the JS implementation.

### `data/`

- **`Station.csv`** — Full training dataset (108,035 rows, approximately 4.7 MB).
  - Columns: PM2, PM10, NO, NO2, CO, SO2, O3, AQI, AQI_Bucket
  - 49,285 rows retained after `dropna()` as per the training notebook
  - A balanced 360-row sample (60 rows per class) is used in `backend/src/data/stationData.js`

### `notebook/`

- **`training_notebook.ipynb`** — Original Jupyter notebook documenting:
  - Data loading and preprocessing (`StandardScaler`, `dropna`)
  - KNN model training (`k=5`, sklearn `KNeighborsClassifier`)
  - Accuracy on held-out test split: **89.0%** (full 49K-row dataset)
  - Model serialization with `pickle`

---

## Notes on the JavaScript KNN Implementation

The JS implementation in `backend/src/services/predictionService.js` mirrors the
notebook's methodology as closely as possible:

- Uses **StandardScaler (z-score)** normalization — not min-max
- Feature order: PM2, PM10, NO, NO2, CO, SO2, O3, AQI
- k = 5 nearest neighbours with Euclidean distance

**Important limitations vs. the original sklearn model:**

1. The JS scaler mean/std values are computed from a 360-row balanced sample,
   not from the full 49,285-row training set. This means the normalization
   parameters differ slightly from the original model.
2. The 360-row training set is significantly smaller than the original 49,285 rows.
3. Therefore, the **89% accuracy figure applies only to the original sklearn model**
   on the full dataset — it cannot be directly claimed for the JS implementation.

**What the model does:**

The model classifies a **pre-computed AQI value** into a named bucket
(Good / Satisfactory / Moderate / Poor / Very Poor / Severe). It does NOT
compute AQI from raw pollutants alone — AQI is an input feature in the
original training data.

To validate the JS implementation against the Python model, load `knn_model.pkl`
with Python and compare predictions for the same input vectors.
