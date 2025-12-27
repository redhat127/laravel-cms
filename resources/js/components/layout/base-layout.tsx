import { useCurrentUser } from '@/hooks/use-current-user';
import { useFlashMessage } from '@/hooks/use-flash-message';
import { clientEnv } from '@/lib/env';
import { cn } from '@/lib/utils';
import { home } from '@/routes';
import auth from '@/routes/auth';
import { Link, usePage } from '@inertiajs/react';
import { FileText } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';
import { toast } from 'sonner';
import { ToggleTheme, ToggleThemeProvider } from '../theme-provider';
import { Button } from '../ui/button';
import { Toaster } from '../ui/sonner';
import { UserDropdown } from '../user-dropdown';

export const BaseLayout = ({ children }: { children: ReactNode }) => {
  const currentUser = useCurrentUser();
  const flashMessage = useFlashMessage();
  useEffect(() => {
    if (flashMessage) {
      toast[flashMessage.type](flashMessage.text);
    }
  }, [flashMessage]);
  const { component } = usePage();
  const isAuthPage = component.startsWith('auth/');
  return (
    <ToggleThemeProvider>
      {!isAuthPage && (
        <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b bg-white p-4 px-8 dark:bg-black">
          <Link href={home()} className="flex items-center gap-2 text-xl font-bold text-black sm:text-2xl dark:text-white">
            <FileText className="size-5 text-orange-600 sm:size-auto dark:text-orange-400" />
            {clientEnv.VITE_APP_NAME}
          </Link>
          <div className="flex items-center gap-2">
            {currentUser ? (
              <UserDropdown />
            ) : (
              <Button asChild>
                <Link href={auth.login.get()}>Login</Link>
              </Button>
            )}
            <ToggleTheme />
          </div>
        </header>
      )}
      <main
        className={cn('p-4 px-8', {
          'flex min-h-screen items-center justify-center': isAuthPage,
          'mt-18': !isAuthPage,
        })}
      >
        {children}
        <Toaster position="top-center" closeButton duration={5000} expand />
      </main>
    </ToggleThemeProvider>
  );
};
