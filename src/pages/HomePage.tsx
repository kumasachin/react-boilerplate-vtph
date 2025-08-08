import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container, Heading, Text, Button, Card, Flex, Spinner } from '../styles/components';
import { useAuthStore, useTodoStore } from '../store';

const Hero = styled.section`
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing['3xl']} 0`};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin: ${({ theme }) => theme.spacing['2xl']} 0;
`;

const FeatureCard = styled(Card)`
  text-align: center;
  transition: transform ${({ theme }) => theme.transitions.normal};

  &:hover {
    transform: translateY(-4px);
  }
`;

const TechBadge = styled.span`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  margin: ${({ theme }) => `0 ${theme.spacing.xs} ${theme.spacing.xs} 0`};
`;

const StatsCard = styled(Card)`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.success} 0%,
    ${({ theme }) => theme.colors.info} 100%
  );
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

const ComponentDemo = styled.section`
  margin: ${({ theme }) => theme.spacing['2xl']} 0;
`;

const features = [
  {
    title: '⚡ Actually Fast',
    description: 'Vite makes builds instant. No more coffee breaks while you wait.',
    techs: ['Vite', 'TypeScript', 'React 18'],
  },
  {
    title: '🧪 Tests That Work',
    description: 'Unit tests, e2e tests, and accessibility tests. Because broken software sucks.',
    techs: ['Vitest', 'Playwright'],
  },
  {
    title: '🎨 Styled Components',
    description: 'Modern CSS-in-JS with a comprehensive theme system.',
    techs: ['Styled Components', 'Design System'],
  },
  {
    title: '🔄 State Management',
    description: 'Zustand provides simple and effective state management.',
    techs: ['Zustand', 'TypeScript'],
  },
  {
    title: '🌐 GraphQL Ready',
    description: 'Apollo Client configured for GraphQL data fetching.',
    techs: ['Apollo Client', 'GraphQL'],
  },
  {
    title: '♿ Accessibility',
    description: 'Built with accessibility standards and best practices.',
    techs: ['ARIA', 'Keyboard Navigation'],
  },
];

export const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const { todos } = useTodoStore();

  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = todos.length - completedTodos;

  return (
    <>
      <Hero>
        <Container>
          <Heading level={1} style={{ marginBottom: '24px', color: 'inherit' }}>
            React Starter Kit
          </Heading>
          <Text size="xl" style={{ marginBottom: '32px', color: 'inherit', opacity: 0.9 }}>
            A modern React template with TypeScript, testing, and developer tools
          </Text>
          <Flex gap="md" justify="center">
            <Button as={Link} to="/todos" variant="secondary" size="lg">
              Try the Todo Demo
            </Button>
            <Button as={Link} to="/launches" variant="primary" size="lg">
              SpaceX Data
            </Button>
          </Flex>
        </Container>
      </Hero>

      <Container>
        {isAuthenticated && user && (
          <StatsCard style={{ marginBottom: '48px' }}>
            <Heading level={3} style={{ marginBottom: '16px', color: 'inherit' }}>
              Hey {user.name}! 👋
            </Heading>
            <Flex gap="xl" justify="center">
              <div>
                <Text size="xl" weight="bold" style={{ color: 'inherit' }}>
                  {todos.length}
                </Text>
                <Text size="sm" style={{ color: 'inherit', opacity: 0.9 }}>
                  Total
                </Text>
              </div>
              <div>
                <Text size="xl" weight="bold" style={{ color: 'inherit' }}>
                  {activeTodos}
                </Text>
                <Text size="sm" style={{ color: 'inherit', opacity: 0.9 }}>
                  To Do
                </Text>
              </div>
              <div>
                <Text size="xl" weight="bold" style={{ color: 'inherit' }}>
                  {completedTodos}
                </Text>
                <Text size="sm" style={{ color: 'inherit', opacity: 0.9 }}>
                  Done
                </Text>
              </div>
            </Flex>
          </StatsCard>
        )}

        <section>
          <Heading level={2} style={{ textAlign: 'center', marginBottom: '48px' }}>
            Features & Technologies
          </Heading>

          <FeatureGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <Heading level={4} style={{ marginBottom: '16px' }}>
                  {feature.title}
                </Heading>
                <Text style={{ marginBottom: '16px' }}>{feature.description}</Text>
                <div>
                  {feature.techs.map(tech => (
                    <TechBadge key={tech}>{tech}</TechBadge>
                  ))}
                </div>
              </FeatureCard>
            ))}
          </FeatureGrid>
        </section>

        <ComponentDemo>
          <Heading level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
            Component Showcase
          </Heading>

          <FeatureGrid>
            <Card>
              <Heading level={4} style={{ marginBottom: '16px' }}>
                Buttons & Loading States
              </Heading>
              <Flex gap="sm" wrap>
                <Button variant="primary" size="sm">
                  Primary
                </Button>
                <Button variant="secondary" size="sm">
                  Secondary
                </Button>
                <Button variant="success" size="sm">
                  Success
                </Button>
                <Button variant="danger" size="sm">
                  Danger
                </Button>
              </Flex>
              <div style={{ marginTop: '16px' }}>
                <Flex gap="md" align="center">
                  <Spinner size="sm" />
                  <Text size="sm">Loading...</Text>
                </Flex>
              </div>
            </Card>

            <Card>
              <Heading level={4} style={{ marginBottom: '16px' }}>
                Typography System
              </Heading>
              <Heading level={5} style={{ marginBottom: '8px' }}>
                Heading 5
              </Heading>
              <Heading level={6} style={{ marginBottom: '8px' }}>
                Heading 6
              </Heading>
              <Text style={{ marginBottom: '8px' }}>Regular text</Text>
              <Text size="sm" color="muted">
                Small muted text
              </Text>
              <Text weight="bold" color="primary">
                Bold primary text
              </Text>
            </Card>

            <Card>
              <Heading level={4} style={{ marginBottom: '16px' }}>
                Color Palette
              </Heading>
              <Flex gap="sm" wrap>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#007bff',
                    borderRadius: '4px',
                  }}
                  title="Primary"
                />
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#28a745',
                    borderRadius: '4px',
                  }}
                  title="Success"
                />
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#dc3545',
                    borderRadius: '4px',
                  }}
                  title="Danger"
                />
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#ffc107',
                    borderRadius: '4px',
                  }}
                  title="Warning"
                />
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#17a2b8',
                    borderRadius: '4px',
                  }}
                  title="Info"
                />
              </Flex>
            </Card>
          </FeatureGrid>
        </ComponentDemo>

        <section style={{ textAlign: 'center', padding: '48px 0' }}>
          <Heading level={2} style={{ marginBottom: '16px' }}>
            Get Started
          </Heading>
          <Text style={{ marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            This template provides everything you need to build modern React applications. Start
            developing your next project right away.
          </Text>
          <Flex gap="md" justify="center">
            <Button as={Link} to="/todos" variant="primary" size="lg">
              Try the Todo App
            </Button>
            <Button as={Link} to="/about" variant="secondary" size="lg">
              Learn More
            </Button>
          </Flex>
        </section>
      </Container>
    </>
  );
};
