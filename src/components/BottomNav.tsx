import { useEffect, useState } from "react";
import "../styles/BottomNav.scss";
import { saveTodo, useTodoContext } from "../context/TodoContext";

type Props = {
  handleClickOne: () => void;
  handleClickTwo: () => void;
  handleClickThree: () => void;
  activeFilter: number;
};

const BottomNavBtn: React.FC<Props> = ({
  handleClickOne,
  handleClickTwo,
  handleClickThree,
  activeFilter,
}) => (
  <div className="bottom-nav-btn desktop">
    <p
      onClick={handleClickOne}
      style={{ color: activeFilter === 0 ? "var(--bright-blue)" : "" }}
    >
      All
    </p>
    <p
      onClick={handleClickTwo}
      style={{ color: activeFilter === 1 ? "var(--bright-blue)" : "" }}
    >
      Active
    </p>
    <p
      onClick={handleClickThree}
      style={{ color: activeFilter === 2 ? "var(--bright-blue)" : "" }}
    >
      Completed
    </p>
  </div>
);

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
    screenWidth,
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
    if (!completedTodos) return;
    const activeTodos = todos.filter((todo) => !todo.isDone);
    setTodos(activeTodos);
    setCompletedTodos([]);
    saveTodo(activeTodos);
  };

  return (
    <div className="bottom-nav">
      <div>
        <p>
          {lengthToRender} item
          {lengthToRender && lengthToRender > 2 ? "s" : ""} left
        </p>
        {screenWidth >= 768 && (
          <BottomNavBtn
            activeFilter={activeFilter}
            handleClickOne={() => {
              setFilter("all");
              handleClick(0);
            }}
            handleClickTwo={() => {
              handleClick(1);
              getActiveTodos();
            }}
            handleClickThree={() => {
              handleClick(2);
              getCompletedTodos();
            }}
          />
        )}
        <p onClick={clearCompletedTodos}>Clear completed</p>
      </div>

      {screenWidth < 768 && (
        <BottomNavBtn
          activeFilter={activeFilter}
          handleClickOne={() => {
            setFilter("all");
            handleClick(0);
          }}
          handleClickTwo={() => {
            handleClick(1);
            getActiveTodos();
          }}
          handleClickThree={() => {
            handleClick(2);
            getCompletedTodos();
          }}
        />
      )}
    </div>
  );
};

export default BottomNav;
