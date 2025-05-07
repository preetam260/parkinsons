from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import numpy as np
import mne
import pickle
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv1D, MaxPooling1D, Dropout, LSTM, Dense
from werkzeug.utils import secure_filename

# Config
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'fif'}
MODEL_PATH = 'model_weights.pkl'

# Constants
SEGMENT_DURATION = 10
SAMPLING_RATE = 250
SAMPLES_PER_SEGMENT = SEGMENT_DURATION * SAMPLING_RATE
CHANNELS = 32

# App Init
app = Flask(__name__)
CORS(app, origins='*')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure uploads directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Define Model Architecture (same as training)
def build_model():
    model = Sequential([
        Conv1D(64, kernel_size=3, activation='relu', input_shape=(SAMPLES_PER_SEGMENT, CHANNELS)),
        MaxPooling1D(pool_size=2),
        Dropout(0.3),

        Conv1D(128, kernel_size=3, activation='relu'),
        MaxPooling1D(pool_size=2),
        Dropout(0.3),

        LSTM(64),
        Dropout(0.5),

        Dense(32, activation='relu'),
        Dense(2, activation='softmax')
    ])
    model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    return model

# Load model and apply weights
model = build_model()
with open(MODEL_PATH, 'rb') as f:
    weights = pickle.load(f)
model.set_weights(weights)

# Utility: check allowed file types
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Preprocessing
def preprocess_fif(file_path):
    raw = mne.io.read_raw_fif(file_path, preload=True, verbose=False)
    data = raw.get_data()[:CHANNELS]
    data = (data - np.mean(data, axis=1, keepdims=True)) / np.std(data, axis=1, keepdims=True)

    total_samples = data.shape[1]
    num_segments = total_samples // SAMPLES_PER_SEGMENT
    segments = []

    for i in range(num_segments):
        start = i * SAMPLES_PER_SEGMENT
        end = start + SAMPLES_PER_SEGMENT
        segment = data[:, start:end].T
        if segment.shape == (SAMPLES_PER_SEGMENT, CHANNELS):
            segments.append(segment)

    return np.array(segments)

@app.route('/', methods=['GET'])
def handle_get():
    return '<h1>invalid credentials!</h1>'
# Routes
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(save_path)
        return jsonify({'message': 'File uploaded', 'file_path': save_path}), 200

    return jsonify({'error': 'Invalid file type'}), 400

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    file_path = data.get('file_path')

    if not file_path or not os.path.exists(file_path):
        return jsonify({'error': 'File not found'}), 404

    try:
        X = preprocess_fif(file_path)
        preds = model.predict(X)
        avg_pred = np.mean(preds, axis=0)
        result = int(np.argmax(avg_pred))
        confidence = float(np.max(avg_pred))
        return jsonify({'prediction': result, 'confidence': confidence})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
