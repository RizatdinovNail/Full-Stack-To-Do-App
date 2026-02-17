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
        "http://localhost:5000/api/auth/login",
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
    <div className="flex flex-col gap-8">
      <h1 className="text-[48px] text-center">
        Welcome to your ultimate todo app
      </h1>
      <article
        className={`${loginError ? "block" : "hidden"} bg-gray-700 py-4 px-8 text-white`}
      >
        <p>
          Your username was invalid, please try again. If you forgot your
          password click{" "}
          <a className="fond-extrabold pointer text-black underline underline-offset-2">
            here.
          </a>
          .
        </p>
      </article>
      <section>
        <form className="flex flex-col gap-4 items-center" onSubmit={loginUser}>
          {inputs.map((e) => (
            <div key={e.id} className="flex flex-col w-full">
              <label htmlFor={e.name} className="text-[2rem] font-extralight">
                {e.label}
              </label>
              <input
                id={e.id}
                name={e.name}
                value={e.value}
                type={setInputType(e.name)}
                className="bg-black text-white p-2 outline-none"
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
          ))}
          <button
            type="submit"
            className="bg-black text-white py-4 text-[24px] w-fit px-12 cursor-pointer"
          >
            Log In
          </button>
        </form>
        <section className="flex flex-col mt-8 gap-8">
          <article className="flex flex-col items-center">
            <p>Don't have an account yet?</p>
            <button
              className="font-bold cursor-pointer"
              onClick={() => switchView(true)}
            >
              Sign Up
            </button>
          </article>
          <article className="flex flex-col items-center">
            <p>Or login with</p>
            <button className="flex items-center gap-2 px-12 py-4 bg-black text-white text-[24px] pointer">
              <span>
                <svg
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  strokeLinejoin="round"
                  strokeMiterlimit="2"
                  width="32"
                  height="32"
                >
                  <path
                    d="M32.582 370.734C15.127 336.291 5.12 297.425 5.12 256c0-41.426 10.007-80.291 27.462-114.735C74.705 57.484 161.047 0 261.12 0c69.12 0 126.836 25.367 171.287 66.793l-73.31 73.309c-26.763-25.135-60.276-38.168-97.977-38.168-66.56 0-123.113 44.917-143.36 105.426-5.12 15.36-8.146 31.65-8.146 48.64 0 16.989 3.026 33.28 8.146 48.64l-.303.232h.303c20.247 60.51 76.8 105.426 143.36 105.426 34.443 0 63.534-9.31 86.341-24.67 27.23-18.152 45.382-45.148 51.433-77.032H261.12v-99.142h241.105c3.025 16.757 4.654 34.211 4.654 52.364 0 77.963-27.927 143.592-76.334 188.276-42.356 39.098-100.305 61.905-169.425 61.905-100.073 0-186.415-57.483-228.538-141.032v-.233z"
                    fill="#fff"
                  />
                </svg>
              </span>

              <p>Google</p>
            </button>
          </article>
        </section>
      </section>
    </div>
  );
}
