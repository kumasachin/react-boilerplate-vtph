import React from 'react';
import { Container, Heading } from '../styles/components';
import { Launches } from '../components/Launches';

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
