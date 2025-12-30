import AccountController from '@/actions/App/Http/Controllers/AccountController';
import { showServerValidationError } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { Trash } from 'lucide-react';
import { useState } from 'react';

export const DeleteAvatar = () => {
  const [isPending, setIsPending] = useState(false);
  return (
    <button
      type="button"
      disabled={isPending}
      className={`group absolute inset-0 flex items-center justify-center bg-transparent transition-colors duration-200 hover:bg-red-600/80 focus:outline-none`}
      aria-label="Delete"
      onClick={() => {
        router.delete(AccountController.deleteAvatar(), {
          preserveScroll: true,
          preserveState: 'errors',
          onBefore() {
            if (!confirm('Are you sure you want to delete your avatar?')) return false;
            setIsPending(true);
          },
          onFinish() {
            setIsPending(false);
          },
          onError(error) {
            showServerValidationError(error);
          },
        });
      }}
    >
      <Trash className="size-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
    </button>
  );
};
