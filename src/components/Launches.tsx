import { useQuery } from '@apollo/client';
import type React from 'react';
import styled from 'styled-components';
import { GET_LAUNCHES } from '../graphql/queries';
import type { GetLaunchesData, GetLaunchesVariables } from '../graphql/types';
import { Card, Flex, Heading, Spinner, Text } from '../styles/components';

const LaunchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const LaunchCard = styled(Card)<{ success?: boolean | null }>`
  border-left: 4px solid
    ${({ theme, success }) => {
      if (success === true) return theme.colors.success;
      if (success === false) return theme.colors.danger;
      return theme.colors.gray[300];
    }};
`;

const MissionPatch = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

interface LaunchesProps {
  limit?: number;
}

export const Launches: React.FC<LaunchesProps> = ({ limit = 12 }) => {
  const { loading, error, data, refetch } = useQuery<GetLaunchesData, GetLaunchesVariables>(
    GET_LAUNCHES,
    {
      variables: { limit },
      errorPolicy: 'all',
    }
  );

  if (loading) {
    return (
      <LoadingContainer>
        <Flex direction="column" align="center" gap="md">
          <Spinner size="lg" />
          <Text>Loading SpaceX launches...</Text>
        </Flex>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <Heading level={3} color="primary">
          Failed to Load Data
        </Heading>
        <Text style={{ color: 'inherit', marginTop: '8px' }}>{error.message}</Text>
        <button
          type="button"
          onClick={() => refetch()}
          style={{
            marginTop: '16px',
            padding: '8px 16px',
            backgroundColor: 'transparent',
            border: '1px solid white',
            color: 'white',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Try Again
        </button>
      </ErrorContainer>
    );
  }

  const launches = data?.launches || [];

  return (
    <div>
      <Flex align="center" justify="space-between">
        <Heading level={2}>Recent SpaceX Launches</Heading>
        <Text color="muted">{launches.length} launches loaded</Text>
      </Flex>

      <LaunchGrid>
        {launches.map(launch => (
          <LaunchCard
            as="article"
            key={launch.id}
            success={launch.launch_success ?? null}
            aria-label={`Launch: ${launch.mission_name}`}
          >
            <Flex gap="md" align="flex-start">
              {launch.links.mission_patch_small && (
                <MissionPatch
                  src={launch.links.mission_patch_small}
                  alt={`${launch.mission_name} mission patch`}
                />
              )}
              <div style={{ flex: 1 }}>
                <Heading level={4} style={{ marginBottom: '8px' }}>
                  {launch.mission_name}
                </Heading>
                <Text size="sm" color="muted" style={{ marginBottom: '4px' }}>
                  {new Date(launch.launch_date_local).toLocaleDateString()}
                </Text>
                <Text size="sm" style={{ marginBottom: '8px' }}>
                  Rocket: {launch.rocket.rocket_name} ({launch.rocket.rocket_type})
                </Text>
                <Flex gap="sm" align="center">
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor:
                        launch.launch_success === true
                          ? '#28a745'
                          : launch.launch_success === false
                            ? '#dc3545'
                            : '#6c757d',
                    }}
                    aria-hidden="true"
                  />
                  <Text size="sm" color="muted">
                    {launch.launch_success === true
                      ? 'Success'
                      : launch.launch_success === false
                        ? 'Failed'
                        : 'Unknown'}
                  </Text>
                </Flex>
                {launch.links.wikipedia && (
                  <a
                    href={launch.links.wikipedia}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '14px',
                      color: '#007bff',
                      textDecoration: 'none',
                      marginTop: '8px',
                      display: 'inline-block',
                    }}
                  >
                    Learn more →
                  </a>
                )}
              </div>
            </Flex>
          </LaunchCard>
        ))}
      </LaunchGrid>
    </div>
  );
};
