import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes';
import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';
import { Theme, ThemePanel } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ToastsProvider } from '@/components/notifications';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <Theme accentColor="blue" radius="medium" scaling="100%">
        {children}
      </Theme>
    </NextThemesProvider>
  );
}

interface RootProvidersProps {
  children: React.ReactNode;
}

export const queryClient = new QueryClient();
export const RootProviders = (props: RootProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToastsProvider position="topRight">
          {props.children}
          <ThemePanel defaultOpen={false} />
          <TanStackRouterDevtools position="bottom-left" />

          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
          <Toast.Viewport className="fixed right-0 bottom-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-2.5 p-[var(--viewport-padding)] [--viewport-padding:_25px] outline-none" />
        </ToastsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
