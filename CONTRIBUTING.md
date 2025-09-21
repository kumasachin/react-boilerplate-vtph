# Contributing

Hey there! Thanks for wanting to help out. Here's how to get started.

## Ways to Help

- Found a bug? Report it
- Got an idea? Share it
- Want to fix something? Go for it
- Documentation needs work? Jump in

## Getting Started

Fork this repo, then:

```bash
git clone https://github.com/yourusername/react-typescript-boilerplate.git
cd react-typescript-boilerplate
pnpm install
pnpm test
pnpm dev
```

Make a branch:

```bash
git checkout -b fix/whatever-youre-fixing
```

## Code Style

We use Biome for everything:

```bash
pnpm lint      # check issues
pnpm lint:fix  # fix them
pnpm format    # make it pretty
```

## Commit Messages

Keep them simple:

- `fix: button not working on mobile`
- `feat: add dark mode`
- `docs: update install steps`

## Testing

Add tests for new stuff. Run these before submitting:

```bash
pnpm test
pnpm test:e2e
pnpm lint
```

## Pull Requests

- Keep them focused
- Add tests if needed
- Update docs if you changed something
- Be patient while we review

## Questions?

Open an issue or start a discussion. We're friendly!

Thanks for contributing!

### 1. Fork & Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/yourusername/react-typescript-boilerplate.git
cd react-typescript-boilerplate
```

### 2. Set Up Development Environment

```bash
# Install dependencies
pnpm install

# Run tests to make sure everything works
pnpm test
pnpm test:e2e

# Start development server
pnpm dev
```

### 3. Create a Branch

```bash
# Create a descriptive branch name
git checkout -b feature/add-awesome-feature
# or
git checkout -b fix/resolve-bug-description
```

## 📝 Development Guidelines

### Code Style

We use **Biome** for consistent code formatting and linting:

```bash
# Check code quality
pnpm lint

# Fix issues automatically
pnpm lint:fix

# Format code
pnpm format

# Run comprehensive check
pnpm check
```

### Commit Messages

Use clear, descriptive commit messages:

```bash
# Good examples
git commit -m "feat: add dark mode toggle component"
git commit -m "fix: resolve form validation edge case"
git commit -m "docs: update installation instructions"
git commit -m "test: add unit tests for auth service"

# Types: feat, fix, docs, style, refactor, test, chore
```

### Testing Requirements

- **Unit Tests**: All new components and utilities must have tests
- **E2E Tests**: Add E2E tests for new user workflows
- **Type Safety**: Ensure full TypeScript coverage

```bash
# Run all tests before submitting
pnpm test
pnpm test:e2e
pnpm lint
```

## 🔧 Project Structure Guidelines

### Adding New Components

```typescript
// src/components/MyComponent.tsx
import styled from "styled-components";

interface MyComponentProps {
  title: string;
  optional?: boolean;
}

export const MyComponent = ({ title, optional = false }: MyComponentProps) => {
  return (
    <Container>
      <h2>{title}</h2>
      {optional && <p>Optional content</p>}
    </Container>
  );
};

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;
```

### Adding Tests

```typescript
// src/components/__tests__/MyComponent.test.tsx
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme";
import { MyComponent } from "../MyComponent";

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe("MyComponent", () => {
  it("renders with title", () => {
    renderWithTheme(<MyComponent title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });
});
```

### Adding New Pages

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link if needed
4. Add E2E test for the page

## 📋 Pull Request Process

### 1. Before Submitting

- [ ] Tests pass (`pnpm test` and `pnpm test:e2e`)
- [ ] Code is properly formatted (`pnpm check`)
- [ ] TypeScript compiles without errors
- [ ] Documentation is updated if needed

### 2. PR Description Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Screenshots (if applicable)

Add screenshots for UI changes

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Tests pass
- [ ] Documentation updated
```

### 3. Review Process

- Maintainers will review your PR
- Address feedback promptly
- Keep PRs focused and atomic
- Be patient and respectful

## 🐛 Reporting Issues

### Bug Reports

Use our bug report template and include:

- **Environment**: OS, Node version, browser
- **Steps to reproduce**: Clear, numbered steps
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Console errors** if any

### Feature Requests

- Describe the problem you're trying to solve
- Explain your proposed solution
- Consider alternative solutions
- Check if it fits the project's scope

## 🤝 Community Guidelines

- **Be respectful** and inclusive
- **Help others** learn and grow
- **Give constructive feedback**
- **Follow the code of conduct**

## 🙋‍♂️ Questions?

- Check existing [Issues](https://github.com/yourusername/react-typescript-boilerplate/issues)
- Join our [Discussions](https://github.com/yourusername/react-typescript-boilerplate/discussions)
- Ask in the community chat

## 🎉 Recognition

Contributors will be:

- Added to the contributors list
- Mentioned in release notes
- Given credit in documentation

Thank you for helping make this project better! 🚀
