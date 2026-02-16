"use client";

import api from "@/app/api/api";
import { useEffect, useState } from "react";

interface mainPageProps {
  switchView: (value: boolean) => void;
}

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  dueDate: string | null;
  tagIds: Tag[];
}

interface Tag {
  _id: string;
  name: string;
  userId: string;
  color: string;
  createdAt: string;
}

interface Filter {
  name: string;
}

export default function MainPage({ switchView }: mainPageProps) {
  const [todoTitle, setToDoTitle] = useState("");
  const [errorCreatingToDo, setError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [todoDesc, setTodoDesc] = useState(false);
  const [chosenTodo, setChosenTodo] = useState<Todo>();
  const [chosenTodoTitle, setChosenTodoTitle] = useState("");
  const [chosenTodoCompletionState, setChosenTodoCompletionState] =
    useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredByFilters, setFilteredByFilters] = useState<Todo[]>([]);
  const [filteredBySearch, setFilteredBySearch] = useState<Todo[]>([]);
  const [openFilters, setOpenFilters] = useState(false);

  const allFilters = [
    {
      name: "Completed",
    },
    {
      name: "Incomplete",
    },
    {
      name: "Today",
    },
    {
      name: "Upcoming",
    },
    {
      name: "No Due Date",
    },
    {
      name: "By Tag",
    },
  ];

  async function createTodo() {
    if (todoTitle === "") {
      return setError(true);
    } else {
      await api.post("/todos", { title: todoTitle });
      fetchTodos();
      setToDoTitle("");
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    filterToDos();
  }, [todos, filters]);

  const fetchTodos = async () => {
    const res = await api.get<Todo[]>("/todos");
    setTodos(res.data);
  };

  const deleteToDo = async (todoId: string) => {
    try {
      setTodoDesc(false);
      const res = await api.delete<Todo[]>(`/todos/${todoId}`);

      setTodos(res.data);
    } catch (error) {
      console.error("Failed to get backend res: " + error);
    }
  };

  const updateToDo = async (todoId: string) => {
    try {
      setTodoDesc(false);
      const res = await api.patch<Todo>(`/todos/${todoId}`, {
        title: chosenTodo?.title,
        completed: chosenTodoCompletionState,
      });
      setTodos((prev) =>
        prev.map((todo) => (todo._id === todoId ? res.data : todo)),
      );
    } catch (error) {
      console.error("Failed to update todo: " + error);
    }
  };

  const searchToDo = (query: string) => {
    const source = filters.length ? filteredByFilters : todos;

    const filtered = source.filter((todo) =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );

    setFilteredBySearch(filtered);
  };

  const filterToDos = () => {
    let result = [...todos];

    filters.forEach((filter) => {
      switch (filter.name) {
        case "Completed":
          result = result.filter((todo) => todo.completed);
          break;
        case "Incomplete":
          result = result.filter((todo) => !todo.completed);
          break;
        case "Today":
          const today = new Date().toISOString().split("T")[0];
          result = result.filter(
            (todo) => todo.dueDate && todo.dueDate.split("T")[0] === today,
          );
          break;
        case "Upcoming":
          const now = new Date();
          result = result.filter(
            (todo) => todo.dueDate && new Date(todo.dueDate) > now,
          );
          break;
        case "No Due Date":
          result = result.filter((todo) => !todo.dueDate);
          break;
        default:
          break;
      }
    });

    setFilteredByFilters(result);
  };

  const displayedTodos = () => {
    if (searchInput) return filteredBySearch;
    if (filters.length) return filteredByFilters;
    return todos;
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-[42px] text-center">Add your Todo</h1>
      <div className="flex flex-col gap-12">
        <section className="flex flex-col gap-2">
          <article className="bg-black flex justify-between p-2 gap-2">
            <input
              className="bg-black text-white w-full"
              placeholder="Ex: Walk a dog"
              value={todoTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setToDoTitle(e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  createTodo();
                }
              }}
            ></input>
            <button
              className="bg-white text-black p-2 px-4"
              onClick={() => createTodo()}
            >
              Add
            </button>
          </article>
          <section className="flex">
            <section className="relative">
              <svg
                viewBox="0 0 24 24"
                width="36"
                height="36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
                onClick={() => setOpenFilters(true)}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.78584 3C4.24726 3 3 4.24726 3 5.78584C3 6.59295 3.28872 7.37343 3.81398 7.98623L6.64813 11.2927C7.73559 12.5614 8.33333 14.1773 8.33333 15.8483V18C8.33333 19.6569 9.67648 21 11.3333 21H12.6667C14.3235 21 15.6667 19.6569 15.6667 18V15.8483C15.6667 14.1773 16.2644 12.5614 17.3519 11.2927L20.186 7.98624C20.7113 7.37343 21 6.59294 21 5.78584C21 4.24726 19.7527 3 18.2142 3H5.78584Z"
                    fill="#000000"
                  ></path>{" "}
                </g>
              </svg>

              <ul
                className={`${openFilters ? "block" : "hidden"} absolute bg-black p-4 flex flex-col gap-2`}
              >
                <li
                  className="text-white cursor-pointer"
                  onClick={() => setOpenFilters(false)}
                >
                  X
                </li>
                {allFilters.map((filter) => (
                  <li
                    key={filter.name}
                    className="text-white cursor-pointer"
                    onClick={() => {
                      if (filter.name === "All") {
                        setFilters([]);
                      } else {
                        setFilters((prev) =>
                          prev.some((f) => f.name === filter.name)
                            ? prev
                            : [...prev, filter],
                        );
                      }
                    }}
                  >
                    {filter.name}
                  </li>
                ))}
              </ul>
            </section>
            <input
              className="bg-black text-white w-full p-2"
              placeholder="Search..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                setSearchInput(value);
                searchToDo(value);
              }}
            ></input>
          </section>
          <section>
            <ul className="flex gap-4 flex-wrap">
              {filters.map((filter) => (
                <li
                  key={filter.name}
                  className="bg-black text-white px-2 py-1 text-[0.8rem] flex items-center gap-2"
                >
                  {filter.name}
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      setFilters((prev) => prev.filter((f) => f !== filter));
                    }}
                  >
                    x
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </section>

        <section className="overflow-y-auto h-142 no-scrollbar">
          <ul className="flex gap-4 flex-col">
            {displayedTodos().map((todo) => (
              <li
                key={todo._id}
                className={`flex gap-2 items-center justify-between ${filters.some((f) => f.name === "Completed") || todo.completed === false ? "block" : "hidden"}`}
              >
                <article className="bg-blue-500 text-white flex justify-between p-2 items-center w-full">
                  {todo.title}
                  <span className="flex gap-4 items-center">
                    {/*<section className="flex gap-2 text-[0.6rem]">
                      {todo.tagIds.map((tag) => (
                        <p
                          key={tag._id}
                          className={`bg-${tag.color} text-white`}
                        >
                          {tag.name}
                        </p>
                      ))}
                    </section>*/}
                    <p
                      className="cursor-pointer"
                      onClick={() => {
                        setChosenTodo(todo);
                        setChosenTodoTitle(todo.title);
                        setTodoDesc(true);
                      }}
                    >
                      ···
                    </p>
                  </span>
                </article>
                <p
                  onClick={() => {
                    setChosenTodo(todo);
                    setChosenTodoCompletionState(true);
                    updateToDo(todo._id);
                  }}
                  className="cursor-pointer"
                >
                  {todo.completed ? "" : "✓"}
                </p>
              </li>
            ))}
          </ul>
        </section>
        <section
          className={`${errorCreatingToDo ? "block" : "hidden"} absolute bottom-4 bg-red-500 right-4 left-4 p-4 justify-center flex  rounded-2xl text-[1.2rem] font-bold`}
        >
          <p>The To-do title can not be empty!</p>
        </section>
        <section
          className={`absolute top-0 bottom-0 right-0 left-0 bg-black/80 rounded-3xl ${todoDesc ? "block" : "hidden"} flex justify-center items-center`}
        >
          <section className="bg-white p-4 relative w-80 flex flex-col gap-8">
            <article className="flex items-center justify-center">
              <input
                className="text-[1.3rem] text-center"
                value={chosenTodoTitle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setChosenTodoTitle(e.target.value)
                }
              ></input>
              <p
                className="absolute right-4 cursor-pointer"
                onClick={() => {
                  setTodoDesc(false);
                }}
              >
                x
              </p>
            </article>
            <article>
              <h1 className="flex justify-between">
                Time of creation{" "}
                <span>
                  {chosenTodo
                    ? new Date(chosenTodo.createdAt).toISOString().split("T")[0]
                    : "Error"}
                </span>
              </h1>
              <h1 className="flex justify-between">
                Last Updated{" "}
                <span>
                  {chosenTodo
                    ? new Date(chosenTodo.updatedAt).toISOString().split("T")[0]
                    : "Error"}
                </span>
              </h1>
              <h1 className="flex justify-between">
                Due to{" "}
                <span>{`${chosenTodo?.dueDate ? chosenTodo?.dueDate : "Unscheduled"}`}</span>
              </h1>
              <h1 className="flex justify-between">
                Tags <span>Tag</span>
              </h1>
            </article>
            <section className="flex justify-between gap-4">
              <button
                className="bg-black text-white p-2 cursor-pointer text-[1.2rem] w-full"
                onClick={() => {
                  if (chosenTodo) deleteToDo(chosenTodo._id);
                }}
              >
                Delete
              </button>
              <button
                className="bg-black text-white p-2 cursor-pointer text-[1.2rem] w-full"
                onClick={() => {
                  if (chosenTodo) updateToDo(chosenTodo._id);
                  else console.log("ChosendTodo is null");
                }}
              >
                Update
              </button>
            </section>
          </section>
        </section>
      </div>
    </div>
  );
}
