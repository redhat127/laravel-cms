import type { SharedInertiaCurrentUserProp } from '@/types';
import { usePage } from '@inertiajs/react';

export const useCurrentUser = () => {
  const {
    props: { current_user },
  } = usePage<SharedInertiaCurrentUserProp>();
  return current_user?.data;
};
