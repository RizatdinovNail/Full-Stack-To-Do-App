"use client";

import { useState } from "react";
import api from "@/app/api/api";

interface NavBarProprs {
  switchView: (value: boolean) => void;
}

export default function NavBar({ switchView }: NavBarProprs) {
  const [theme, setTheme] = useState("Dark");
  const [navSection, setOpenNavSection] = useState(false);

  const logOut = () => {
    localStorage.removeItem("token");
    switchView(false);
  };

  const changeTheme = () => {
    switchView(true);
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
        <section className="bg-(--button) flex items-center rounded-xl relative">
          <span
            className={`${theme === "Light" ? "" : ""} p-2 cursor-pointer z-2`}
            onClick={() => setTheme("Light")}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_36_211)">
                <path
                  d="M12.1094 1.00912V3.02734M12.1094 21.1914V23.2096M4.2585 4.25846L5.69145 5.69141M18.5274 18.5273L19.9603 19.9603M1.00916 12.1094H3.02738M21.1914 12.1094H23.2097M4.2585 19.9603L5.69145 18.5273M18.5274 5.69141L19.9603 4.25846M17.155 12.1094C17.155 14.896 14.896 17.1549 12.1094 17.1549C9.32282 17.1549 7.06384 14.896 7.06384 12.1094C7.06384 9.32278 9.32282 7.0638 12.1094 7.0638C14.896 7.0638 17.155 9.32278 17.155 12.1094Z"
                  stroke="#1C2428"
                  stroke-width="2.01823"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_36_211">
                  <rect width="24.2187" height="24.2187" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
          <span
            className={`${theme === "Dark" ? "" : ""} p-2 cursor-pointer z-2`}
            onClick={() => setTheme("Dark")}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.1914 12.9066C21.0327 14.6243 20.388 16.2613 19.3329 17.626C18.2778 18.9907 16.8558 20.0267 15.2333 20.6127C13.6109 21.1988 11.8551 21.3106 10.1714 20.9352C8.48772 20.5598 6.94577 19.7126 5.72599 18.4928C4.5062 17.273 3.65903 15.7311 3.28361 14.0474C2.90818 12.3637 3.02003 10.6079 3.60607 8.98546C4.19211 7.36301 5.22809 5.94103 6.5928 4.88588C7.95751 3.83074 9.5945 3.18608 11.3122 3.02734C10.3065 4.3879 9.82261 6.06422 9.94843 7.75143C10.0742 9.43863 10.8015 11.0246 11.9978 12.221C13.1942 13.4173 14.7802 14.1445 16.4674 14.2704C18.1546 14.3962 19.8309 13.9122 21.1914 12.9066Z"
                stroke="#1C2428"
                stroke-width="2.01823"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <section
            className={`${theme === "Dark" ? "right-0" : "right-[50%]"} bg-(--buttonText) rounded-xl transition-all duration-300 w-[50%] h-full absolute`}
          ></section>
        </section>
      </div>
      <div
        className="bg-(--button) text-white w-12 h-12 rounded-[50%] text-center flex justify-center items-center cursor-pointer relative"
        onClick={() => setOpenNavSection((prev) => !prev)}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 18C16.35 18 14.9375 17.4125 13.7625 16.2375C12.5875 15.0625 12 13.65 12 12C12 10.35 12.5875 8.9375 13.7625 7.7625C14.9375 6.5875 16.35 6 18 6C19.65 6 21.0625 6.5875 22.2375 7.7625C23.4125 8.9375 24 10.35 24 12C24 13.65 23.4125 15.0625 22.2375 16.2375C21.0625 17.4125 19.65 18 18 18ZM6 30V25.8C6 24.95 6.21875 24.1687 6.65625 23.4562C7.09375 22.7437 7.675 22.2 8.4 21.825C9.95 21.05 11.525 20.4688 13.125 20.0812C14.725 19.6937 16.35 19.5 18 19.5C19.65 19.5 21.275 19.6937 22.875 20.0812C24.475 20.4688 26.05 21.05 27.6 21.825C28.325 22.2 28.9062 22.7437 29.3438 23.4562C29.7812 24.1687 30 24.95 30 25.8V30H6ZM9 27H27V25.8C27 25.525 26.9312 25.275 26.7938 25.05C26.6562 24.825 26.475 24.65 26.25 24.525C24.9 23.85 23.5375 23.3438 22.1625 23.0063C20.7875 22.6688 19.4 22.5 18 22.5C16.6 22.5 15.2125 22.6688 13.8375 23.0063C12.4625 23.3438 11.1 23.85 9.75 24.525C9.525 24.65 9.34375 24.825 9.20625 25.05C9.06875 25.275 9 25.525 9 25.8V27ZM18 15C18.825 15 19.5313 14.7063 20.1188 14.1187C20.7063 13.5312 21 12.825 21 12C21 11.175 20.7063 10.4688 20.1188 9.88125C19.5313 9.29375 18.825 9 18 9C17.175 9 16.4688 9.29375 15.8813 9.88125C15.2937 10.4688 15 11.175 15 12C15 12.825 15.2937 13.5312 15.8813 14.1187C16.4688 14.7063 17.175 15 18 15Z"
            fill="#1C2428"
          />
        </svg>

        <section
          className={`absolute bg-(--button) rounded-xl ${navSection ? "block" : "hidden"} top-14 w-32 right-0`}
        >
          <ul className="flex flex-col p-2 gap-2">
            {links.map((l) => (
              <li
                key={l.name}
                className="flex items-center gap-4 cursor-pointer text-[20px] text-(--headers)"
                onClick={() => l.function()}
              >
                <span className="w-4 h-4 bg-(--headers) rounded-full"></span>
                {l.name}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </nav>
  );
}
