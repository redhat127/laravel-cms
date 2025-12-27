import { BaseLayout } from '@/components/layout/base-layout';
import { pageTitle } from '@/lib/utils';
import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';

export default function Home() {
  return (
    <>
      <Head>
        <title>{pageTitle('Manage Your Content')}</title>
      </Head>
    </>
  );
}

Home.layout = (page: ReactNode) => <BaseLayout>{page}</BaseLayout>;
