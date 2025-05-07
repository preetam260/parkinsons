import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const menuItems = [
  { path: '/dashboard', name: 'Dashboard', icon: '📊' },
  { path: '/patients', name: 'Patients', icon: '👨‍⚕️' },
  { path: '/upload-edf', name: 'Upload EDF', icon: '📁' },
  { path: '/analysis', name: 'Analysis', icon: '🔍' },
  { path: '/reports', name: 'Reports', icon: '📄' },
  { path: '/chatbot', name: 'Chatbot', icon: '🤖' },
  { path: '/settings', name: 'Settings', icon: '⚙️' },
];

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Parkinson's Detector</h3>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                <span className="icon">{item.icon}</span>
                <span className="name">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;