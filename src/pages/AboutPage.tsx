import type React from 'react';
import styled from 'styled-components';
import { Card, Container, Flex, Heading, Text } from '../styles/components';

const AboutSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const TechList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const TechItem = styled.li`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.gray[100]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
`;

const CodeBlock = styled.pre`
  background-color: ${({ theme }) => theme.colors.gray[900]};
  color: ${({ theme }) => theme.colors.gray[100]};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow-x: auto;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const technologies = [
  { name: 'React 18', description: 'Modern React with concurrent features' },
  { name: 'TypeScript', description: 'Static type checking for JavaScript' },
  { name: 'Vite', description: 'Fast build tool and development server' },
  { name: 'Styled Components', description: 'CSS-in-JS styling solution' },
  { name: 'Zustand', description: 'Lightweight state management' },
  { name: 'React Router', description: 'Declarative routing for React' },
  { name: 'Apollo Client', description: 'GraphQL client with caching' },
  { name: 'Vitest', description: 'Fast unit testing framework' },
  { name: 'Playwright', description: 'Cross-browser end-to-end testing' },
  { name: 'ESLint', description: 'JavaScript linting utility' },
  { name: 'Husky', description: 'Git hooks for code quality' },
];

export const AboutPage: React.FC = () => {
  return (
    <Container>
      <div style={{ padding: '32px 0' }}>
        <AboutSection>
          <Heading level={1} style={{ marginBottom: '24px', textAlign: 'center' }}>
            About This Starter
          </Heading>
          <Text size="lg" style={{ textAlign: 'center', marginBottom: '48px' }}>
            A modern React template with TypeScript and developer tools
          </Text>
        </AboutSection>

        <AboutSection>
          <Card padding="lg">
            <Heading level={2} style={{ marginBottom: '16px' }}>
              🎯 Project Overview
            </Heading>
            <Text style={{ marginBottom: '16px' }}>
              This starter template provides a foundation for building React applications with
              modern tools and best practices. It includes TypeScript for type safety, testing
              frameworks for quality assurance, and development tools for productivity.
            </Text>
            <Text>
              The template is configured with common patterns and conventions to help you start
              building your application immediately.
            </Text>
          </Card>
        </AboutSection>

        <AboutSection>
          <Heading level={2} style={{ marginBottom: '24px' }}>
            🛠️ What&apos;s Included
          </Heading>
          <TechList>
            {technologies.map(tech => (
              <TechItem key={tech.name}>
                <Text weight="semibold" style={{ marginBottom: '4px' }}>
                  {tech.name}
                </Text>
                <Text size="sm" color="muted">
                  {tech.description}
                </Text>
              </TechItem>
            ))}
          </TechList>
        </AboutSection>

        <AboutSection>
          <Card padding="lg">
            <Heading level={2} style={{ marginBottom: '16px' }}>
              🚀 Getting Started
            </Heading>
            <Text style={{ marginBottom: '16px' }}>
              Get started with this template in just a few commands:
            </Text>
            <CodeBlock>
              {`# Clone the repository
git clone <repository-url>
cd react-boilerplate

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run e2e tests
npm run test:e2e

# Build for production
npm run build`}
            </CodeBlock>
          </Card>
        </AboutSection>

        <AboutSection>
          <Flex gap="lg">
            <Card style={{ flex: 1 }}>
              <Heading level={3} style={{ marginBottom: '16px' }}>
                ✅ Testing Strategy
              </Heading>
              <Text style={{ marginBottom: '12px' }}>
                <strong>Unit Tests:</strong> Vitest + React Testing Library
              </Text>
              <Text style={{ marginBottom: '12px' }}>
                <strong>E2E Tests:</strong> Playwright for cross-browser testing
              </Text>
              <Text>
                <strong>Accessibility:</strong> Jest-Axe for automated a11y testing
              </Text>
            </Card>

            <Card style={{ flex: 1 }}>
              <Heading level={3} style={{ marginBottom: '16px' }}>
                🎨 Styling Approach
              </Heading>
              <Text style={{ marginBottom: '12px' }}>
                <strong>CSS-in-JS:</strong> Styled Components with theming
              </Text>
              <Text style={{ marginBottom: '12px' }}>
                <strong>Design System:</strong> Consistent spacing, colors, and typography
              </Text>
              <Text>
                <strong>Responsive:</strong> Mobile-first responsive design
              </Text>
            </Card>
          </Flex>
        </AboutSection>

        <AboutSection>
          <Card padding="lg">
            <Heading level={2} style={{ marginBottom: '16px' }}>
              🔧 Development Features
            </Heading>
            <Flex gap="lg">
              <div style={{ flex: 1 }}>
                <Text weight="semibold" style={{ marginBottom: '8px' }}>
                  Code Quality
                </Text>
                <ul>
                  <li>ESLint for code linting</li>
                  <li>Prettier for code formatting</li>
                  <li>Husky for pre-commit hooks</li>
                  <li>TypeScript strict mode</li>
                </ul>
              </div>
              <div style={{ flex: 1 }}>
                <Text weight="semibold" style={{ marginBottom: '8px' }}>
                  Developer Experience
                </Text>
                <ul>
                  <li>Hot module replacement</li>
                  <li>Fast build times with Vite</li>
                  <li>Integrated testing tools</li>
                  <li>VS Code extensions ready</li>
                </ul>
              </div>
            </Flex>
          </Card>
        </AboutSection>

        <AboutSection>
          <Card padding="lg" style={{ textAlign: 'center' }}>
            <Heading level={2} style={{ marginBottom: '16px' }}>
              🤝 Contributing
            </Heading>
            <Text style={{ marginBottom: '16px' }}>
              This template is designed to be extensible and customizable. Feel free to modify it
              according to your project needs.
            </Text>
            <Text color="muted">
              For questions or suggestions, please refer to the project documentation or open an
              issue in the repository.
            </Text>
          </Card>
        </AboutSection>
      </div>
    </Container>
  );
};
