"use client";

import { useState } from "react";
import api from "@/app/api/api";

interface NavBarProprs {
  switchView: (value: boolean) => void;
}

export default function NavBar({ switchView }: NavBarProprs) {
  const [theme, setTheme] = useState("Light");
  const [navSection, setOpenNavSection] = useState(false);

  const logOut = () => {
    localStorage.removeItem("token");
    switchView(false);
  };

  const changeTheme = () => {
    return;
  };

  const links = [
    {
      name: "Profile",
      function: changeTheme,
    },
    {
      name: "Log out",
      function: logOut,
    },
  ];

  return (
    <nav className="flex justify-between px-4 items-center">
      <div>
        <button className="bg-black flex gap-4 text-white px-4">
          <span
            className={`${theme === "Dark" ? "bg-white text-black" : "bg-black text-white"} px-2 cursor-pointer`}
            onClick={() => setTheme("Dark")}
          >
            D
          </span>
          <span
            className={`${theme === "Light" ? "bg-white text-black" : "bg-black text-white"} px-2 cursor-pointer`}
            onClick={() => setTheme("Light")}
          >
            L
          </span>
        </button>
      </div>
      <div
        className="bg-black text-white w-12 h-12 rounded-[50%] text-center flex justify-center items-center cursor-pointer relative"
        onClick={() => setOpenNavSection((prev) => !prev)}
      >
        <p>Photo</p>
        <section
          className={`absolute bg-black ${navSection ? "block" : "hidden"} top-14 w-32 right-0`}
        >
          <ul className="flex flex-col p-2 gap-2">
            {links.map((l) => (
              <li
                key={l.name}
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => l.function()}
              >
                <span className="w-4 h-4 bg-white"></span>
                {l.name}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </nav>
  );
}
