import { BaseLayout } from '@/components/layout/base-layout';
import { ToggleTheme } from '@/components/theme-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { pageTitle } from '@/lib/utils';
import { home } from '@/routes';
import { Head, Link } from '@inertiajs/react';

export default function ErrorPage({ statusCode, title, message }: { statusCode: number; title: string; message: string }) {
  return (
    <BaseLayout>
      <Head>
        <title>{pageTitle(title)}</title>
      </Head>
      <div className="flex w-full max-w-sm flex-col gap-2 text-center">
        <div className="ml-auto">
          <ToggleTheme />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>
              <h1 className="font-bold text-red-600 dark:text-red-400">
                {statusCode} - {title}
              </h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {message}
            <div className="mt-2">
              <Link href={home()} className="text-sm underline underline-offset-4">
                Back to home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </BaseLayout>
  );
}
