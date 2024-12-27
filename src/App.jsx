import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './components/Auth/Login';
import Profile from './components/Profile/Profile';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import { useAuthStore } from './context/authStore';

function App() {
  const { token } = useAuthStore();

  return (
    <Router>
      <Routes>
        {/* Root route redirects based on auth status */}
        <Route
          path="/"
          element={
            token ? <Navigate to="/profile" /> : <Navigate to="/login" />
          }
        />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
