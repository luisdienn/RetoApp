import React from "react";

import { updateRequest } from "../../api";
import { CgPassword } from "react-icons/cg";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState, useEffect } from "react";
import { RiLoader4Line } from "react-icons/ri";
import { FaRegCircleQuestion } from "react-icons/fa6";


export default function EditPassword({ token, RetoLogo }) {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setConfirmationShowPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  useEffect(() => {
    if (password != "" && passwordConfirmation != "") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [password, passwordConfirmation]);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);

    e.preventDefault();

    const result = await updateRequest("/users/password", {
      user: {
        password,
        password_confirmation: passwordConfirmation,
        reset_password_token: token,
      },
    });
    setLoading(false);

    if (result.success && result.redirect_url) {
      window.location.href = result.redirect_url;
    } else {
      setPasswordErrors(result.errors || ["Unknown error."]);
      setTimeout(() => {
        setPasswordErrors([]);
      }, 5000);
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center ">


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
                <label className="block mb-1 flex">
                  New Password{" "}
                  <span className="ml-2 relative group cursor-pointer">
                    <span className="flex pt-1">
                      <FaRegCircleQuestion />
                    </span>
                    {/* Tooltip content */}
                    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block text-sm text-white bg-black px-4 py-2 rounded shadow-lg w-max max-w-xs">
                      <ul>
                        <li>Minimum is 6 characters</li>
                        <li>Password must contain:</li>
                        <li>● 1 lowercase letter</li>
                        <li>● 1 uppercase letter</li>
                        <li>● 1 number</li>
                        <li>● 1 special character</li>
                      </ul>
                    </span>
                  </span>
                </label>
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

              {/* Display errors above the login button */}
              {passwordErrors.length > 0 && (
                <div className="text-red-500 text-sm">
                  {passwordErrors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}

              <button
                type="submit"
                className={`w-full text-black font-bold py-2 px-4 rounded  shadow-lg ${
                  disable
                    ? "bg-gradient-to-r from-[rgba(129, 129, 129, 1)] via-[rgb(192,192,192)] to-[rgba(129, 129, 129, 1)] cursor-not-allowed "
                    : "bg-gradient-to-r from-[rgba(143, 108, 32, 1)] via-[rgb(228,191,86)] to-[rgba(143, 108, 32, 1)] hover:brightness-110 transition-all duration-300 cursor-pointer"
                } `}
                disabled={loading ? true : disable}
              >
                <div className="flex items-center justify-center">
                  {loading ? (
                    <div className="cursor-not-allowed">
                      <RiLoader4Line className="loader text-2xl" />
                    </div>
                  ) : (
                    "Change my Password"
                  )}
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
