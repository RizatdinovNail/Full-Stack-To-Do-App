"use client";

import { useEffect, useState } from "react";
import api from "@/app/api/api";

interface profileProps {
  switchView: (value: boolean) => void;
}

interface User {
  _id: string;
  username: string;
  email: string;
}

interface Stats {
  completed: number;
  incomplete: number;
}

export default function Profile({ switchView }: profileProps) {
  const [user, setUser] = useState<User>();
  const [stats, setStats] = useState<Stats>({ completed: 0, incomplete: 0 });
  const [update, setUpdate] = useState(false);
  const [updateType, setUpdateType] = useState("");
  const [newInfo, setNewInfo] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      <svg
        width="30"
        height="22"
        viewBox="0 0 38 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cursor-pointer"
        onClick={() => switchView(true)}
      >
        <path
          d="M0.585785 13.3137C-0.195263 14.0947 -0.195263 15.3611 0.585785 16.1421L13.3137 28.87C14.0948 29.6511 15.3611 29.6511 16.1421 28.87C16.9232 28.089 16.9232 26.8227 16.1421 26.0416L4.82843 14.7279L16.1421 3.4142C16.9232 2.63315 16.9232 1.36682 16.1421 0.58577C15.3611 -0.195279 14.0948 -0.195279 13.3137 0.58577L0.585785 13.3137ZM38 14.7279V12.7279L2 12.7279V14.7279V16.7279L38 16.7279V14.7279Z"
          fill="black"
        />
      </svg>

      <section className="flex justify-between gap-8">
        <div className="bg-black w-40 h-48"></div>
        <article>
          <h1 className="text-center text-[1.5rem]">Stats</h1>
          <article>
            <p className="text-[1rem]">Completed To-Dos: {stats.completed}</p>
            <p className="text-[1rem]">
              To-Dos to complete: {stats.incomplete}
            </p>
          </article>
        </article>
      </section>
      <section>
        <h1 className="text-[1.5rem]">Information</h1>
        <section className="flex flex-col gap-4">
          {infoLinks.map((l) => (
            <article key={l.name}>
              <h2>{l.name}</h2>
              <section className="bg-black text-white p-2 flex justify-between gap-2">
                <input
                  value={l.value}
                  readOnly
                  className="w-full outline-none"
                ></input>
              </section>
              <article className="flex justify-between mt-1">
                <p
                  className="text-[0.8rem] cursor-pointer"
                  onClick={() => {
                    setUpdateType(l.type);
                    setUpdate(true);
                  }}
                >
                  {l.edit}
                </p>
              </article>
            </article>
          ))}
        </section>
      </section>
      <section className="flex justify-center items-center">
        <h1 className="text-center text-[2.2rem] w-[70%]">
          Thank you for using this App!
        </h1>
      </section>

      <section
        className={`${update ? "block" : "hidden"} absolute bg-black/70 bottom-0 top-0 right-0 left-0 rounded-3xl flex justify-center items-center`}
      >
        <article className="bg-black p-4 text-white flex flex-col gap-8">
          <h1 className="text-[1.4rem] text-center">Update {updateType}</h1>
          {updateType === "password" && (
            <article className="flex flex-col gap-2">
              <label className="text-[1.2rem]">Current password</label>
              <input
                className="bg-white text-black p-2"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCurrentPassword(e.target.value)
                }
              ></input>
            </article>
          )}
          <article className="flex flex-col gap-2">
            <label className="text-[1.2rem]">New {updateType}</label>
            <input
              className="bg-white text-black p-2"
              value={newInfo}
              type={setInputType()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewInfo(e.target.value)
              }
            ></input>
          </article>
          {updateType === "password" && (
            <article className="flex flex-col gap-2">
              <label className="text-[1.2rem]">Repeat {updateType}</label>
              <input
                className="bg-white text-black p-2"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
              ></input>
            </article>
          )}
          <section className="flex justify-between w-full">
            <button className="cursor-pointer" onClick={() => setUpdate(false)}>
              Cancel
            </button>
            <button className="cursor-pointer" onClick={() => updateUser()}>
              Update
            </button>
          </section>
        </article>
      </section>
    </div>
  );
}
