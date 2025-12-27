import { useCurrentUser } from '@/hooks/use-current-user';
import account from '@/routes/account';
import { Link } from '@inertiajs/react';
import { User } from 'lucide-react';
import { useState } from 'react';
import { LogoutForm } from './form/logout-form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { UserAvatar } from './user-avatar';

export const UserDropdown = () => {
  const { name, email } = useCurrentUser()!;
  const userInitials = <UserAvatar />;
  const [open, setOpen] = useState(false);
  const closeDropdown = () => setOpen(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>{userInitials}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex items-center gap-2">
          {userInitials}
          <div className="flex max-w-30 flex-col">
            <span className="truncate">{name}</span>
            <span className="truncate text-sm font-normal text-muted-foreground">{email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0">
          <Link href={account.get()} className="flex w-full items-center gap-1.5 px-2 py-1.5" onClick={closeDropdown}>
            <User />
            Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0">
          <LogoutForm />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
