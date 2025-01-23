// app/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import { Text, Heading, Container } from '@radix-ui/themes';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <Container size="3" p="4">
      <Heading size="8" mb="4">Welcome to Your App</Heading>
      <Text size="4">
        This is a template built with Radix UI and TanStack Router. Start building your app by editing this page.
      </Text>
    </Container>
  );
}
