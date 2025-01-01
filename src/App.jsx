import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Register from './components/Auth/Register';
import Profile from './components/Profile/Profile';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import WeddingInvitationPage from './pages/WeddingInvitationPage';
import { useAuthStore } from './context/authStore';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import './index.css';

function App() {
  const { token } = useAuthStore();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Root route redirects based on auth status */}
          <Route
            path="/"
            element={
              token ? (
                <Navigate to="/profile" />
              ) : (
                <Navigate to="/wedding-invitation" />
              )
            }
          />

          {/* Auth routes */}
          <Route
            path="/wedding-invitation"
            element={<WeddingInvitationPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
