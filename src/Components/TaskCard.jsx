import { useState, useEffect } from "react";

export default function TaskCard({
  todo,
  handleChangeCheck,
  handleDelete,
  handleEditBtn,
}) {
  const [popUp, setPopUp] = useState(false);
  const [input, setInput] = useState({ title: "", description: "" });

  function handleCheckClick() {
    handleChangeCheck(todo.id);
  }

  function handleDeleteBtn() {
    handleDelete(todo.id);
  }

  function handleEdit() {
    handleEditBtn(todo.id, input.title, input.description);
    setInput({ title: "", description: "" });
    setPopUp(false);
  }

  function togglePopUp() {
    setPopUp(!popUp);
  }

  useEffect(() => {
    if (popUp) {
      setInput({ title: todo.title, description: todo.description });
    }
  }, [popUp]);

  return (
    <div className="flex bg-blue-800 h-28 w-10/12 p-4 gap-5 justify-between items-center mt-5 rounded-lg hover:bg-blue-900 duration-300">
      <div>
        <h3 className="text-2xl text-white">{todo.title}</h3>
        <h4 className="text-lg mt-2 text-white">{todo.description}</h4>
      </div>
      <div className="space-x-3 flex items-center">
        <div
          className={`border-2 border-solid border-lime-400 group size-9 ${
            todo.isCheaked ? "bg-lime-400 border-white" : "bg-white"
          } rounded-full flex items-center justify-center hover:size-11 duration-300 cursor-pointer`}
          onClick={() => {
            handleCheckClick();
          }}
        >
          <i
            className={`fa-solid fa-check ${
              todo.isCheaked ? "text-white" : "text-lime-400"
            } group-hover:text-xl duration-300`}
          ></i>
        </div>
        <div
          className="border-2 border-solid border-sky-500 group size-9 bg-white rounded-full flex items-center justify-center hover:bg-slate-200 hover:size-11 duration-300 cursor-pointer"
          onClick={togglePopUp}
        >
          <i className="fa-solid fa-pencil text-sky-500 group-hover:text-xl duration-300"></i>
        </div>
        <div
          className="border-2 border-solid border-rose-700 group size-9 bg-white rounded-full flex items-center justify-center hover:bg-slate-200 hover:size-11 duration-300 cursor-pointer"
          onClick={handleDeleteBtn}
        >
          <i className="fa-solid fa-trash text-rose-700 group-hover:text-xl duration-300"></i>
        </div>
      </div>

      {popUp && (
        <div
          className="z-10 w-screen h-screen bg-black/75 fixed top-0 left-0 bottom-0 right-0"
          onClick={togglePopUp}
        >
          <form
            className="z-20 w-1/5 h-fit bg-white my-5 mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center flex-col rounded-lg"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleEdit}
          >
            <h2 className="text-xl p-5">Edit Task</h2>
            <div class="relative w-60 group">
              <span class="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-blue-800 opacity-70 transition-all duration-300 group-focus-within:opacity-100 h-10"></span>
              <input
                type="text"
                id="title"
                placeholder=""
                class="peer w-full pl-6 pr-4 pt-6 pb-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-blue-800 focus:outline-none transition-all duration-300 delay-200 placeholder-transparen mb-2"
                value={input.title}
                onChange={(e) => setInput({ ...input, title: e.target.value })}
              />
              <label
                htmlFor="title"
                className="absolute left-6 top-1.5 text-sm text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-800 peer-focus:font-semibold cursor-text"
              >
                Title
              </label>
            </div>
            <div className="relative w-60 group">
              <span class="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-blue-800 opacity-70 transition-all duration-300 group-focus-within:opacity-100 h-10"></span>
              <input
                type="text"
                id="desc"
                placeholder=""
                className="peer w-full pl-6 pr-4 pt-6 pb-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-blue-800 focus:outline-none transition-all duration-300 delay-200 placeholder-transparent"
                value={input.description}
                onChange={(e) =>
                  setInput({ ...input, description: e.target.value })
                }
              />
              <label
                htmlFor="desc"
                class="absolute left-6 top-1.5 text-sm text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-800 peer-focus:font-semibold cursor-text"
              >
                Description
              </label>
            </div>
            <div className="flex gap-5 w-full justify-center">
              <button
                className="bg-rose-800 w-1/3 my-5 h-10 rounded-lg text-white text-lg"
                type="submit"
              >
                Confirm
              </button>
              <button
                className="bg-rose-800 w-1/3 my-5 h-10 rounded-lg text-white text-lg"
                onClick={togglePopUp}
              >
                close
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
