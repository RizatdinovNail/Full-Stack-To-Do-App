"use client";

import { useEffect, useState } from "react";
import api from "@/app/api/api";

interface profileProps {
  switchView: (value: boolean) => void;
  setPhoto: (photo: string) => void;
  photo: string;
}

interface User {
  _id: string;
  username: string;
  email: string;
  photo: string;
}

interface Stats {
  completed: number;
  incomplete: number;
}

export default function Profile({ switchView, setPhoto, photo }: profileProps) {
  const [user, setUser] = useState<User>();
  const [stats, setStats] = useState<Stats>({ completed: 0, incomplete: 0 });
  const [update, setUpdate] = useState(false);
  const [updateType, setUpdateType] = useState("");
  const [newInfo, setNewInfo] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [addPhoto, setAddPhoto] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/me");
        setUser(res.data);
      } catch (error) {
        console.error("Error getting the user: " + error);
      }
    };
    const fetchStats = async () => {
      try {
        const res = await api.get("/stats");
        setStats(res.data);
      } catch (error) {
        console.error("Failed to get stats: " + error);
      }
    };

    fetchStats();
    fetchUser();
  }, []);

  const updateUser = async () => {
    console.log("Updating user with type: " + updateType);
    try {
      let payload: any = {};

      if (updateType === "name") payload.username = newInfo;
      else if (updateType === "email") payload.email = newInfo;
      else if (updateType === "password") {
        if (newInfo !== confirmPassword) return alert("Passwords do not match");

        payload.currentPassword = currentPassword;
        payload.newPassword = newInfo;
      }

      const res = await api.patch<User>("/update", payload);

      setUser(res.data);
      setPhoto(res.data.photo);
      setNewInfo("");
      setCurrentPassword("");
      setConfirmPassword("");
      setUpdate(false);
      setUpdateType("");
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to update user");
    }
  };

  const setInputType = () => (updateType === "email" ? "email" : "text");

  const infoLinks = [
    {
      name: "Name",
      value: user?.username ?? "",
      edit: "Change username",
      type: "name",
    },
    {
      name: "Email",
      value: user?.email ?? "",
      edit: "Change email",
      type: "email",
    },
    {
      name: "Password",
      value: "••••••••",
      edit: "Change password",
      type: "password",
    },
  ];

  return (
    <div className="flex flex-col gap-8 z-2">
      <section className="flex justify-between gap-4 items-center">
        <div
          className="bg-(--placeholders) w-40 h-48 relative rounded-xl"
          onMouseEnter={() => setAddPhoto(true)}
          onMouseLeave={() => setAddPhoto(false)}
        >
          {photo === "" ? (
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 18C16.35 18 14.9375 17.4125 13.7625 16.2375C12.5875 15.0625 12 13.65 12 12C12 10.35 12.5875 8.9375 13.7625 7.7625C14.9375 6.5875 16.35 6 18 6C19.65 6 21.0625 6.5875 22.2375 7.7625C23.4125 8.9375 24 10.35 24 12C24 13.65 23.4125 15.0625 22.2375 16.2375C21.0625 17.4125 19.65 18 18 18ZM6 30V25.8C6 24.95 6.21875 24.1687 6.65625 23.4562C7.09375 22.7437 7.675 22.2 8.4 21.825C9.95 21.05 11.525 20.4688 13.125 20.0812C14.725 19.6937 16.35 19.5 18 19.5C19.65 19.5 21.275 19.6937 22.875 20.0812C24.475 20.4688 26.05 21.05 27.6 21.825C28.325 22.2 28.9062 22.7437 29.3438 23.4562C29.7812 24.1687 30 24.95 30 25.8V30H6ZM9 27H27V25.8C27 25.525 26.9312 25.275 26.7938 25.05C26.6562 24.825 26.475 24.65 26.25 24.525C24.9 23.85 23.5375 23.3438 22.1625 23.0063C20.7875 22.6688 19.4 22.5 18 22.5C16.6 22.5 15.2125 22.6688 13.8375 23.0063C12.4625 23.3438 11.1 23.85 9.75 24.525C9.525 24.65 9.34375 24.825 9.20625 25.05C9.06875 25.275 9 25.525 9 25.8V27ZM18 15C18.825 15 19.5313 14.7063 20.1188 14.1187C20.7063 13.5312 21 12.825 21 12C21 11.175 20.7063 10.4688 20.1188 9.88125C19.5313 9.29375 18.825 9 18 9C17.175 9 16.4688 9.29375 15.8813 9.88125C15.2937 10.4688 15 11.175 15 12C15 12.825 15.2937 13.5312 15.8813 14.1187C16.4688 14.7063 17.175 15 18 15Z"
                fill="#1C2428"
              />
            </svg>
          ) : (
            <img
              src={photo}
              alt="Profile Photo"
              className="w-full h-full object-cover rounded-xl"
            />
          )}
          <section
            className={`${addPhoto ? "opacity-100" : "opacity-0 pointer-events-none"} 
  absolute inset-0 bg-black/60 flex flex-col justify-center items-center 
  transition-opacity duration-200 rounded-xl`}
          >
            <label className="cursor-pointer flex flex-col items-center gap-2">
              <span className="px-4 py-2 rounded-xl bg-white text-sm font-medium text-gray-800 shadow hover:bg-gray-100 transition">
                Upload Photo
              </span>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const formData = new FormData();
                  formData.append("photo", file);

                  try {
                    const res = await api.patch("/update-photo", formData, {
                      headers: { "Content-Type": "multipart/form-data" },
                    });

                    setPhoto(res.data.photo);
                  } catch (err) {
                    console.error(err);
                    alert("Upload failed");
                  }
                }}
              />
            </label>
          </section>
        </div>
        <article>
          <h1 className="text-center text-[2rem] text-(--headers)">Stats</h1>
          <article>
            <p className="text-[20px] text-(--smallText)">
              Completed To-Dos: {stats.completed}
            </p>
            <p className="text-[20px] text-(--smallText)">
              To-Dos to complete: {stats.incomplete}
            </p>
          </article>
        </article>
      </section>
      <section>
        <h1 className="text-[2rem] text-(--headers)">Information</h1>
        <section className="flex flex-col gap-4">
          {infoLinks.map((l) => (
            <article key={l.name}>
              <h2 className="text-[20px] text-(--smallText) flex">{l.name}</h2>
              <section className="bg-(--inputFields) text-(--placeholders) p-1 px-2 flex justify-between gap-2  rounded-2xl">
                <input
                  value={l.value}
                  readOnly
                  className="placeholder:text-(--placeholders) bg-(--inputFields) text-(--inputText) text-[1.2rem] w-full outline-none"
                ></input>
                <article className="flex justify-between mt-1">
                  <button
                    className="bg-(--button) text-(--buttonText) p-1 px-4 rounded-xl cursor-pointer text-[1rem]"
                    onClick={() => {
                      setUpdateType(l.type);
                      setUpdate(true);
                    }}
                  >
                    Edit
                  </button>
                </article>
              </section>
            </article>
          ))}
        </section>
      </section>
      <section className="flex justify-center items-center absolute bottom-12">
        <h1 className="text-center text-[2.2rem] w-[70%] text-(--headers)">
          Thank you for using this App!
        </h1>
      </section>

      <section
        className={`${update ? "block" : "hidden"} absolute top-0 bottom-0 right-0 left-0 bg-black/80 rounded-3xl backdrop-blur-sm flex justify-center items-center`}
      >
        <article className="bg-(--todoBG) rounded-xl p-4 relative w-92 flex flex-col gap-8">
          <h1 className="text-[2rem] text-center text-(--headers) font-bold">
            Update {updateType}
          </h1>
          {updateType === "password" && (
            <article className="flex flex-col gap-2">
              <label className="text-[1.2rem] text-(--smallText)">
                Current password
              </label>
              <input
                className="placeholder:text-(--placeholders) bg-(--inputFields) text-(--inputText) text-[1.2rem] w-full outline-none rounded-2xl p-2"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCurrentPassword(e.target.value)
                }
              ></input>
            </article>
          )}
          <article className="flex flex-col gap-2">
            <label className="text-[1.2rem] text-(--smallText)">
              New {updateType}
            </label>
            <input
              className="placeholder:text-(--placeholders) bg-(--inputFields) text-(--inputText) text-[1.2rem] w-full outline-none rounded-2xl p-2"
              value={newInfo}
              type={setInputType()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewInfo(e.target.value)
              }
            ></input>
          </article>
          {updateType === "password" && (
            <article className="flex flex-col gap-2">
              <label className="text-[1.2rem] text-(--smallText)">
                Repeat {updateType}
              </label>
              <input
                className="placeholder:text-(--placeholders) bg-(--inputFields) text-(--inputText) text-[1.2rem] w-full outline-none rounded-2xl p-2"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
              ></input>
            </article>
          )}
          <section className="flex justify-between w-full gap-4">
            <button
              className="bg-(--button) text-(--buttonText) p-1 px-4 rounded-xl cursor-pointer text-[1.2rem] w-full"
              onClick={() => setUpdate(false)}
            >
              Cancel
            </button>
            <button
              className="bg-(--button) text-(--buttonText) p-1 px-4 rounded-xl cursor-pointer text-[1.2rem] w-full"
              onClick={() => updateUser()}
            >
              Update
            </button>
          </section>
        </article>
      </section>
    </div>
  );
}
