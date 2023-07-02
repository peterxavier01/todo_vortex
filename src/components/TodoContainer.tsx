import SingleTodo from "./SingleTodo";
import "../styles/TodoContainer.scss";
import { Todo } from "../model";
import { useTodoContext } from "../context/TodoContext";
import BottomNav from "./BottomNav";
import { Droppable } from "react-beautiful-dnd";

const TodoContainer: React.FC = () => {
  const { todos, filter, activeTodos, completedTodos } = useTodoContext();

  // select the todos list to be displayed
  let todosToRender: Todo[];
  if (filter === "all") {
    todosToRender = todos;
  } else if (filter === "active") {
    todosToRender = activeTodos;
  } else if (filter === "completed") {
    todosToRender = completedTodos;
  }

  return (
    <div className="todo-container">
      <Droppable droppableId="TodosList">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {todos &&
              todosToRender?.map((todo: Todo, index) => (
                <SingleTodo key={todo.id} todo={todo} index={index} />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <BottomNav />
      <p className="dnd-text">Drag and drop to reorder list</p>
    </div>
  );
};

export default TodoContainer;
