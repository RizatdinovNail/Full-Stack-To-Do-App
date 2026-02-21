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
    <div className="flex flex-col gap-4 w-full z-2">
      <h1 className="text-[42px] text-center text-(--headers)">
        Add your Todo
      </h1>
      <div className="flex flex-col gap-12 mt-8">
        <section className="flex flex-col gap-2">
          <article className="bg-(--inputFields) p-2 outline-none rounded-xl text-(--icons) text-[1.2rem] flex justify-between">
            <input
              className="placeholder:text-(--placeholders) bg-(--inputFields) text-(--inputText) text-[1.2rem] w-full outline-none"
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
              className="bg-(--button) text-(--buttonText) p-1 px-4 rounded-xl cursor-pointer"
              onClick={() => createTodo()}
            >
              Add
            </button>
          </article>
          <section className="flex mt-4 items-center gap-4">
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
                    fill="var(--inputFields)"
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
              className="bg-(--inputFields) placeholder:text-(--placeholders) text-(--inputText) text-[1.2rem] w-full outline-none p-2 rounded-xl"
              placeholder="Search..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value;
                setSearchInput(value);
                searchToDo(value);
              }}
            ></input>
          </section>
          <section className="mt-2">
            <ul className="flex gap-4 flex-wrap">
              {filters.map((filter) => (
                <p
                  key={filter.name}
                  className="bg-(--placeholders) text-(--smallText) font-extralight rounded-xl px-2 text-[1rem] flex items-center gap-4"
                >
                  {filter.name}
                  <span
                    className="cursor-pointer text-[1.2rem]"
                    onClick={() => {
                      setFilters((prev) => prev.filter((f) => f !== filter));
                    }}
                  >
                    x
                  </span>
                </p>
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
                <article className="bg-(--todoBG) rounded-xl text-[1.2rem] text-(--buttonText) flex justify-between p-2 items-center w-full">
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
                    <button
                      className="bg-(--button) text-(--buttonText) px-4 rounded-xl cursor-pointer"
                      onClick={() => {
                        setChosenTodo(todo);
                        setChosenTodoTitle(todo.title);
                        setTodoDesc(true);
                      }}
                    >
                      Edit
                    </button>
                  </span>
                </article>
                <p
                  onClick={() => {
                    setChosenTodo(todo);
                    setChosenTodoCompletionState(true);
                    updateToDo(todo._id);
                  }}
                  className="cursor-pointer text-[1.5rem] text-(--buttonText)"
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
          className={`absolute top-0 bottom-0 right-0 left-0 bg-black/80 rounded-3xl backdrop-blur-sm ${todoDesc ? "block" : "hidden"} flex justify-center items-center`}
        >
          <section className="bg-(--todoBG) rounded-xl p-4 relative w-92 flex flex-col gap-8">
            <article className="flex items-start justify-center">
              <input
                className="text-[2rem] text-center text-(--headers) font-bold"
                value={chosenTodoTitle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setChosenTodoTitle(e.target.value)
                }
              ></input>
              <p
                className="absolute right-4 cursor-pointer text-(--smallText)"
                onClick={() => {
                  setTodoDesc(false);
                }}
              >
                Cancel
              </p>
            </article>
            <article className="text-(--smallText) flex flex-col gap-4">
              <h1 className="flex justify-between font-bold">
                Time of creation{" "}
                <span className="font-light">
                  {chosenTodo
                    ? new Date(chosenTodo.createdAt).toISOString().split("T")[0]
                    : "Error"}
                </span>
              </h1>
              <h1 className="flex justify-between font-bold">
                Last Updated{" "}
                <span className="font-light">
                  {chosenTodo
                    ? new Date(chosenTodo.updatedAt).toISOString().split("T")[0]
                    : "Error"}
                </span>
              </h1>
              <h1 className="flex justify-between font-bold">
                Due to{" "}
                <span className="font-light">{`${chosenTodo?.dueDate ? chosenTodo?.dueDate : "Unscheduled"}`}</span>
              </h1>
              <h1 className="flex justify-between font-bold">
                Tags <span className="font-light cursor-pointer">+</span>
              </h1>
            </article>
            <section className="flex justify-between gap-4">
              <button
                className="bg-(--button) text-(--buttonText) rounded-xl py-1 text-[24px] w-full cursor-pointer"
                onClick={() => {
                  if (chosenTodo) deleteToDo(chosenTodo._id);
                }}
              >
                Delete
              </button>
              <button
                className="bg-(--button) text-(--buttonText) rounded-xl py-1 text-[24px] w-full cursor-pointer"
                onClick={() => {
                  if (chosenTodo) updateToDo(chosenTodo._id);
                  else console.log("Chosen Todo is null");
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
