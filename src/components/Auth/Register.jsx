import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import AuthService from '../../services/auth.service';
import { useAuthStore } from '../../context/authStore';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ['password_confirmation'],
  });

const Register = () => {
  const [error, setError] = useState('');
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    validators: {
      onChange: registerSchema,
    },
    onSubmit: async ({ value }) => {
      setError('');
      try {
        const data = await AuthService.register(value);
        setAuth(data.access_token, data.user);
        navigate('/profile');
      } catch (err) {
        setError(err.response?.data?.message || 'Registration failed');
      }
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {error && <div className="error">{error}</div>}

        <div>
          <form.Field
            name="name"
            validators={{
              onChange: z.string().min(2, 'Name must be at least 2 characters'),
            }}
          >
            {(field) => (
              <>
                <label htmlFor={field.name}>Name:</label>
                <input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors && (
                  <span>{field.state.meta.errors.join(', ')}</span>
                )}
              </>
            )}
          </form.Field>
        </div>

        <div>
          <form.Field
            name="email"
            validators={{
              onChange: z.string().email('Invalid email address'),
            }}
          >
            {(field) => (
              <>
                <label htmlFor={field.name}>Email:</label>
                <input
                  id={field.name}
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors && (
                  <span>{field.state.meta.errors.join(', ')}</span>
                )}
              </>
            )}
          </form.Field>
        </div>

        <div>
          <form.Field
            name="password"
            validators={{
              onChange: z
                .string()
                .min(6, 'Password must be at least 6 characters'),
            }}
          >
            {(field) => (
              <>
                <label htmlFor={field.name}>Password:</label>
                <input
                  id={field.name}
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors && (
                  <span>{field.state.meta.errors.join(', ')}</span>
                )}
              </>
            )}
          </form.Field>
        </div>

        <div>
          <form.Field
            name="password_confirmation"
            validators={{
              onChange: z.string(),
            }}
          >
            {(field) => (
              <>
                <label htmlFor={field.name}>Confirm Password:</label>
                <input
                  id={field.name}
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors && (
                  <span>{field.state.meta.errors.join(', ')}</span>
                )}
              </>
            )}
          </form.Field>
        </div>

        <button type="submit" disabled={form.state.isSubmitting}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
