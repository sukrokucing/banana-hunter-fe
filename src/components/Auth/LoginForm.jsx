import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import AuthService from '../../services/auth.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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

const LoginForm = () => {
  const navigate = useNavigate();
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
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="grid gap-6"
      >
        <div className="grid gap-2">
          <form.Field
            name="email"
            validators={{
              onChange: z.string().email('Invalid email address'),
            }}
          >
            {(field) => (
              <>
                <Label htmlFor={field.name}>Email:</Label>
                <Input
                  id={field.name}
                  type="email"
                  name={field.name}
                  placeholder="m@example.com"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </>
            )}
          </form.Field>
        </div>
        <div className="grid gap-2">
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
                <Label htmlFor={field.name}>Password:</Label>
                <Input
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
            <Button type="submit" className="w-full" disabled={!canSubmit}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
};

export default LoginForm;
