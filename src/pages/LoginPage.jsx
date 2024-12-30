import LoginForm from '../components/Auth/LoginForm';
// import { BackgroundLines } from '@/components/ui/BackgroundLines';
import { BackgroundLines } from '@/components/ui/background-lines';

export default function LoginPage() {
  return (
    <BackgroundLines className="flex">
      <div className="z-20 flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </BackgroundLines>
  );
}
