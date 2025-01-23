# create-radix-tanstack-app

A template for creating React applications with Radix UI and TanStack Router.

## Features

- 🚀 Bun for fast package management and running
- 🎨 Radix UI for beautiful, accessible components
- 🛣️ TanStack Router for type-safe routing
- 💅 TailwindCSS with Radix UI design tokens
- 🔍 File-based routing pattern
- 📦 Pre-configured with essential tools and libraries

## Usage

```bash
bun create radix-tanstack-app my-app
cd my-app
bun dev
```

## Project Structure

```
my-app/
├── app/
│   ├── lib/         # Shared utilities and components
│   ├── routes/      # File-based routing
│   └── styles/      # Global styles and Tailwind config
├── public/          # Static assets
└── docs/           # Project documentation
```

## Radix UI Components Usage

### TextField
```tsx
<TextField.Root placeholder="Search the docs…">
  <TextField.Slot>
    <MagnifyingGlassIcon height="16" width="16" />
  </TextField.Slot>
</TextField.Root>
```

### Tabs
```tsx
<Tabs.Root>
  <Tabs.List>
    {/* Tab triggers */}
  </Tabs.List>
  <Tabs.Content>
    {/* Tab content */}
  </Tabs.Content>
</Tabs.Root>
```

## Tailwind Color Tokens

This template uses Tailwind color tokens that map to Radix UI design tokens:

- Use `gray-{1-12}` for solid grays, `gray-a{1-12}` for alpha grays
- Use `accent-{1-12}` for solid accents, `accent-a{1-12}` for alpha accents
- Use semantic colors like `background`, `foreground`, `muted`, `border`, `primary`

## License

MIT
