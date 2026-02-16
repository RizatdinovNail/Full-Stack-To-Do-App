"use client";

import { useState } from "react";

interface profileProps {
  switchView: (value: boolean) => void;
}

export default function Profile({ switchView }: profileProps) {
  const [showPassword, setShowPassword] = useState(false);
  const infoLinks = [
    {
      name: "Name",
      value: "",
    },
    {
      name: "Email",
      value: "",
    },
    {
      name: "Password",
      value: "",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <section className="flex justify-between gap-8">
        <div className="bg-black w-40 h-48"></div>
        <article>
          <h1 className="text-center text-[1.5rem]">Stats</h1>
          <article>
            <p className="text-[1rem]">Completed To-Dos: 145</p>
            <p className="text-[1rem]">To-Dos to complete: 145</p>
          </article>
        </article>
      </section>
      <section>
        <h1 className="text-[1.5rem]">Information</h1>
        <section className="flex flex-col gap-4">
          {infoLinks.map((l) => (
            <article>
              <h2>{l.name}</h2>
              <section className="bg-black text-white p-2 flex justify-between gap-2">
                <input value={l.value} readOnly className="w-full"></input>
                <button className="bg-white text-black py-1 px-4">Edit</button>
              </section>
              {l.name === "Password" && (
                <article className="flex justify-between mt-1">
                  <p className="text-[0.8rem] cursor-pointer">Show password</p>
                  <p className="text-[0.8rem] cursor-pointer">
                    Change password
                  </p>
                </article>
              )}
            </article>
          ))}
        </section>
      </section>
      <section className="flex justify-center items-center">
        <h1 className="text-center text-[2.2rem] w-[70%]">
          Thank you for using this App!
        </h1>
      </section>
    </div>
  );
}
