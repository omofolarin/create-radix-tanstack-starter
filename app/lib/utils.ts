import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const suppressHydrationWarnings = () => {
  if (typeof window !== 'undefined') {
    const originalError = console.error;
    console.error = (...args) => {
      if (
        args[0]?.includes?.('Warning: Text content did not match.') ||
        args[0]?.includes?.('Warning: Expected server HTML to contain a matching') ||
        args[0]?.includes?.('Hydration failed because') ||
        args[0]?.includes?.(' Extra attributes from the server:')
      ) {
        return;
      }
      originalError.apply(console, args);
    };
  }
};
