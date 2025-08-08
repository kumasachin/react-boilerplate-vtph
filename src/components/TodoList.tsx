import React from 'react';
import styled from 'styled-components';
import { useTodoStore, type Todo } from '../store';
import { Button, Flex, Text } from '../styles/components';

const TodoItem = styled.div<{ completed: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme, completed }) =>
    completed ? theme.colors.gray[100] : theme.colors.white};
  opacity: ${({ completed }) => (completed ? 0.7 : 1)};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.gray[300]};
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const TodoText = styled(Text)<{ completed: boolean }>`
  flex: 1;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
`;

interface TodoComponentProps {
  todo: Todo;
}

export const TodoComponent: React.FC<TodoComponentProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useTodoStore();

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  return (
    <TodoItem completed={todo.completed} role="listitem">
      <Checkbox
        checked={todo.completed}
        onChange={handleToggle}
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      <TodoText completed={todo.completed}>{todo.text}</TodoText>
      <Text size="xs" color="muted">
        {new Date(todo.createdAt).toLocaleDateString()}
      </Text>
      <Button
        variant="danger"
        size="sm"
        onClick={handleDelete}
        aria-label={`Delete "${todo.text}"`}
      >
        Delete
      </Button>
    </TodoItem>
  );
};

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FilterButtons = styled(Flex)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

interface TodoListProps {
  className?: string;
}

export const TodoList: React.FC<TodoListProps> = ({ className }) => {
  const { todos, filter, setFilter, clearCompleted } = useTodoStore();

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className={className}>
      <FilterButtons gap="sm" align="center" justify="space-between">
        <Flex gap="sm">
          <Button
            variant={filter === 'all' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All ({todos.length})
          </Button>
          <Button
            variant={filter === 'active' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('active')}
          >
            Active ({activeCount})
          </Button>
          <Button
            variant={filter === 'completed' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter('completed')}
          >
            Completed ({completedCount})
          </Button>
        </Flex>
        {completedCount > 0 && (
          <Button variant="secondary" size="sm" onClick={clearCompleted}>
            Clear Completed
          </Button>
        )}
      </FilterButtons>

      <TodoListContainer role="list" aria-label="Todo list">
        {filteredTodos.length === 0 ? (
          <Text color="muted">
            {filter === 'all' ? 'No todos yet. Add one above!' : `No ${filter} todos.`}
          </Text>
        ) : (
          filteredTodos.map(todo => <TodoComponent key={todo.id} todo={todo} />)
        )}
      </TodoListContainer>
    </div>
  );
};
