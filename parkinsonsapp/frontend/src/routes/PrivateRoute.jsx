import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children }) {
  
  // Always call hooks unconditionally at the top level
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated ?? false);
  
  // Now you can use the value in your logic
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}