# React TypeScript Boilerplate 🚀

A modern, production-ready React TypeScript boilerplate with everything you need to build scalable web applications in 2025.

## ✨ Features

### 🏗️ **Core Stack**

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development experience
- **Vite** - Lightning-fast build tool and dev server
- **pnpm** - Fast, disk space efficient package manager

### 🎨 **Styling & UI**

- **Styled Components** - CSS-in-JS with theming support
- **Modern CSS** - CSS Variables, Grid, Flexbox
- **Responsive Design** - Mobile-first approach

### 🧪 **Testing Suite**

- **Vitest** - Fast unit testing with Jest compatibility
- **Testing Library** - Simple and complete testing utilities
- **Playwright** - Reliable end-to-end testing
- **jest-axe** - Accessibility testing

### 📦 **State Management & Data**

- **Zustand** - Lightweight state management
- **Apollo Client** - GraphQL client with caching
- **React Hook Form** - Performant forms with validation
- **Zod** - Type-safe schema validation

### 🔧 **Developer Experience**

- **Biome** - Fast linting and formatting (replaces ESLint + Prettier)
- **TypeScript** - Full type safety across the project
- **Husky** - Git hooks for code quality
- **Lint-staged** - Run linters on staged files
- **Automatic versioning** - Semantic versioning scripts

### 🚀 **Production Ready**

- **Vite build optimization** - Tree shaking, code splitting
- **Performance monitoring** - Web Vitals integration
- **Error boundaries** - Graceful error handling
- **Environment configurations** - Development and production setups

## 🎯 Quick Start

### Option 1: Use the Template Script (Recommended)

```bash
# Clone this repository
git clone https://github.com/yourusername/react-typescript-boilerplate.git
cd react-typescript-boilerplate

# Create a new project
./create-template.sh my-awesome-app

# Navigate to your new project
cd my-awesome-app

# Start development
pnpm dev
```

### Option 2: Manual Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/react-typescript-boilerplate.git my-app
cd my-app

# Remove the original git history
rm -rf .git

# Initialize your own git repository
git init
git add .
git commit -m "Initial commit"

# Install dependencies
pnpm install

# Start development
pnpm dev
```

## 📋 Available Scripts

| Command              | Description                                       |
| -------------------- | ------------------------------------------------- |
| `pnpm dev`           | Start development server at http://localhost:5173 |
| `pnpm build`         | Build for production                              |
| `pnpm preview`       | Preview production build locally                  |
| `pnpm test`          | Run unit tests with Vitest                        |
| `pnpm test:ui`       | Run tests with UI interface                       |
| `pnpm test:coverage` | Run tests with coverage report                    |
| `pnpm test:e2e`      | Run end-to-end tests with Playwright              |
| `pnpm test:e2e:ui`   | Run E2E tests with UI interface                   |
| `pnpm lint`          | Check code with Biome                             |
| `pnpm lint:fix`      | Fix code issues automatically                     |
| `pnpm format`        | Format code with Biome                            |
| `pnpm check`         | Run comprehensive code check                      |
| `pnpm analyze`       | Analyze bundle size                               |

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorBoundary.tsx
│   ├── Navigation.tsx
│   └── __tests__/      # Component tests
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   └── TodosPage.tsx
├── store/              # Zustand stores
│   ├── index.ts
│   └── __tests__/
├── styles/             # Styled components and themes
│   ├── GlobalStyles.ts
│   ├── theme.ts
│   └── components.ts
├── graphql/            # GraphQL queries and client setup
│   ├── client.ts
│   ├── queries.ts
│   └── types.ts
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── test/               # Test setup and utilities
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## 🛠️ Configuration Files

- **`biome.json`** - Biome configuration for linting and formatting
- **`tsconfig.json`** - TypeScript configuration
- **`vite.config.ts`** - Vite build configuration
- **`playwright.config.ts`** - Playwright E2E testing configuration
- **`vitest.config.ts`** - Vitest unit testing configuration (inherited from Vite)

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build the project
pnpm build

# Deploy the dist folder to Netlify
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🎨 Customization

### 1. Update Branding

- Modify `index.html` title and meta tags
- Update `public/vite.svg` with your logo
- Customize colors in `src/styles/theme.ts`

### 2. Environment Variables

Create `.env.local`:

```env
VITE_API_URL=your-api-url
VITE_GRAPHQL_ENDPOINT=your-graphql-endpoint
```

### 3. Add New Pages

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link in `src/components/Navigation.tsx`

### 4. State Management

- **Local state**: Use `useState` and `useReducer`
- **Global state**: Add stores in `src/store/`
- **Server state**: Use Apollo Client hooks

## 🧪 Testing Strategy

### Unit Tests

- Components: Test rendering and user interactions
- Utilities: Test pure functions and helpers
- Stores: Test state management logic

### Integration Tests

- Page components with routing
- Forms with validation
- API integration with mocked responses

### E2E Tests

- User workflows
- Cross-browser compatibility
- Performance testing

## 📚 Learning Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Biome Documentation](https://biomejs.dev/)
- [Vitest Guide](https://vitest.dev/guide/)
- [Playwright Documentation](https://playwright.dev/)
- [Styled Components](https://styled-components.com/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you have any questions or run into issues:

1. Check the [Issues](https://github.com/yourusername/react-typescript-boilerplate/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

**Happy coding!** 🎉

Built with ❤️ for the React community.

### Testing Suite

- **Vitest** - Modern testing framework
- **React Testing Library** - Component testing
- **Playwright** - End-to-end testing
- **jest-axe** - Accessibility testing

### Developer Tools

- **Biome** - Ultra-fast Rust-based linter/formatter (replaces ESLint+Prettier)
- **pnpm** - Fast, disk-efficient package manager
- **Husky** - Git hooks for quality control
- **TypeScript strict mode** - Enhanced type safety with latest features

### Performance & Monitoring

- **Web Vitals** - Core Web Vitals performance monitoring
- **Bundle Analyzer** - Production optimization tools
- **Error Boundaries** - Production-ready error handling
- **Performance Tracking** - Custom analytics utilities

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

### Prerequisites

- **Node.js** >= 22.12.0 (for Vite 7 compatibility)
- **pnpm** >= 9.0.0

```bash
# Install pnpm if you haven't already
npm install -g pnpm

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open your browser to `http://localhost:5173`

## Available Commands

```bash
# Development
pnpm dev                    # Start development server
pnpm build                  # Build for production
pnpm preview               # Preview production build

# Code Quality
pnpm check                 # Run Biome linter/formatter check
pnpm check:fix             # Auto-fix linting and formatting issues
pnpm analyze               # Analyze bundle size

# Testing
pnpm test                  # Run unit tests
pnpm test:ui               # Run tests with UI
pnpm test:coverage         # Run tests with coverage
pnpm test:e2e              # Run end-to-end tests
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
