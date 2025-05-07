import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Patients from './pages/Patients/Patients';
import UploadEDF from './pages/UploadEDF/UploadEDF';
import Analysis from './pages/Analysis/Analysis';
import Reports from './pages/Reports/Reports';
import Chatbot from './pages/Chatbot/Chatbot';
import Settings from './pages/Settings/Settings';
import NotFound from './pages/404/NotFound';
import Layout from './components/common/Layout';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/layout-test" element={
  <Layout>
    <h1 style={{ color: 'red' }}>Layout Test</h1>
  </Layout>
} />
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
        <Route path="/patients" element={<PrivateRoute><Layout><Patients /></Layout></PrivateRoute>} />
        <Route path="/upload-edf" element={<PrivateRoute><Layout><UploadEDF /></Layout></PrivateRoute>} />
        <Route path="/analysis" element={<PrivateRoute><Layout><Analysis /></Layout></PrivateRoute>} />
        <Route path="/reports" element={<PrivateRoute><Layout><Reports /></Layout></PrivateRoute>} />
        <Route path="/chatbot" element={<PrivateRoute><Layout><Chatbot /></Layout></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Layout><Settings /></Layout></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
