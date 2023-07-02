import React, { useState, useRef, useEffect } from "react";
import CustomCheckbox from "../shared/CustomCheckbox";
import "../styles/Input.scss";
import { useTodoContext } from "../context/TodoContext";

const Input: React.FC = () => {
  const { addTodo, todo, setTodo } = useTodoContext();
  const [checked, setChecked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleToggle = () => {
    if (!todo) return;
    setChecked(!checked);
    setTimeout(() => {
      setChecked(false);
    }, 300);
  };

  return (
    <form className="input-container" onSubmit={addTodo}>
      <span onClick={addTodo}>
        <CustomCheckbox handleToggle={handleToggle} checked={checked} />
      </span>
      <input
        ref={inputRef}
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Create a new todo..."
      />
    </form>
  );
};

export default Input;
