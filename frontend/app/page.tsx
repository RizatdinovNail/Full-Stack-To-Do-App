"use client";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main>
      <form className="flex flex-col gap-4 p-8" onSubmit={registerUser}>
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
  );
}
