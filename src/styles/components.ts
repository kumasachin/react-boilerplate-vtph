import styled from 'styled-components';
import type { Theme } from './theme';

// Button component with variants
export const Button = styled.button<{
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }: { theme: Theme }) => theme.spacing.sm};
  padding: ${({ theme, size = 'md' }) => {
    const sizes = {
      sm: `${theme.spacing.sm} ${theme.spacing.md}`,
      md: `${theme.spacing.md} ${theme.spacing.lg}`,
      lg: `${theme.spacing.lg} ${theme.spacing.xl}`,
    };
    return sizes[size];
  }};
  font-size: ${({ theme, size = 'md' }) => {
    const sizes = {
      sm: theme.fontSizes.sm,
      md: theme.fontSizes.md,
      lg: theme.fontSizes.lg,
    };
    return sizes[size];
  }};
  font-weight: 500;
  font-family: ${({ theme }) => theme.fonts.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  background-color: ${({ theme, variant = 'primary' }) => {
    const variants = {
      primary: theme.colors.primary,
      secondary: theme.colors.secondary,
      success: theme.colors.success,
      danger: theme.colors.danger,
    };
    return variants[variant];
  }};

  color: ${({ theme, variant = 'primary' }) => {
    return variant === 'secondary' ? theme.colors.dark : theme.colors.white;
  }};

  &:hover:not(:disabled) {
    background-color: ${({ theme, variant = 'primary' }) => {
      const variants = {
        primary: theme.colors.primaryHover,
        secondary: theme.colors.gray[600],
        success: '#1e7e34',
        danger: '#c82333',
      };
      return variants[variant];
    }};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

// Input component
export const Input = styled.input.withConfig({
  shouldForwardProp: prop => prop !== 'error',
})<{
  error?: boolean;
}>`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.primary};
  border: 2px solid ${({ theme, error }) => (error ? theme.colors.danger : theme.colors.gray[300])};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.white};
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme, error }) => (error ? theme.colors.danger : theme.colors.primary)};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[500]};
  }
`;

// Card component
export const Card = styled.div<{
  padding?: 'sm' | 'md' | 'lg';
}>`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  padding: ${({ theme, padding = 'md' }) => {
    const paddings = {
      sm: theme.spacing.md,
      md: theme.spacing.lg,
      lg: theme.spacing.xl,
    };
    return paddings[padding];
  }};
  transition: box-shadow ${({ theme }) => theme.transitions.normal};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

// Container component
export const Container = styled.div<{
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}>`
  width: 100%;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  max-width: ${({ maxWidth = 'lg' }) => {
    const maxWidths = {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    };
    return maxWidths[maxWidth];
  }};
`;

// Flex components
export const Flex = styled.div<{
  direction?: 'row' | 'column';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
}>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  align-items: ${({ align = 'stretch' }) => align};
  justify-content: ${({ justify = 'flex-start' }) => justify};
  gap: ${({ theme, gap = 'md' }) => theme.spacing[gap]};
  flex-wrap: ${({ wrap }) => (wrap ? 'wrap' : 'nowrap')};
`;

// Text components
export const Text = styled.p<{
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'dark' | 'muted';
}>`
  margin: 0;
  font-size: ${({ theme, size = 'md' }) => theme.fontSizes[size]};
  font-weight: ${({ weight = 'normal' }) => {
    const weights = {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    };
    return weights[weight];
  }};
  color: ${({ theme, color = 'dark' }) => {
    const colors = {
      primary: theme.colors.primary,
      secondary: theme.colors.secondary,
      success: theme.colors.success,
      danger: theme.colors.danger,
      dark: theme.colors.dark,
      muted: theme.colors.gray[600],
    };
    return colors[color];
  }};
  font-family: ${({ theme }) => theme.fonts.primary};
`;

export const Heading = styled.h1<{
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  color?: 'primary' | 'secondary' | 'dark';
}>`
  margin: 0;
  font-weight: 600;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme, color = 'dark' }) => {
    const colors = {
      primary: theme.colors.primary,
      secondary: theme.colors.secondary,
      dark: theme.colors.dark,
    };
    return colors[color];
  }};
  font-size: ${({ theme, level = 1 }) => {
    const sizes = {
      1: theme.fontSizes['5xl'],
      2: theme.fontSizes['4xl'],
      3: theme.fontSizes['3xl'],
      4: theme.fontSizes['2xl'],
      5: theme.fontSizes.xl,
      6: theme.fontSizes.lg,
    };
    return sizes[level];
  }};
`;

// Loading spinner
export const Spinner = styled.div<{
  size?: 'sm' | 'md' | 'lg';
}>`
  width: ${({ size = 'md' }) => {
    const sizes = { sm: '16px', md: '24px', lg: '32px' };
    return sizes[size];
  }};
  height: ${({ size = 'md' }) => {
    const sizes = { sm: '16px', md: '24px', lg: '32px' };
    return sizes[size];
  }};
  border: 2px solid ${({ theme }) => theme.colors.gray[200]};
  border-top: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
