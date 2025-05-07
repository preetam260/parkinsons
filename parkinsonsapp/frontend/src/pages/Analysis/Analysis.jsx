import { useState } from 'react';
import './Analysis.css';

function Analysis() {
  const [analyses] = useState([
    { 
      id: 1, 
      patientName: 'John Doe', 
      date: '2023-05-10', 
      status: 'Completed', 
      result: 'Positive', 
      confidence: 87 
    },
    { 
      id: 2, 
      patientName: 'Jane Smith', 
      date: '2023-05-12', 
      status: 'Completed', 
      result: 'Negative', 
      confidence: 92 
    },
    { 
      id: 3, 
      patientName: 'Robert Johnson', 
      date: '2023-05-15', 
      status: 'Processing', 
      result: 'Pending', 
      confidence: 0 
    },
  ]);

  return (
    <div className="analysis-container">
      <h1>Analysis Results</h1>
      
      <div className="analysis-filters">
        <select>
          <option>All Status</option>
          <option>Completed</option>
          <option>Processing</option>
        </select>
        <input type="date" placeholder="Filter by date" />
        <button className="filter-btn">Apply Filters</button>
      </div>
      
      <div className="analysis-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Date</th>
              <th>Status</th>
              <th>Result</th>
              <th>Confidence</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {analyses.map(analysis => (
              <tr key={analysis.id}>
                <td>{analysis.id}</td>
                <td>{analysis.patientName}</td>
                <td>{analysis.date}</td>
                <td>
                  <span className={`status-badge ${analysis.status.toLowerCase()}`}>
                    {analysis.status}
                  </span>
                </td>
                <td className={`result ${analysis.result.toLowerCase()}`}>
                  {analysis.result}
                </td>
                <td>
                  {analysis.confidence > 0 ? `${analysis.confidence}%` : '-'}
                </td>
                <td>
                  <button className="view-btn">View Details</button>
                  {analysis.status === 'Completed' && (
                    <button className="report-btn">Generate Report</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Analysis;