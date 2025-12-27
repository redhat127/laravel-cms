import type { FlashMessage } from '@/types';
import { usePage } from '@inertiajs/react';

export const useFlashMessage = () => {
  const { flash } = usePage() as Omit<ReturnType<typeof usePage>, 'flash'> & { flash?: FlashMessage };
  return flash?.flash_message;
};
