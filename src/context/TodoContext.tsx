/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { TodoContextType, Todo } from "../model";

const TodoContext = createContext<TodoContextType | null>(null);
type Props = {
  children: React.ReactNode;
};

export const saveTodo = (todoToSave: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(todoToSave));
};

export const TodoContextProvider: React.FC<Props> = ({ children }) => {
  const [todo, setTodo] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTodos, setActiveTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenWidth]);

  const getTodos = useCallback(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos === null) return [];
    const parsedTodos = JSON.parse(savedTodos);
    setTodos(parsedTodos);
  }, []);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      const newTodo = { id: Date.now(), todo, isDone: false };
      setTodos([...todos, newTodo]);
      setTodo("");
      saveTodo([...todos, newTodo]);
    }
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    saveTodo(newTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        deleteTodo,
        addTodo,
        todo,
        setTodo,
        todos,
        setTodos,
        activeTodos,
        setActiveTodos,
        completedTodos,
        setCompletedTodos,
        filter,
        setFilter,
        screenWidth,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("context must be provided within the TodoContextProvider");
  }
  return context;
};
