import { BaseLayout } from '@/components/layout/base-layout';
import { useToastSearchParam } from '@/hooks/use-toast-search-query-params';
import { pageTitle } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import { type ReactNode } from 'react';

export default function Home() {
  useToastSearchParam('account-deleted', { message: 'Your account has been deleted.' });
  return (
    <>
      <Head>
        <title>{pageTitle('Manage Your Content')}</title>
      </Head>
    </>
  );
}

Home.layout = (page: ReactNode) => <BaseLayout>{page}</BaseLayout>;
