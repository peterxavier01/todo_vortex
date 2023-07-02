import { useEffect, useState } from "react";
import "../styles/BottomNav.scss";
import { saveTodo, useTodoContext } from "../context/TodoContext";

const BottomNav = () => {
  const [activeFilter, setActiveFilter] = useState<number>(0);
  const {
    filter,
    todos,
    setTodos,
    activeTodos,
    completedTodos,
    setCompletedTodos,
    setActiveTodos,
    setFilter,
  } = useTodoContext();
  const TodoListLength = todos.length;
  const ActiveTodosLength = activeTodos.length;
  const CompletedTodosLength = completedTodos.length;
  let lengthToRender;

  // select the length to render depending on the list being displayed
  if (filter === "all") {
    lengthToRender = TodoListLength;
  } else if (filter === "active") {
    lengthToRender = ActiveTodosLength;
  } else if (filter === "completed") {
    lengthToRender = CompletedTodosLength;
  }

  // set active todos in realtime
  useEffect(() => {
    const filteredArray = [...todos];
    const activeTodos = filteredArray.filter((todo) => !todo.isDone);
    setActiveTodos(activeTodos);
  }, [todos, setActiveTodos]);

  // set completed todos in realtime
  useEffect(() => {
    const filteredArray = [...todos];
    const completedTodos = filteredArray.filter((todo) => todo.isDone);
    setCompletedTodos(completedTodos);
  }, [todos, setCompletedTodos]);

  // fetch active todos
  const getActiveTodos = () => {
    setFilter("active");
  };

  // fetch completed todos
  const getCompletedTodos = () => {
    setFilter("completed");
  };

  // set active state of clickable text
  const handleClick = (id: number) => {
    setActiveFilter(id);
  };

  // clear all completed todos
  const clearCompletedTodos = () => {
    const activeTodos = todos.filter((todo) => !todo.isDone);
    setTodos(activeTodos);
    setCompletedTodos([]);
    saveTodo(activeTodos);
  };

  return (
    <div className="bottom-nav">
      <div>
        <p>{lengthToRender} items left</p>
        <p onClick={clearCompletedTodos}>Clear completed</p>
      </div>
      <div>
        <p
          onClick={() => {
            setFilter("all");
            handleClick(0);
          }}
          style={{ color: activeFilter === 0 ? "var(--bright-blue)" : "" }}
        >
          All
        </p>
        <p
          onClick={() => {
            handleClick(1);
            getActiveTodos();
          }}
          style={{ color: activeFilter === 1 ? "var(--bright-blue)" : "" }}
        >
          Active
        </p>
        <p
          onClick={() => {
            handleClick(2);
            getCompletedTodos();
          }}
          style={{ color: activeFilter === 2 ? "var(--bright-blue)" : "" }}
        >
          Completed
        </p>
      </div>
    </div>
  );
};

export default BottomNav;
