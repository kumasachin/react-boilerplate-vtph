import React from 'react';
import { Container, Heading } from '../styles/components';
import { TodoForm } from '../components/TodoForm';
import { TodoList } from '../components/TodoList';

export const TodosPage: React.FC = () => {
  return (
    <Container>
      <div style={{ padding: '32px 0' }}>
        <Heading level={1} style={{ marginBottom: '32px', textAlign: 'center' }}>
          Todo Application
        </Heading>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <TodoForm />
          <TodoList />
        </div>
      </div>
    </Container>
  );
};
