import { useState } from "react";

export default function AddInput({ inputChange }) {
  const [input, setInput] = useState({ title: "", description: "" });
  const [popUp, setPopUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.title.trim()) return;
    inputChange(input);
    setInput({ title: "", description: "" });
    setPopUp(false);
  };

  function togglePopUp() {
    setPopUp(!popUp);
  }

  return (
    <>
      <div className="flex justify-center px-4 sm:px-0">
        <button
          className="bg-rose-700 text-white text-base sm:text-lg md:text-xl rounded-lg w-full sm:w-10/12 h-10 sm:h-12 my-4 sm:my-5 hover:bg-rose-900 duration-300 font-medium"
          onClick={togglePopUp}
        >
          Add New Task
        </button>
      </div>

      {popUp && (
        <div
          className="z-10 w-screen h-screen bg-black/75 fixed top-0 left-0 bottom-0 right-0 px-4"
          onClick={togglePopUp}
        >
          <form
            className="z-20 w-full sm:w-96 md:w-1/3 lg:w-1/4 max-w-md h-fit bg-white my-5 mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center flex-col rounded-lg p-4"
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg sm:text-xl p-3 sm:p-5 text-center font-semibold">
              Create New Task
            </h2>
            <div className="relative w-full max-w-60 group mb-4">
              <span className="absolute -left-0.5 top-2 bottom-2 w-1.5 rounded bg-blue-800 opacity-70 transition-all duration-300 group-focus-within:opacity-100 h-10"></span>
              <input
                autoFocus
                required
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
                Add
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
