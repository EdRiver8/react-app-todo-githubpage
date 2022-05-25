import { useState, useEffect } from "react";
import Formulario from "./Formulario";
import Todo from "./Todo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log("UseEffect");
    if (localStorage.getItem("todos")) {
      setTodos(JSON.parse(localStorage.getItem("todos")));
    }
  }, []);

  useEffect(() => {
    console.log("Modifico Todo");
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const agregarTodo = (todo) => {
    console.log(todo);
    setTodos((old) => [...old, todo]);
  };

  const eliminarTodo = (id) => {
    setTodos((old) => old.filter((todo) => todo.id !== id));
  };

  const editarTodo = (id) => {
    const editarTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, estado: !todo.estado } : todo
    );
    setTodos(editarTodos);
  };

  return (
    <>
      <Formulario agregarTodo={agregarTodo} />
      <ul className="list-group list-group-numbered mt-2">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            eliminarTodo={eliminarTodo}
            editarTodo={editarTodo}
          />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
