import type { ReactNode } from 'react';
import { ToggleTheme } from '../theme-provider';

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <div className="ml-auto">
        <ToggleTheme />
      </div>
      {children}
    </div>
  );
};
