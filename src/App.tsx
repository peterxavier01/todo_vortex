import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./App.scss";
import Background from "./components/Background";
import Input from "./components/Input";
import Navbar from "./components/Navbar";
import TodoContainer from "./components/TodoContainer";
import { useThemeContext } from "./context/ThemeContext";
import { saveTodo, useTodoContext } from "./context/TodoContext";

const App: React.FC = () => {
  const { theme } = useThemeContext();
  const { todos, setTodos } = useTodoContext();

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add;
    const active = todos;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList" && add) {
      active.splice(destination.index, 0, add);
    }

    setTodos(active);
    saveTodo(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className={theme}>
        <div className="container">
          <Background />
          <div className="wrapper">
            <Navbar />
            <Input />
            <TodoContainer />
          </div>
        </div>
      </main>
    </DragDropContext>
  );
};

export default App;
