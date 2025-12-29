import { ChangePasswordForm } from '@/components/form/auth/change-password-form';
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

export default function ChangePassword({ email, token }: { email: string; token: string }) {
  return (
    <>
      <Head>
        <title>{pageTitle('Change Password')}</title>
      </Head>
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="font-bold">Change Password</h1>
          </CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <ChangePasswordForm email={email} token={token} />
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

ChangePassword.layout = (page: ReactNode) => (
  <BaseLayout>
    <AuthLayout>{page}</AuthLayout>
  </BaseLayout>
);
