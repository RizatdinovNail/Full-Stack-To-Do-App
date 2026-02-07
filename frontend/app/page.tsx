"use client";
import axios from "axios";
import { useState } from "react";
import Login from "./pages/login/page";
import Register from "./pages/register/page";
import MainPage from "./pages/main/page";

export default function Home() {
  const [activeView, setActiveView] = useState("mainPage"); // or "register"

  return (
    <main className="flex w-full justify-around h-screen items-center">
      <div className="w-105 h-228 border relative bg-white text-black px-4.5 py-20 rounded-3xl flex justify-center">
        {activeView === "login" && (
          <Login switchView={() => setActiveView("register")} />
        )}
        {activeView === "register" && (
          <Register switchView={() => setActiveView("login")} />
        )}
        {activeView === "mainPage" && (
          <MainPage switchView={() => setActiveView("login")} />
        )}
      </div>
      <div className="text-white">
        For better experience switch to phone mod or scan this QR code
      </div>
    </main>
  );
}
