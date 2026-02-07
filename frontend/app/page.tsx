"use client";
import axios from "axios";
import { useState } from "react";
import Login from "./pages/login/page";
import Register from "./pages/register/page";

export default function Home() {
  /*const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        { headers: { "Content-Type": "application/json" } },
      );
      console.log("User addded successfully");
    } catch (error) {
      console.error("Error creting user", error);
    }
  };

  const loginUser = async (e) => {
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
    } catch (error) {
      console.error("Error login the user", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main>
      <form className="flex flex-col gap-4 p-8" onSubmit={loginUser}>
        <label>Name</label>
        <input
          className="bg-white text-black"
          id="name"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
        ></input>
        <label>Email</label>
        <input
          className="bg-white text-black"
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          className="bg-white text-black"
          id="password"
          name="password"
          type="text"
          required
          value={formData.password}
          onChange={handleChange}
        ></input>

        <button type="submit">Submit</button>
      </form>
    </main>
  );*/
  const [activeView, setActiveView] = useState("login"); // or "register"

  return (
    <main className="flex w-full justify-around h-screen items-center">
      <div className="w-105 h-228 border relative bg-white text-black px-4.5 py-20 rounded-3xl flex justify-center">
        {activeView === "login" && (
          <Login switchView={() => setActiveView("register")} />
        )}
        {activeView === "register" && (
          <Register switchView={() => setActiveView("login")} />
        )}
      </div>
      <div className="text-white">
        For better experience switch to phone mod or scan this QR code
      </div>
    </main>
  );
}
