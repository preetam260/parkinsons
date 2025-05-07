
import { useState } from 'react';
import './Patients.css';

function Patients() {
  const [patients] = useState([
    { id: 1, name: 'John Doe', age: 65, gender: 'Male', lastVisit: '2023-05-10' },
    { id: 2, name: 'Jane Smith', age: 58, gender: 'Female', lastVisit: '2023-05-12' },
    { id: 3, name: 'Robert Johnson', age: 70, gender: 'Male', lastVisit: '2023-05-08' },
  ]);

  return (
    <div className="patients-container">
      <div className="patients-header">
        <h1>Patient Management</h1>
        <button className="add-patient-btn">+ Add New Patient</button>
      </div>

      <div className="patients-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Last Visit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{patient.lastVisit}</td>
                <td>
                  <button className="view-btn">View</button>
                  <button className="edit-btn">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Patients;