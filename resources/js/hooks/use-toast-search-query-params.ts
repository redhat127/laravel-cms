import { useEffect } from 'react';
import { toast } from 'sonner';

interface ToastConfig {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  delay?: number;
}

export const useToastSearchParam = (searchParam: string, config: ToastConfig) => {
  const { message, type = 'success', delay = 100 } = config;

  useEffect(() => {
    const searchParams = new URL(window.location.href).searchParams;
    const paramValue = searchParams.get(searchParam);

    // Check if param exists and is 'true'
    if (paramValue === 'true') {
      const timerId = setTimeout(() => {
        // Call the appropriate toast method based on type
        toast[type](message);
      }, delay);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [searchParam, message, type, delay]);
};
