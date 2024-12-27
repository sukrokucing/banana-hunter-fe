import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../context/authStore';

const Profile = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="p-4">
      <h1>Welcome, {user?.name || 'Guest'}</h1>
      <p>Email: {user?.email}</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
