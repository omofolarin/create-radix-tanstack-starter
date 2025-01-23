import React from 'react';
import { Theme, ThemePanel } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import * as Toast from '@radix-ui/react-toast';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

const queryClient = new QueryClient();

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <QueryClientProvider client={queryClient}>
        <Theme accentColor="blue" grayColor="slate" radius="medium">
          {children}
        </Theme>
        <ReactQueryDevtools initialIsOpen={false} />
        <ThemePanel defaultOpen={false} />
        <TanStackRouterDevtools position="bottom-left" />

        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
        <Toast.Viewport className="fixed right-0 bottom-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-2.5 p-[var(--viewport-padding)] [--viewport-padding:_25px] outline-none" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
