import { useState, useRef, useEffect } from "react";
import CustomCheckbox from "../shared/CustomCheckbox";
import DeleteIcon from "../assets/icon-cross.svg";
import "../styles/SingleTodo.scss";
import { Todo } from "../model";
import { saveTodo, useTodoContext } from "../context/TodoContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  index: number;
};

const SingleTodo: React.FC<Props> = ({ todo, index }) => {
  const { deleteTodo, todos, setTodos } = useTodoContext();
  const [savedValue, setValue] = useLocalStorage("checked", todo.isDone);
  const [edit, setEdit] = useState<string>(todo.todo);

  const [editTodo, setEditTodo] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { screenWidth } = useTodoContext();

  const handleMouseEnter = () => {
    if (screenWidth > 768) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (screenWidth > 768) {
      setIsHovered(false);
    }
  };

  // show the delete icon on small screens and only on hover on large screens
  useEffect(() => {
    if (screenWidth <= 768) {
      setIsHovered(true);
    } else {
      setIsHovered(false);
    }
  }, [screenWidth]);

  // set the focus on the input when updating the todo
  useEffect(() => {
    inputRef.current?.focus();
  }, [editTodo]);

  // toggle todos completed state and save to localStorage
  const handleToggle = (id: number) => {
    setValue(!savedValue);

    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: !todo.isDone };
      }
      return todo;
    });

    setTodos(updatedTodos);
    saveTodo(updatedTodos);
  };

  // edit todos value and save to localStorage
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    const editedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, todo: edit } : todo
    );
    setTodos(editedTodos);
    saveTodo(editedTodos);
    setEditTodo(false);
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`single-todo ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          style={{
            ...provided.draggableProps.style,
            width: snapshot.isDragging ? "200px" : "auto",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="check-container">
            <span>
              <CustomCheckbox
                handleToggle={() => handleToggle(todo.id)}
                checked={todo.isDone}
              />
            </span>

            <div
              className="edit-todo-container"
              onClick={() => {
                if (!editTodo && !todo.isDone) {
                  setEditTodo(!editTodo);
                }
              }}
            >
              {editTodo ? (
                <input
                  type="text"
                  ref={inputRef}
                  value={edit}
                  onChange={(e) => setEdit(e.target.value)}
                />
              ) : (
                <span>
                  {!todo.isDone ? (
                    todo.todo
                  ) : (
                    <s
                      style={{
                        fontWeight: todo.isDone ? "300" : "700",
                        color: todo.isDone ? "var(--text-blur-clr)" : "",
                      }}
                    >
                      {todo.todo}
                    </s>
                  )}
                </span>
              )}
            </div>
          </div>

          {isHovered && (
            <span onClick={() => deleteTodo(todo.id)}>
              <img src={DeleteIcon} alt="delete-icon" />
            </span>
          )}
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
