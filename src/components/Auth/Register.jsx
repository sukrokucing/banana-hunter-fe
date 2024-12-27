import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import { useAuthStore } from '../../context/authStore';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await AuthService.register(formData);
      setAuth(data.token, data.user);
      navigate('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" onChange={handleChange} placeholder="Name" required />
      <input
        name="email"
        onChange={handleChange}
        placeholder="Email"
        type="email"
        required
      />
      <input
        name="password"
        onChange={handleChange}
        placeholder="Password"
        type="password"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
