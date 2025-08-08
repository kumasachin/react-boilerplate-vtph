import React from 'react';
import styled from 'styled-components';

const VersionContainer = styled.div`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.gray[100]};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  font-family: ${({ theme }) => theme.fonts.mono};
  opacity: 0.7;
  transition: opacity ${({ theme }) => theme.transitions.fast};
  z-index: 1000;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const VersionLink = styled.a`
  color: ${({ theme }) => theme.colors.gray[600]};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.xs};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

interface VersionProps {
  className?: string;
}

export const Version: React.FC<VersionProps> = ({ className }) => {
  // Get version from package.json (this will be replaced by Vite)
  const version = import.meta.env.VITE_APP_VERSION || '1.0.0';
  const buildTime = import.meta.env.VITE_BUILD_TIME || new Date().toISOString();

  return (
    <VersionContainer className={className}>
      <VersionLink
        href={`https://github.com/kumasachin/react-boilerplate-vtph/releases/tag/v${version}`}
        target="_blank"
        rel="noopener noreferrer"
        title={`Built on ${new Date(buildTime).toLocaleString()}`}
      >
        v{version}
      </VersionLink>
    </VersionContainer>
  );
};
