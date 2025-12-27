import type { FlashMessage } from '@/types';
import { usePage } from '@inertiajs/react';

export const useFlashMessage = () => {
  const { flash, props } = usePage<{
    flash_message: FlashMessage['flash_message'] | null;
  }>();

  return (flash as FlashMessage | undefined)?.flash_message ?? props.flash_message;
};
