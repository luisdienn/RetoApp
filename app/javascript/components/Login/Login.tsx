import React from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { useState } from "react";

import SliderRegistroLogin from "./sliderRegistroLogin";

export default function Login({ CR7, Messi, RetoLogo }) {

  const [isLogin, setIsLogin] = useState(true);
  const [videoSrc, setVideoSrc] = useState(CR7);
  const [videoOpacity, setVideoOpacity] = useState("opacity-70");

  const toggleForm = () => {
    setVideoOpacity("opacity-0");
    setTimeout(() => {
      setIsLogin((prev) => !prev);
      setVideoSrc((prev) => (prev === CR7 ? Messi : CR7));
    }, 500);
    setTimeout(() => {
      setVideoOpacity("opacity-70");
    }, 600);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center px-2">

    <ToastContainer position="top-right" autoClose={3000} theme="dark" aria-label={undefined}/>

      {/* Video de fondo */}

      <video
        key={videoSrc}
        className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-700 ease-in-out ${
          isLogin ? "-scale-x-100" : "scale-x-100"
        } ${videoOpacity}`}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Marca negra */}
      <div
        className={`absolute bottom-0 ${
          isLogin ? "right-0" : "left-0"
        } w-40 h-40 bg-black z-10 transition-all duration-1000 ease-in-out`}
      />

      {/* Logo */}
      <div className="fixed z-50 top-12 justify-center w-full flex px-4">
        <img className="w-40 sm:w-52 md:w-60" src={RetoLogo} />
      </div>

      {/* Formulario */}
      <div className="relative z-10 w-full flex justify-center pt-12 px-4">
        <SliderRegistroLogin isLogin={isLogin} toggleForm={toggleForm} />
      </div>
    </div>
  );
}
