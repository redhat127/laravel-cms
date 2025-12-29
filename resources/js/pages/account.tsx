import { ChangeEmailForm } from '@/components/form/account/change-email-form';
import { ChangePasswordForm } from '@/components/form/account/change-password-form';
import { ProfileDetailsForm } from '@/components/form/account/profile-details';
import { BaseLayout } from '@/components/layout/base-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { pageTitle } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';

export default function Account() {
  return (
    <>
      <Head>
        <title>{pageTitle('Account')}</title>
      </Head>
      <div className="space-y-4">
        <Card>
          <CardHeader className="gap-0">
            <CardTitle>
              <h1 className="font-bold">Account</h1>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <h2 className="font-bold">Profile Details</h2>
            </CardTitle>
            <CardDescription>Update your profile details</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileDetailsForm />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <h2 className="font-bold">Change Email</h2>
            </CardTitle>
            <CardDescription>Update the email address associated with your account</CardDescription>
          </CardHeader>
          <CardContent>
            <ChangeEmailForm />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              <h2 className="font-bold">Change Password</h2>
            </CardTitle>
            <CardDescription>
              Update your password to keep your account secure. you'll need to enter your current password to confirm the change
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChangePasswordForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

Account.layout = (page: ReactNode) => <BaseLayout>{page}</BaseLayout>;
