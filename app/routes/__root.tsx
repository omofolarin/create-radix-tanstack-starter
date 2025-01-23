import React from 'react';
import { Spinner } from '@radix-ui/themes';
import { createRootRoute, Outlet, ScrollRestoration } from '@tanstack/react-router';
import { Meta, Scripts } from '@tanstack/start';
import { RootProviders } from '@/contexts/providers';
import '@radix-ui/themes/styles.css';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'My App',
      },
    ],
    links: [
      {
        href: "/output.css",
        rel: 'stylesheet',
      },
    ]
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <React.Suspense fallback={<Spinner />}>
        <RootProviders>
          <Outlet />
        </RootProviders>
      </React.Suspense>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
