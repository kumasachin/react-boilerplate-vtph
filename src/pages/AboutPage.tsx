import React from 'react';
import styled from 'styled-components';
import { Container, Heading, Text, Card, Flex } from '../styles/components';

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
  { name: 'React 18', description: 'The latest and greatest React' },
  { name: 'TypeScript', description: 'JavaScript that actually works' },
  { name: 'Vite', description: 'Build tool that doesn&apos;t suck' },
  { name: 'Styled Components', description: 'CSS that lives with your components' },
  { name: 'Zustand', description: 'State management without Redux drama' },
  { name: 'React Router', description: 'Navigation that just works' },
  { name: 'Apollo Client', description: 'GraphQL made easy' },
  { name: 'Vitest', description: 'Tests that run fast' },
  { name: 'Playwright', description: 'E2E testing across browsers' },
  { name: 'ESLint', description: 'Keeps your code clean' },
  { name: 'Husky', description: 'Git hooks that enforce quality' },
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
            A React template that doesn&apos;t waste your time
          </Text>
        </AboutSection>

        <AboutSection>
          <Card padding="lg">
            <Heading level={2} style={{ marginBottom: '16px' }}>
              🎯 Why This Exists
            </Heading>
            <Text style={{ marginBottom: '16px' }}>
              I got tired of setting up the same tools over and over again for every React project.
              This template has everything configured and ready to go - TypeScript, testing,
              linting, styling, state management, the works.
            </Text>
            <Text>
              No more spending hours on boilerplate. Just clone, install, and start building your
              actual app.
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
