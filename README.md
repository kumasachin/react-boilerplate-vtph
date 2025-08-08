# React TypeScript Starter

A modern React template that actually works out of the box. Built for developers who want to skip the setup and start building.

## What's Inside

### The Good Stuff

- **React 18** - Because it's 2025 and we're not animals
- **TypeScript** - Catch bugs before your users do
- **Vite** - Blazing fast builds that don't make you wait
- **Styled Components** - CSS that lives with your components

### State & Data

- **Zustand** - State management without the boilerplate
- **Apollo Client** - GraphQL that handles the hard parts
- **React Router** - Navigation that just works

### Testing That Doesn't Suck

- **Vitest** - Fast tests that actually run
- **React Testing Library** - Test what users see, not implementation details
- **Playwright** - E2E tests across real browsers
- **Accessibility testing** - Because everyone deserves to use your app

### Developer Experience

- **ESLint & Prettier** - Stop arguing about code style
- **Husky** - Git hooks that keep the codebase clean
- **TypeScript strict mode** - Embrace the red squiggles

### Built for Everyone

- Proper ARIA labels and keyboard navigation
- Screen reader friendly
- High contrast and reduced motion support

## Quick Start

```
src/
```

src/
├── components/ # UI components
│ ├── Navigation.tsx # Main nav
│ ├── TodoForm.tsx # Todo input
│ ├── TodoList.tsx # Todo list with filters
│ └── Launches.tsx # SpaceX data viewer
├── pages/ # Page components
│ ├── HomePage.tsx # Landing page
│ ├── TodosPage.tsx # Todo app
│ └── AboutPage.tsx # Docs
├── store/ # Zustand stores
├── graphql/ # Apollo setup
├── styles/ # Theme and components
└── **tests**/ # Test files

````

## Getting Started

You know the drill:

```bash
npm install
npm run dev
````

Then hit `http://localhost:5173` and you're off to the races.

## Scripts

````bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run test         # Run tests
npm run test:e2e     # E2E tests
npm run lint         # Check code

```bash
npm test             # Run unit tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage
npm run test:e2e     # Run end-to-end tests
npm run test:e2e:ui  # Run e2e tests with UI
````

### Code Quality

```bash
npm run lint         # Check for linting errors
npm run lint:fix     # Fix linting errors
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## 🧪 Testing Strategy

### Unit Testing

- **Framework**: Vitest with React Testing Library
- **Coverage**: Aim for >80% code coverage
- **Focus**: Component logic, user interactions, edge cases

### End-to-End Testing

- **Framework**: Playwright
- **Browsers**: Chromium, Firefox, WebKit
- **Focus**: User workflows, navigation, form submissions

### Accessibility Testing

- **Tool**: Jest-Axe
- **Standards**: WCAG 2.1 AA compliance
- **Coverage**: All interactive components

## 🎨 Styling System

### Theme Structure

```typescript
const theme = {
  colors: {
    primary: '#007bff',
    success: '#28a745',
    danger: '#dc3545',
    // ... more colors
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    // ... more spacing
  },
  // ... fonts, breakpoints, etc.
};
```

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
