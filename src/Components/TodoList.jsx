import AddInput from "./AddInput";
import TaskCard from "./TaskCard";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const initialTodos = [];
  const [todos, setTodos] = useState(initialTodos);
  const [typeOfShownTodos, setTypeOfShownTodos] = useState("all");

  const handleInputChange = (todo) => {
    const newTodos = {
      id: uuidv4(),
      title: todo.title,
      description: todo.description,
      isCheaked: false,
    };
    const addTodo = [...todos, newTodos];
    setTodos(addTodo);
    localStorage.setItem("todo", JSON.stringify(addTodo));
  };

  function changeCheckState(id) {
    const updateTodosCheck = todos.map((t) => {
      if (t.id === id) {
        t.isCheaked = !t.isCheaked;
      }
      return t;
    });
    setTodos(updateTodosCheck);
    localStorage.setItem("todo", JSON.stringify(updateTodosCheck));
  }

  function handleEditChange(id, title, description) {
    const newUpdateTodo = todos.map((t) => {
      if (id === t.id) {
        return { ...t, title, description };
      }
      return t;
    });
    setTodos(newUpdateTodo);
    localStorage.setItem("todo", JSON.stringify(newUpdateTodo));
  }

  function handleDelete(id) {
    const updataTodoDelete = todos.filter((e) => {
      if (e.id === id) {
        return false;
      } else {
        return e;
      }
    });
    setTodos(updataTodoDelete);
    localStorage.setItem("todo", JSON.stringify(updataTodoDelete));
  }

  const CompletedTodos = todos.filter((t) => {
    return t.isCheaked;
  });

  const notCompletedTodos = todos.filter((t) => {
    return !t.isCheaked;
  });

  let selectdTodosToShow = todos;

  if (typeOfShownTodos === "all") {
    selectdTodosToShow = todos;
  } else if (typeOfShownTodos === "completed") {
    selectdTodosToShow = CompletedTodos;
  } else if (typeOfShownTodos === "notCompleted") {
    selectdTodosToShow = notCompletedTodos;
  }

  const buttonClass = (type) =>
    `px-2 py-1 sm:p-2 md:p-3 rounded-lg text-white duration-300 text-lg sm:text-lg md:text-base ${
      typeOfShownTodos === type
        ? "bg-rose-900"
        : "bg-rose-700 hover:bg-rose-900"
    }`;

  const todoMap = selectdTodosToShow.map((t) => {
    return (
      <TaskCard
        key={t.id}
        todo={t}
        handleChangeCheck={changeCheckState}
        handleDelete={handleDelete}
        handleEditBtn={handleEditChange}
      />
    );
  });

  useEffect(() => {
    const localStorgeData = JSON.parse(localStorage.getItem("todo")) ?? [];
    setTodos(localStorgeData);
  }, []);

  return (
    <>
      {/* Header */}
      <div className="w-9/12 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 max-w-2xl mx-4 h-fit bg-white rounded-xl max-h-[80vh] sm:max-h-[75vh] md:max-h-[70vh] overflow-auto">
        <h1 className="p-4 sm:p-5 text-center text-2xl sm:text-3xl md:text-4xl font-semibold">
          My Tasks
        </h1>
        <hr />
        {/* == Header ==*/}
        {/* Sections Btns */}
        <div className="flex gap-2 sm:gap-3 justify-center mt-4 px-2 sm:px-0">
          <button
            className={buttonClass("all")}
            onClick={() => {
              setTypeOfShownTodos("all");
            }}
          >
            All
          </button>
          <button
            className={buttonClass("completed")}
            onClick={() => {
              setTypeOfShownTodos("completed");
            }}
          >
            Completed
          </button>
          <button
            className={buttonClass("notCompleted")}
            onClick={() => {
              setTypeOfShownTodos("notCompleted");
            }}
          >
            Not Completed
          </button>
        </div>
        {/*== Sections Btns ==*/}
        {/* Taks Cards */}

        <div className="flex justify-center items-center flex-col px-2 sm:px-0">
          {todoMap}
        </div>

        <AddInput inputChange={handleInputChange} />
        {/* == Taks Cards == */}
      </div>
    </>
  );
}
