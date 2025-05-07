import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard Overview</h1>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Patients</h3>
          <p>124</p>
        </div>
        <div className="stat-card">
          <h3>EDF Files Analyzed</h3>
          <p>89</p>
        </div>
        <div className="stat-card">
          <h3>Positive Cases</h3>
          <p>32</p>
        </div>
        <div className="stat-card">
          <h3>Recent Activity</h3>
          <p>5 new analyses</p>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Analysis</h2>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Result</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>2023-05-15</td>
              <td className="positive">Positive</td>
              <td>87%</td>
            </tr>
            <tr>
              <td>Jane Smith</td>
              <td>2023-05-14</td>
              <td className="negative">Negative</td>
              <td>92%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;