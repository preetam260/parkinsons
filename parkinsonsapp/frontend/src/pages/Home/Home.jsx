import { useNavigate } from 'react-router-dom';
import { FaFileUpload, FaUserShield, FaBrain, FaChartLine } from 'react-icons/fa';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Advanced Parkinson's Disease Detection Platform</h1>
        <p>Leveraging cutting-edge technology to improve early detection
           and management of Parkinson's disease for healthcare professionals.</p>
        <div className="hero-buttons">
          <button 
            className="login-btn"
            onClick={() => navigate('/login')}>
            Login for Healthcare Professionals
          </button>
          <button 
            className="secondary-btn"
            onClick={() => navigate('/learn-more')}>
            Learn More
          </button>
        </div>
      </header>
      
      <section className="features-section">
        <h2 className="section-title">Comprehensive Platform Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="card-icon">
              <FaFileUpload size={40} />
            </div>
            <h3>EDF File Analysis</h3>
            <p>Upload and analyze electroencephalography data files for comprehensive neurological assessment.</p>
          </div>
          
          <div className="feature-card">
            <div className="card-icon">
              <FaUserShield size={40} />
            </div>
            <h3>Patient Management</h3>
            <p>Secure dashboard for healthcare professionals to manage patient data.</p>
          </div>
          
          <div className="feature-card">
            <div className="card-icon">
              <FaBrain size={40} />
            </div>
            <h3>AI-Powered Insights</h3>
            <p>Get predictive analysis using our advanced machine learning models.</p>
          </div>
          
          <div className="feature-card">
            <div className="card-icon">
              <FaChartLine size={40} />
            </div>
            <h3>Advanced Analytics</h3>
            <p>Detailed reports and trend analysis for better patient outcomes.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;