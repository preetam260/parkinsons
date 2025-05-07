import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { loginSuccess } from '../../store/slices/authSlice';
import './Login.css';

// Test credentials (remove in production)
const TEST_USERS = [
  {
    email: "doctor@example.com",
    password: "parkinson123",
    name: "Dr. Smith",
    role: "doctor"
  },
  {
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin"
  }
];

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check against test users
      const user = TEST_USERS.find(u => 
        u.email === email && u.password === password
      );

      if (user) {
        // Dispatch login success action
        dispatch(loginSuccess({
          user: {
            name: user.name,
            email: user.email,
            role: user.role
          },
          token: 'demo-token-' + Math.random().toString(36).slice(2)
        }));
        navigate('/dashboard');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError('Invalid credentials. Try: doctor@example.com / parkinson123');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login to Your Account</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="doctor@example.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="parkinson123"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="test-credentials">
          <h4>Test Accounts:</h4>
          <ul>
            <li>Doctor: doctor@example.com / parkinson123</li>
            <li>Admin: admin@example.com / admin123</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;