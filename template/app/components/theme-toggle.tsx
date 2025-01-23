// app/components/theme-toggle.tsx
'use client';

import { useTheme } from 'next-themes';
import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Button, IconButton } from '@radix-ui/themes';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconButton variant="soft" radius="large">
          {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('high-contrast')}>High Contrast</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('minimalist')}>Minimalist</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
