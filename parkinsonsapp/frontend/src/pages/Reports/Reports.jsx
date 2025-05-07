import { useState } from 'react';
import './Reports.css';

function Reports() {
  const [reports] = useState([
    { id: 1, patientName: 'John Doe', date: '2023-05-10', type: 'Full Analysis' },
    { id: 2, patientName: 'Jane Smith', date: '2023-05-12', type: 'Summary' },
    { id: 3, patientName: 'Robert Johnson', date: '2023-05-08', type: 'Full Analysis' },
  ]);

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1>Generated Reports</h1>
        <button className="generate-report-btn">+ Generate New Report</button>
      </div>
      
      <div className="reports-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Date</th>
              <th>Report Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.patientName}</td>
                <td>{report.date}</td>
                <td>{report.type}</td>
                <td>
                  <button className="view-btn">View</button>
                  <button className="download-btn">Download</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reports;