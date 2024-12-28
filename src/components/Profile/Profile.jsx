import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../context/authStore';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const Profile = () => {
  const { setProfile, user, logout } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isFetching, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await UserService.getProfile();
      return response; // Ensure you're returning the data property
    },
  });

  const fetchProfile = async () => {
    try {
      await queryClient.invalidateQueries(['profile']);
      const updatedData = await queryClient.getQueryData(['profile']);

      if (updatedData && JSON.stringify(updatedData) !== JSON.stringify(user)) {
        setProfile(updatedData);
      }
    } catch (err) {
      console.error('Error invalidating queries:', err);
    }
  };

  const handleLogout = async () => {
    AuthService.logout();
    navigate('/login');
  };

  return (
    <div className="p-4">
      <h1>Welcome, {user?.name || 'Guest'}</h1>

      <button
        onClick={fetchProfile}
        className="bg-blue-500 text-white p-2 rounded ml-2"
        disabled={isFetching || isLoading}
      >
        {isLoading ? 'Updating...' : 'Fetch Profile'}
      </button>

      <p>Email: {user?.email}</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 rounded"
      >
        Logout
      </button>
      {error && <div className="error">{error.message}</div>}
    </div>
  );
};

export default Profile;
