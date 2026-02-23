"use client";
import axios from "axios";
import { useState } from "react";

interface RegisterProps {
  switchView: (value: boolean) => void;
}

export default function Register({ switchView }: RegisterProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

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
      label: "Email",
      name: "email",
      placholder: "Enter your email...",
      value: formData.email,
      type: "email",
      id: "email",
    },
    {
      label: "Password",
      name: "password",
      placholder: "Enter your password...",
      value: formData.password,
      type: "password",
      id: "password",
    },
    {
      label: "Repeat Password",
      name: "repeatPassword",
      placholder: "Repeat your password...",
      value: formData.repeatPassword,
      type: "password",
      id: "repeatPassword",
    },
  ];

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
        formData,
        { headers: { "Content-Type": "application/json" } },
      );
      console.log("User addded successfully");
      switchView(false);
    } catch (error) {
      console.error("Error creting user", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setInputType = (type: string) => {
    if (type === "username") return "text";
    else if (type === "email") return "email";
    else {
      return showPassword ? "text" : "password";
    }
  };

  return (
    <div className="flex flex-col gap-8 -mt-12 z-2">
      <h1 className="text-[48px] text-center text-(--headers)">Sign Up</h1>
      <section>
        <form
          className="flex flex-col gap-2 items-center"
          onSubmit={registerUser}
        >
          <section className="flex flex-col w-full gap-6">
            {inputs.map((e) => (
              <div key={e.id} className="flex flex-col w-full">
                <label
                  htmlFor={e.name}
                  className="text-[24px] font-extralight text-(--inputLabels)"
                >
                  {e.label}
                </label>
                <div className="flex flex-col">
                  <input
                    id={e.id}
                    name={e.name}
                    value={e.value}
                    type={setInputType(e.name)}
                    className="bg-(--inputFields) text-[1.2rem] p-2 outline-none rounded-xl text-(--icons)"
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
              </div>
            ))}
          </section>

          <article className="flex gap-2 items-center">
            <input type="checkbox" className="cursor-pointer" required></input>
            <label className="text-(--smallText) font-light">
              By clicking here you are agreeing to our{" "}
              <a className="underline underline-offset-2 text(--links) font-normal cursor-pointer">
                Terms and Conditions
              </a>
            </label>
          </article>

          <button
            type="submit"
            className="bg-(--button) text-(--buttonText) mt-8 rounded-xl py-1 text-[24px] w-fit px-24 cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <section className="flex flex-col mt-8 gap-8 absolute bottom-4 left-0 right-0">
          <article className="flex flex-col items-center text-(--smallText)">
            <p>Do you have an account?</p>
            <button
              className="font-bold cursor-pointer"
              onClick={() => switchView(true)}
            >
              Log in
            </button>
          </article>
        </section>
      </section>
    </div>
  );
}
