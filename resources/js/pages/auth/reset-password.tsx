import { ResetPasswordForm } from '@/components/form/auth/reset-password-form';
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

export default function ResetPassword() {
  return (
    <>
      <Head>
        <title>{pageTitle('Reset Password')}</title>
      </Head>
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="font-bold">Reset Password</h1>
          </CardTitle>
          <CardDescription>Enter your email to reset your password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <ResetPasswordForm />
          <Button asChild variant="link" className="px-0 underline underline-offset-4">
            <Link href={auth.login.get()}>Back to login</Link>
          </Button>
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

ResetPassword.layout = (page: ReactNode) => (
  <BaseLayout>
    <AuthLayout>{page}</AuthLayout>
  </BaseLayout>
);
