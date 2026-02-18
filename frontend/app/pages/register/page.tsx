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
        "http://localhost:5000/api/auth/register",
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
    else {
      return showPassword ? "text" : "password";
    }
  };

  return (
    <div className="flex flex-col gap-8 -mt-12">
      <h1 className="text-[48px] text-center">Sign Up</h1>
      <section>
        <form
          className="flex flex-col gap-2 items-center"
          onSubmit={registerUser}
        >
          {inputs.map((e) => (
            <div key={e.id} className="flex flex-col w-full">
              <label htmlFor={e.name} className="text-[2rem] font-extralight">
                {e.label}
              </label>
              <div className="flex flex-col">
                <input
                  id={e.id}
                  name={e.name}
                  value={e.value}
                  type={setInputType(e.name)}
                  className="bg-black text-white p-2"
                  required
                  onChange={handleChange}
                ></input>
                {e.name === "password" && (
                  <article className="flex justify-end mt-1">
                    <p
                      className="text-[0.8rem] cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? "Hide Password" : "Show Password"}
                    </p>
                  </article>
                )}
              </div>
            </div>
          ))}
          <article className="flex gap-2 items-center">
            <input type="checkbox" required></input>
            <label>
              By clicking here you are agreeing to our{" "}
              <a className="underline underline-offset-2">
                Terms and Conditions
              </a>
            </label>
          </article>

          <button
            type="submit"
            className="bg-black text-white py-4 text-[24px] w-fit px-12 cursor-pointer"
          >
            Sign Up
          </button>
        </form>
        <section className="flex flex-col mt-8 gap-8">
          <article className="flex flex-col items-center">
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
