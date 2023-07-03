export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}

export type TodoContextType = {
  deleteTodo: (id: number) => void;
  addTodo: (e: React.FormEvent) => void;
  todo: string;
  setTodo: (todo: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  activeTodos: Todo[];
  setActiveTodos: (todos: Todo[]) => void;
  completedTodos: Todo[];
  setCompletedTodos: (todos: Todo[]) => void;
  screenWidth: number;
};

export type ThemeContextType = {
  theme: string;
  handleToggleChange: () => void;
};
