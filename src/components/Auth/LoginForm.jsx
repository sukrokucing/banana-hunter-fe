import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import AuthService from '../../services/auth.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toggle } from '@/components/ui/toggle';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Loader2, Eye, EyeOff } from 'lucide-react';

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
  const [showPassword, setShowPassword] = React.useState(false);

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
    <div className="flex flex-col gap-6 z-30">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                    <div className="flex w-full max-w-sm items-center space-x-2">
                      <Input
                        id={field.name}
                        type={showPassword ? 'text' : 'password'}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />

                      <Toggle
                        aria-label="Toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Toggle>
                    </div>
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
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" />
                      {'logging in...'}
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>
              )}
            </form.Subscribe>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
