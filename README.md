# Parkinson's Disease Detection App

A full-stack web application to detect Parkinson's Disease from biomedical signals (e.g., EEG/MEG) using a deep learning model.

## 🧠 Overview

This app allows users to upload `.edf` or `.fif` brain signal files. A trained deep learning model processes the data and predicts whether the input indicates signs of Parkinson's Disease.

## 📁 Project Structure

```
parkinsonsapp/
├── frontend/      # React + Vite frontend for file upload and results display
├── backend/       # Flask API to handle file uploads and return model predictions
└── README.md      # Project overview and instructions
```

## 🚀 Frontend (React + Vite)

### Features
- Upload `.edf` or `.fif` files
- Collect patient ID and send to backend
- Display prediction results

### Run Frontend Locally

```bash
cd frontend
npm install
npm run dev
```

App runs on [http://localhost:5173](http://localhost:5173)

## 🔬 Backend (Flask + Python)

### Features
- Accepts file and patient ID via POST
- Preprocesses input signals
- Loads `.h5` deep learning model for prediction
- Returns result as JSON

### Run Backend Locally

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python app.py
```

API runs on [http://localhost:5000](http://localhost:5000)

## 📦 Requirements

- Node.js and npm
- Python 3.8+
- Flask
- mne
- h5py
- numpy
- Other dependencies listed in `requirements.txt`

## 🧪 Sample API Usage

```bash
curl -X POST http://localhost:5000/upload \
  -F "file=@/path/to/file.fif" \
  -F "patient_id=123"
```

## 📄 Example Prediction Response

```json
{
  "patient_id": "123",
  "prediction": "Parkinson's Detected"
}
```

## 🧾 License

This project is for educational and research use only.

## 🙋‍♂️ Maintainer

**Sasisekhara Preetam Kommavarapu**

---

🚧 **Note:** Work is still in progress on the Flask backend. Some features may be incomplete or under development.
