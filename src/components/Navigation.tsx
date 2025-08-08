import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '../store';
import { Button, Flex, Text, Container } from '../styles/components';

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  padding: ${({ theme }) => theme.spacing.md} 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const NavLink = styled(Link)<{ isActive: boolean }>`
  text-decoration: none;
  color: ${({ theme, isActive }) => (isActive ? theme.colors.primary : theme.colors.gray[600])};
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  ${({ isActive, theme }) =>
    isActive &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: -${theme.spacing.md};
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      background-color: ${theme.colors.primary};
      border-radius: 50%;
    }
  `}
`;

const Logo = styled(Text)`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.primary};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background-color: ${({ theme }) => theme.colors.gray[100]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const Navigation: React.FC = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/todos', label: 'Todos' },
    { path: '/launches', label: 'SpaceX' },
    { path: '/about', label: 'About' },
  ];

  const handleLogout = () => {
    logout();
  };

  // Mock login for demo purposes
  const handleLogin = () => {
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    };
    useAuthStore.getState().login(mockUser);
  };

  return (
    <Nav role="navigation" aria-label="Main navigation">
      <Container>
        <Flex align="center" justify="space-between">
          <Flex align="center" gap="xl">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Logo>React Starter</Logo>
            </Link>

            <Flex gap="sm" role="menubar">
              {navItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  isActive={location.pathname === item.path}
                  role="menuitem"
                >
                  {item.label}
                </NavLink>
              ))}
            </Flex>
          </Flex>

          <Flex align="center" gap="md">
            {isAuthenticated && user ? (
              <>
                <UserInfo>
                  <Text size="sm" weight="medium">
                    {user.name}
                  </Text>
                  <Text size="xs" color="muted">
                    {user.email}
                  </Text>
                </UserInfo>
                <Button variant="secondary" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="primary" size="sm" onClick={handleLogin}>
                Login (Demo)
              </Button>
            )}
          </Flex>
        </Flex>
      </Container>
    </Nav>
  );
};
