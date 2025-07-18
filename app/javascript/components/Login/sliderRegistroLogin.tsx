import React from "react";

import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface Props {
  isLogin: boolean;
  toggleForm: () => void;
}

export default function SliderRegistroLogin({ isLogin, toggleForm }: Props) {
  const [transitioning, setTransitioning] = useState(false);
  const [activeForm, setActiveForm] = useState<"login" | "register">("login");

  useEffect(() => {
    setTransitioning(true);
    const timeout = setTimeout(() => {
      setActiveForm(isLogin ? "login" : "register");
      setTransitioning(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [isLogin]);

  return (
    <div className="absolute h-full w-full max-w-md flex justify-center items-center z-10 transition-opacity duration-700 px-4">
      <div
        className={`bg-white/5 backdrop-blur-md p-6 sm:p-8 shadow-lg w-full text-white rounded-xl overflow-hidden transition-opacity duration-1000 ease-in-out ${
          transitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <h2
          className={`text-2xl font-bold mb-6 text-center ${
            transitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          {isLogin ? "Welcome Back!" : "Create A New Account"}
        </h2>

        {activeForm === "login" ? <LoginForm /> : <RegisterForm />}

        <p
          className={`mt-6 text-center text-sm ${
            transitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleForm}
            className="cantarell-bold text-gray-300 hover:text-gray-200 font-semibold ml-1 underline cursor-pointer"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </p>
        <p
          className={`text-center text-sm  ${
            transitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          {isLogin ? (
            <span
              className="cantarell-regular text-gray-300 hover:text-gray-200 hover:underline hover:cursor-pointer"
              onClick={() => (window.location.href = "/users/unlock/new")}
            >
              Didn't receive unlock instructions?
            </span>
          ) : (
            <span
              className="cantarell-regular text-gray-300 hover:text-gray-200 hover:underline hover:cursor-pointer"
              onClick={() => (window.location.href = "/users/confirmation/new")}
            >
              Didn't receive confirmation instructions?
            </span>
          )}
        </p>

      </div>
    </div>
  );
}
