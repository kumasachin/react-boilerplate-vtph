import { describe, it, expect, beforeEach } from 'vitest';
import { useTodoStore, useAuthStore } from '../index';

describe('Todo Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useTodoStore.setState({
      todos: [],
      filter: 'all',
    });

    // Clear any persistence
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
    }
  });

  it('should initialize with empty todos', () => {
    const { todos, filter } = useTodoStore.getState();
    expect(todos).toEqual([]);
    expect(filter).toBe('all');
  });

  it('should add a new todo', () => {
    const { addTodo } = useTodoStore.getState();
    addTodo('Test todo');

    const { todos } = useTodoStore.getState();
    expect(todos).toHaveLength(1);
    expect(todos[0].text).toBe('Test todo');
    expect(todos[0].completed).toBe(false);
    expect(todos[0].id).toBeDefined();
    expect(todos[0].createdAt).toBeInstanceOf(Date);
  });

  it('should toggle todo completion', () => {
    const { addTodo, toggleTodo } = useTodoStore.getState();
    addTodo('Test todo');

    const { todos } = useTodoStore.getState();
    const todoId = todos[0].id;

    toggleTodo(todoId);

    const { todos: updatedTodos } = useTodoStore.getState();
    expect(updatedTodos[0].completed).toBe(true);

    // Toggle again
    toggleTodo(todoId);

    const { todos: finalTodos } = useTodoStore.getState();
    expect(finalTodos[0].completed).toBe(false);
  });

  it('should delete a todo', () => {
    const { addTodo, deleteTodo } = useTodoStore.getState();
    addTodo('Test todo');

    const { todos } = useTodoStore.getState();
    const todoId = todos[0].id;

    deleteTodo(todoId);

    const { todos: updatedTodos } = useTodoStore.getState();
    expect(updatedTodos).toHaveLength(0);
  });

  it('should set filter', () => {
    const { setFilter } = useTodoStore.getState();

    setFilter('active');
    expect(useTodoStore.getState().filter).toBe('active');

    setFilter('completed');
    expect(useTodoStore.getState().filter).toBe('completed');

    setFilter('all');
    expect(useTodoStore.getState().filter).toBe('all');
  });

  it('should clear completed todos', () => {
    // Start fresh
    useTodoStore.setState({ todos: [], filter: 'all' });

    const { addTodo, toggleTodo, clearCompleted } = useTodoStore.getState();

    // Add todos one by one to ensure unique IDs
    addTodo('Todo 1');
    addTodo('Todo 2');
    addTodo('Todo 3');

    const state = useTodoStore.getState();
    expect(state.todos).toHaveLength(3);

    // Get the actual IDs from the store
    const todo1Id = state.todos[0].id;
    const todo3Id = state.todos[2].id;

    // Complete first and third todos using actual IDs
    toggleTodo(todo1Id);
    toggleTodo(todo3Id);

    // Verify completions
    const stateAfterToggle = useTodoStore.getState();
    expect(stateAfterToggle.todos.find(t => t.id === todo1Id)?.completed).toBe(true);
    expect(stateAfterToggle.todos[1].completed).toBe(false);
    expect(stateAfterToggle.todos.find(t => t.id === todo3Id)?.completed).toBe(true);

    // Clear completed
    clearCompleted();

    const { todos: remainingTodos } = useTodoStore.getState();
    expect(remainingTodos).toHaveLength(1);
    expect(remainingTodos[0].text).toBe('Todo 2');
    expect(remainingTodos[0].completed).toBe(false);
  });
});

describe('Auth Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  });

  it('should initialize with no user', () => {
    const { user, isAuthenticated, isLoading } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(isAuthenticated).toBe(false);
    expect(isLoading).toBe(false);
  });

  it('should login user', () => {
    const { login } = useAuthStore.getState();
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    };

    login(mockUser);

    const { user, isAuthenticated, isLoading } = useAuthStore.getState();
    expect(user).toEqual(mockUser);
    expect(isAuthenticated).toBe(true);
    expect(isLoading).toBe(false);
  });

  it('should logout user', () => {
    const { login, logout } = useAuthStore.getState();
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    };

    // First login
    login(mockUser);
    expect(useAuthStore.getState().isAuthenticated).toBe(true);

    // Then logout
    logout();

    const { user, isAuthenticated, isLoading } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(isAuthenticated).toBe(false);
    expect(isLoading).toBe(false);
  });

  it('should set loading state', () => {
    const { setLoading } = useAuthStore.getState();

    setLoading(true);
    expect(useAuthStore.getState().isLoading).toBe(true);

    setLoading(false);
    expect(useAuthStore.getState().isLoading).toBe(false);
  });
});
