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
    <>
      <div className="flex bg-blue-800 h-20 sm:h-24 md:h-28 w-11/12 sm:w-10/12 p-3 sm:p-4 gap-3 sm:gap-5 justify-between items-center mt-3 sm:mt-5 rounded-lg hover:bg-blue-900 duration-300">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-2xl md:text-2xl text-white font-medium break-words leading-tight">
            {todo.title}
          </h3>
          <h4 className="text-sm sm:text-lg md:text-lg mt-1 sm:mt-2 text-gray-200 break-words leading-tight">
            {todo.description}
          </h4>
        </div>
        <div className="flex space-x-2 sm:space-x-3 items-center flex-shrink-0">
          <div
            className={`border-2 border-solid border-lime-400 group size-7 sm:size-8 md:size-9 ${
              todo.isCheaked ? "bg-lime-400 border-white" : "bg-white"
            } rounded-full flex items-center justify-center hover:size-8 sm:hover:size-9 md:hover:size-11 duration-300 cursor-pointer`}
            onClick={() => {
              handleCheckClick();
            }}
          >
            <i
              className={`fa-solid fa-check text-xs sm:text-sm md:text-base ${
                todo.isCheaked ? "text-white" : "text-lime-400"
              } group-hover:text-sm sm:group-hover:text-base md:group-hover:text-xl duration-300`}
            ></i>
          </div>
          <div
            className="border-2 border-solid border-sky-500 group size-7 sm:size-8 md:size-9 bg-white rounded-full flex items-center justify-center hover:bg-slate-200 hover:size-8 sm:hover:size-9 md:hover:size-11 duration-300 cursor-pointer"
            onClick={togglePopUp}
          >
            <i className="fa-solid fa-pencil text-sky-500 text-xs sm:text-sm md:text-base group-hover:text-sm sm:group-hover:text-base md:group-hover:text-xl duration-300"></i>
          </div>
          <div
            className="border-2 border-solid border-rose-700 group size-7 sm:size-8 md:size-9 bg-white rounded-full flex items-center justify-center hover:bg-slate-200 hover:size-8 sm:hover:size-9 md:hover:size-11 duration-300 cursor-pointer"
            onClick={handleDeleteBtn}
          >
            <i className="fa-solid fa-trash text-rose-700 text-xs sm:text-sm md:text-base group-hover:text-sm sm:group-hover:text-base md:group-hover:text-xl duration-300"></i>
          </div>
        </div>
      </div>

      {popUp && (
        <div
          className="z-10 w-screen h-screen bg-black/75 fixed top-0 left-0 bottom-0 right-0 px-4"
          onClick={togglePopUp}
        >
          <form
            className="z-20 w-full sm:w-96 md:w-1/3 lg:w-1/4 max-w-md h-fit bg-white my-5 mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center flex-col rounded-lg p-4"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleEdit}
          >
            <h2 className="text-lg sm:text-xl p-3 sm:p-5 text-center font-semibold">
              Edit Task
            </h2>
            <div className="relative w-full max-w-60 group mb-4">
              <span className="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-blue-800 opacity-70 transition-all duration-300 group-focus-within:opacity-100 h-10"></span>
              <input
                type="text"
                id="title"
                placeholder=""
                className="peer w-full pl-6 pr-4 pt-6 pb-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg shadow-md focus:border-transparent focus:ring-2 focus:ring-blue-800 focus:outline-none transition-all duration-300 delay-200 placeholder-transparent"
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
            <div className="relative w-full max-w-60 group mb-6">
              <span className="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-blue-800 opacity-70 transition-all duration-300 group-focus-within:opacity-100 h-10"></span>
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
                className="absolute left-6 top-1.5 text-sm text-gray-500 transition-all duration-200 ease-in-out peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-800 peer-focus:font-semibold cursor-text"
              >
                Description
              </label>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full justify-center">
              <button
                className="bg-rose-800 w-full sm:w-1/3 py-2 sm:py-2.5 h-10 rounded-lg text-white text-sm sm:text-lg hover:bg-rose-900 duration-300 font-medium"
                type="submit"
              >
                Confirm
              </button>
              <button
                className="bg-gray-600 w-full sm:w-1/3 py-2 sm:py-2.5 h-10 rounded-lg text-white text-sm sm:text-lg hover:bg-gray-700 duration-300 font-medium"
                type="button"
                onClick={togglePopUp}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
