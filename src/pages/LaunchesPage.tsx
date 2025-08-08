import type React from 'react';
import { Launches } from '../components/Launches';
import { Container, Heading } from '../styles/components';

export const LaunchesPage: React.FC = () => {
  return (
    <Container>
      <div style={{ padding: '32px 0' }}>
        <Heading level={1} style={{ marginBottom: '16px', textAlign: 'center' }}>
          SpaceX Launches
        </Heading>
        <Launches limit={24} />
      </div>
    </Container>
  );
};
