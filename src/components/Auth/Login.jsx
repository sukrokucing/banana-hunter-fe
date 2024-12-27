import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { useAuthStore } from '../../context/authStore';
import AuthService from '../../services/auth.service';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const FieldInfo = ({ field }) => (
  <div>
    {field.state.meta.touchedErrors ? (
      <em>{field.state.meta.touchedErrors}</em>
    ) : null}
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [error, setError] = React.useState('');

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      setError('');
      try {
        const data = await AuthService.login(value);
        setAuth({ token: data.access_token, user: data.user });
        navigate('/profile');
      } catch (err) {
        setError(err.response?.data?.message || 'Login failed');
      }
    },
    validators: {
      onChange: loginSchema,
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
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
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
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          </form.Field>
        </div>

        {error && <div className="error">{error}</div>}

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button type="submit" disabled={!canSubmit}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
};

export default Login;
