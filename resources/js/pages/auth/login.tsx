import { LoginForm } from '@/components/form/auth/login-form';
import { AuthLayout } from '@/components/layout/auth-layout';
import { BaseLayout } from '@/components/layout/base-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { pageTitle } from '@/lib/utils';
import { home } from '@/routes';
import auth from '@/routes/auth';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { type ReactNode } from 'react';

export default function Login() {
  return (
    <>
      <Head>
        <title>{pageTitle('Login')}</title>
      </Head>
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="font-bold">Login</h1>
          </CardTitle>
          <CardDescription>Use your email and password to login</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <LoginForm />
          <div className="my-4 flex flex-col gap-1.5 text-sm font-medium text-primary underline underline-offset-4">
            <Link href={auth.resendEmailVerification.get()}>Resend email verification</Link>
            <Link href={auth.register.get()}>Create an account</Link>
          </div>
          <Button asChild variant="outline" className="w-full">
            <Link href={home()}>
              <ArrowRight />
              Back to home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

Login.layout = (page: ReactNode) => (
  <BaseLayout>
    <AuthLayout>{page}</AuthLayout>
  </BaseLayout>
);
