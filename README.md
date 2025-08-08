# React Starter Kit

A no-nonsense React template that gets you coding fast. Everything you need, nothing you don't.

## What's Included

### Core Stack

- **React 18** - The latest and greatest
- **TypeScript** - Better code, fewer bugs
- **Vite** - Fast builds, hot reloading that works
- **Styled Components** - CSS-in-JS done right

### State & Data

- **Zustand** - Simple state management
- **Apollo Client** - GraphQL made easy
- **React Router** - Client-side routing

### Testing Suite

- **Vitest** - Modern testing framework
- **React Testing Library** - Component testing
- **Playwright** - End-to-end testing
- **jest-axe** - Accessibility testing

### Developer Tools

- **ESLint & Prettier** - Code formatting and linting
- **Husky** - Git hooks for quality control
- **TypeScript strict mode** - Better type safety

### Accessibility First

- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader optimized
- Proper semantic markup

## Project Structure

```
src/
├── components/      # UI components
│   ├── Navigation.tsx # Main navigation
│   ├── TodoForm.tsx   # Todo input form
│   ├── TodoList.tsx   # Todo list with filters
│   └── Launches.tsx   # SpaceX data viewer
├── pages/           # Page components
│   ├── HomePage.tsx   # Landing page
│   ├── TodosPage.tsx  # Todo application
│   └── AboutPage.tsx  # Documentation
├── store/           # Zustand stores
├── graphql/         # Apollo setup
├── styles/          # Theme and styled components
└── __tests__/       # Test files
```

## Getting Started

```bash
npm install
npm run dev
```

Open your browser to `http://localhost:5173`

## Available Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm test             # Run unit tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage
npm run test:e2e     # Run end-to-end tests
npm run test:e2e:ui  # Run e2e tests with UI

# Code Quality
npm run lint         # Check for linting errors
npm run lint:fix     # Fix linting errors
npm run format       # Format code with Prettier
npm run format:check # Check code formatting

# Versioning & Release
npm run version:patch # Bump patch version (1.0.0 → 1.0.1)
npm run version:minor # Bump minor version (1.0.0 → 1.1.0)
npm run version:major # Bump major version (1.0.0 → 2.0.0)
npm run release      # Full release process
./scripts/release.sh # Complete release workflow
```

## Testing

### Unit Tests

- Built with Vitest and React Testing Library
- Test components, hooks, and utilities
- Run with `npm test`

### End-to-End Tests

- Powered by Playwright
- Tests across Chrome, Firefox, and Safari
- Run with `npm run test:e2e`

### Accessibility Tests

- Automated with jest-axe
- Ensures WCAG 2.1 AA compliance
- Runs with unit tests

## Styling

The project uses styled-components with a theme system:

```typescript
const theme = {
  colors: {
    primary: '#007bff',
    success: '#28a745',
    danger: '#dc3545',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
  },
};
```

### Using Components

```tsx
import { Button, Card, Text } from './styles/components';

function MyComponent() {
  return (
    <Card padding="lg">
      <Text size="lg" weight="bold">
        Hello World
      </Text>
      <Button variant="primary" size="md">
        Click me
      </Button>
    </Card>
  );
}
```

## Contributing

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Run the tests
5. Submit a pull request

## License

MIT

### Component Usage

```tsx
import { Button, Card, Text } from './styles/components';

function MyComponent() {
  return (
    <Card padding="lg">
      <Text size="lg" weight="bold">
        Hello World
      </Text>
      <Button variant="primary" size="md">
        Click me
      </Button>
    </Card>
  );
}
```

That's basically it! Check out the code to see how everything fits together. The project is set up to be pretty solid and should handle most of what you need for a modern React app.

Happy coding! 🚀
