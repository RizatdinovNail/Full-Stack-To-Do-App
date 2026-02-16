"use client";
import axios from "axios";
import { useState } from "react";
import Login from "./pages/login/page";
import Register from "./pages/register/page";
import MainPage from "./pages/main/page";
import NavBar from "./pages/navbar/page";
import Profile from "./pages/profile/page";
import Footer from "./pages/footer/page";

export default function Home() {
  const [activeView, setActiveView] = useState("login"); // or "register"

  return (
    <main className="flex w-full justify-around items-center pt-1 max-[430px]:pt-0 max-[430px]:bg-white bg-black h-screen max-[430px]:h-auto">
      <div className="w-105 h-228 border relative bg-white text-black px-4.5 py-20 rounded-3xl flex justify-center max-[430px]:w-full max-[430px]:h-auto max-[430px]:rounded-none max-[430px]:border-none">
        {activeView === "login" && (
          <Login
            switchView={(reg = true) => {
              if (reg == true) setActiveView("register");
              else setActiveView("mainPage");
            }}
          />
        )}
        {activeView !== "login" && activeView !== "register" && (
          <div className="absolute top-4 w-full">
            <NavBar
              switchView={(profile = true) => {
                if (profile == true) setActiveView("profile");
                else setActiveView("login");
              }}
            />
          </div>
        )}
        {activeView === "profile" && (
          <Profile
            switchView={() => {
              setActiveView("mainPage");
            }}
          />
        )}

        {activeView === "register" && (
          <Register
            switchView={() => {
              setActiveView("login");
            }}
          />
        )}
        {activeView === "mainPage" && (
          <MainPage switchView={() => setActiveView("login")} />
        )}
        {activeView === "profile" && (
          <div className="absolute bottom-4 w-full">
            <Footer />
          </div>
        )}
      </div>
      <div className="text-white lg:block hidden">
        For better experience switch to phone mod or scan this QR code
      </div>
    </main>
  );
}
