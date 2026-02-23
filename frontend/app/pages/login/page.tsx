"use client";
import axios from "axios";
import { useState } from "react";

interface LoginProps {
  switchView: (value: boolean) => void;
}

export default function Login({ switchView }: LoginProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputs = [
    {
      label: "Username",
      name: "username",
      placholder: "Enter your username...",
      value: formData.username,
      type: "text",
      id: "username",
    },
    {
      label: "Password",
      name: "password",
      placholder: "Enter your password...",
      value: formData.password,
      type: "password",
      id: "password",
    },
  ];

  const setInputType = (type: string) => {
    if (type === "username") return "text";
    else {
      return showPassword ? "text" : "password";
    }
  };

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
        formData,
        { headers: { "Content-Type": "application/json" } },
      );
      const token = res.data.token;
      localStorage.setItem("token", token);
      console.log("User logged in");
      switchView(false);
    } catch (error) {
      console.error("Error login the user", error);
      setLoginError(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-8 z-2">
      <h1 className="text-[48px] text-center text-(--headers) font-bold">
        Welcome to your ultimate todo app!
      </h1>
      <article
        className={`${loginError ? "block" : "hidden"} bg-gray-700 py-4 px-8 text-(--smallText)`}
      >
        <p>
          Your username was invalid, please try again. If you forgot your
          password click{" "}
          <a className="fond-bold cursor-pointer text-(--links) underline underline-offset-2">
            here.
          </a>
        </p>
      </article>
      <section>
        <form className="flex flex-col gap-4 items-center" onSubmit={loginUser}>
          {inputs.map((e) => (
            <div key={e.id} className="flex flex-col w-full">
              <label
                htmlFor={e.name}
                className="text-[2rem] font-light text-(--inputLabels)"
              >
                {e.label}
              </label>
              <input
                id={e.id}
                name={e.name}
                value={e.value}
                autoComplete="off"
                type={setInputType(e.name)}
                className="bg-(--inputFields) p-2 outline-none rounded-xl text-(--icons) text-[1.2rem]"
                required
                onChange={handleChange}
              ></input>
              {e.name === "password" && (
                <article className="flex justify-end mt-1">
                  <p
                    className="text-[0.8rem] cursor-pointer text-(--smallText)"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? "Hide Password" : "Show Password"}
                  </p>
                </article>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="bg-(--button) text-(--buttonText) rounded-xl py-1 text-[24px] w-fit px-24 cursor-pointer"
          >
            Log In
          </button>
        </form>
        <section className="flex flex-col mt-8 gap-8 absolute bottom-4 left-0 right-0">
          <article className="flex flex-col items-center text-(--smallText)">
            <p>Don't have an account yet?</p>
            <button
              className="font-bold cursor-pointer underline underline-offset-2 decoration-2"
              onClick={() => switchView(true)}
            >
              Sign Up
            </button>
          </article>
        </section>
      </section>
    </div>
  );
}
