import React, { useState } from 'react';
import styled from 'styled-components';
import { useTodoStore } from '../store';
import { Button, Input, Flex, Text } from '../styles/components';

const Form = styled.form`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ErrorMessage = styled(Text)`
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

interface TodoFormProps {
  className?: string;
}

export const TodoForm: React.FC<TodoFormProps> = ({ className }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const { addTodo } = useTodoStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedText = text.trim();
    if (!trimmedText) {
      setError('Please enter a todo item');
      return;
    }

    if (trimmedText.length < 3) {
      setError('Minimum 3 characters required');
      return;
    }

    if (trimmedText.length > 100) {
      setError('Maximum 100 characters allowed');
      return;
    }

    addTodo(trimmedText);
    setText('');
    setError('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  };

  return (
    <Form onSubmit={handleSubmit} className={className}>
      <Flex gap="md" align="flex-start">
        <div style={{ flex: 1 }}>
          <Input
            type="text"
            value={text}
            onChange={handleChange}
            placeholder="What do you need to do?"
            error={!!error}
            aria-label="New todo item"
            aria-describedby={error ? 'todo-error' : undefined}
          />
          {error && (
            <ErrorMessage id="todo-error" color="danger" size="sm" role="alert">
              {error}
            </ErrorMessage>
          )}
        </div>
        <Button type="submit" variant="primary">
          Add Todo
        </Button>
      </Flex>
    </Form>
  );
};
