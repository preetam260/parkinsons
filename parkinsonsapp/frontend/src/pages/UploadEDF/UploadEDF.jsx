import { useState } from 'react';

function UploadEDF() {
  const [file, setFile] = useState(null);
  const [patientId, setPatientId] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!file || !patientId) {
      setError('Please select both a patient and EDF file');
      return;
    }
  
    setIsUploading(true);
    setError('');
    setUploadSuccess(false);
  
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      // 1️⃣ Upload the file
      const uploadRes = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
  
      const uploadData = await uploadRes.json();
      if (uploadData.error) {
        setError(uploadData.error);
        setIsUploading(false);
        return;
      }
  
      // 2️⃣ Send file path to prediction endpoint
      const predictRes = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file_path: uploadData.file_path }),
      });
  
      const predictData = await predictRes.json();
  
      if (predictData.error) {
        setError(predictData.error);
      } else {
        setUploadSuccess(true);
        alert(`🧠 Prediction: ${predictData.prediction === 1 ? 'Parkinson\'s Detected' : 'Healthy'}\nConfidence: ${(predictData.confidence * 100).toFixed(2)}%`);
      }
  
      setFile(null);
      setPatientId('');
    } catch (err) {
      setError('Failed to upload or predict. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };
  

  return (
    <div className="upload-container">
      <h1>Upload EDF File</h1>
      
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label>Patient ID</label>
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>EDF File</label>
          <input
            type="file"
            accept=".fif"
            onChange={handleFileChange}
            required
          />
          <p className="file-info">Supported format: FIF (.fif)</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button 
          type="submit" 
          className="upload-btn"
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload File'}
        </button>
        
        {uploadSuccess && (
          <div className="success-message">
            File uploaded successfully! Processing may take a few minutes.
          </div>
        )}
      </form>
      
      <div className="upload-instructions">
        <h3>Instructions:</h3>
        <ol>
          <li>Select the patient from the dropdown or enter patient ID</li>
          <li>Choose the EDF file from your device</li>
          <li>Click Upload File to start the analysis process</li>
          <li>View results in the Analysis section once processed</li>
        </ol>
      </div>
    </div>
  );
}

export default UploadEDF;