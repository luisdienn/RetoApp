import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateRequest } from "../../api";
import { CgPassword } from "react-icons/cg";
import { IoEye, IoEyeOff } from "react-icons/io5";

import { useState } from "react";

export default function EditPassword({ token, RetoLogo }) {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setConfirmationShowPassword] =
    useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await updateRequest("/users/password", {
      user: {
        password,
        password_confirmation: passwordConfirmation,
        reset_password_token: token,
      },
    });

    if (result.success && result.redirect_url) {
      window.location.href = result.redirect_url;
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center ">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        aria-label={undefined}
      />

      <div className="absolute justify-center items-center flex mx-20">
        <img className="h-64 w-screen blur-xl" src={RetoLogo} />
      </div>
      <div className="relative z-10 w-full flex justify-center  px-4">
        <div className="absolute h-full w-full max-w-md flex justify-center items-center ">
          <div className="bg-black/25 backdrop-blur-md p-6 sm:p-8 shadow-lg w-full text-white rounded-xl">
            <CgPassword
              className=" text-white mx-auto mb-2"
              style={{ fontSize: "8rem" }}
            />

            <h2 className="text-2xl font-bold mb-2 text-center">
              Change your password
            </h2>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className=" w-full pr-10 pl-4 py-2 bg-white/20 backdrop-blur text-white placeholder-white focus:outline-none rounded border border-transparent focus:border-yellow-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-300 hover:text-white focus:outline-none hover:cursor-pointer"
                  >
                    {showPassword ? <IoEyeOff /> : <IoEye />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block mb-1">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmationPassword ? "text" : "password"}
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className="w-full px-4 py-2 bg-white/20 backdrop-blur text-white placeholder-white focus:outline-none rounded border border-transparent focus:border-yellow-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setConfirmationShowPassword(!showConfirmationPassword)
                    }
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-300 hover:text-white focus:outline-none hover:cursor-pointer"
                  >
                    {showConfirmationPassword ? <IoEyeOff /> : <IoEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[rgb(143,108,32)] via-[rgb(228,191,86)] to-[rgb(143,108,32)] text-black font-bold py-2 px-4 rounded  shadow-lg hover:brightness-110 transition-all duration-300 cursor-pointer"
              >
                Change my Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
