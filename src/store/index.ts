import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    set => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: (user: User) =>
        set(
          {
            user,
            isAuthenticated: true,
            isLoading: false,
          },
          false,
          'auth/login'
        ),
      logout: () =>
        set(
          {
            user: null,
            isAuthenticated: false,
            isLoading: false,
          },
          false,
          'auth/logout'
        ),
      setLoading: (isLoading: boolean) => set({ isLoading }, false, 'auth/setLoading'),
    }),
    {
      name: 'auth-store',
    }
  )
);

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  clearCompleted: () => void;
}

export const useTodoStore = create<TodoState>()(
  devtools(
    set => ({
      todos: [],
      filter: 'all',
      addTodo: (text: string) =>
        set(
          state => ({
            todos: [
              ...state.todos,
              {
                id: `${Date.now()}-${Math.random()}`,
                text,
                completed: false,
                createdAt: new Date(),
              },
            ],
          }),
          false,
          'todos/add'
        ),
      toggleTodo: (id: string) =>
        set(
          state => ({
            todos: state.todos.map(todo =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
          }),
          false,
          'todos/toggle'
        ),
      deleteTodo: (id: string) =>
        set(
          state => ({
            todos: state.todos.filter(todo => todo.id !== id),
          }),
          false,
          'todos/delete'
        ),
      setFilter: (filter: 'all' | 'active' | 'completed') =>
        set({ filter }, false, 'todos/setFilter'),
      clearCompleted: () =>
        set(
          state => ({
            todos: state.todos.filter(todo => !todo.completed),
          }),
          false,
          'todos/clearCompleted'
        ),
    }),
    {
      name: 'todo-store',
    }
  )
);
