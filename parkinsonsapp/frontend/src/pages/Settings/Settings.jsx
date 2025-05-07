import { useState } from 'react';
import './Settings.css';

function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'Dr. Smith',
    email: 'dr.smith@example.com',
    specialty: 'Neurologist',
    hospital: 'City General Hospital'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      
      <div className="settings-tabs">
        <button 
          className={activeTab === 'profile' ? 'active' : ''}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button 
          className={activeTab === 'account' ? 'active' : ''}
          onClick={() => setActiveTab('account')}
        >
          Account
        </button>
        <button 
          className={activeTab === 'notifications' ? 'active' : ''}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
        <button 
          className={activeTab === 'system' ? 'active' : ''}
          onClick={() => setActiveTab('system')}
        >
          System
        </button>
      </div>
      
      <div className="settings-content">
        {activeTab === 'profile' && (
          <div className="profile-settings">
            <h2>Profile Information</h2>
            <form>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Specialty</label>
                <input
                  type="text"
                  name="specialty"
                  value={profile.specialty}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Hospital/Clinic</label>
                <input
                  type="text"
                  name="hospital"
                  value={profile.hospital}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="save-btn">Save Changes</button>
            </form>
          </div>
        )}
        
        {activeTab === 'account' && (
          <div className="account-settings">
            <h2>Account Security</h2>
            <div className="security-item">
              <h3>Change Password</h3>
              <button className="change-password-btn">Change Password</button>
            </div>
            <div className="security-item">
              <h3>Two-Factor Authentication</h3>
              <p>Status: <span className="status-off">Off</span></p>
              <button className="enable-2fa-btn">Enable 2FA</button>
            </div>
          </div>
        )}
        
        {activeTab === 'system' && (
          <div className="system-settings">
            <h2>System Preferences</h2>
            <div className="preference-item">
              <label>Theme</label>
              <select>
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>
            <div className="preference-item">
              <label>Data Backup</label>
              <button className="backup-btn">Create Backup</button>
            </div>
            <div className="preference-item">
              <label>Analysis Settings</label>
              <select>
                <option>Standard Analysis</option>
                <option>Detailed Analysis</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;