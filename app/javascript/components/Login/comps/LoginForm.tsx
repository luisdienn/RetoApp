import React, { useState, useEffect } from "react";
import { postRequest } from "../../../api";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { RiLoader4Line } from "react-icons/ri";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [loginErrors, setLoginErrors] = useState<string[]>([]);

  useEffect(() => {
    if (email != "" && password != "") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    const result = await postRequest("/users/sign_in", {
      user: {
        email,
        password,
      },
    });

    setLoading(false);

    if (result.success && result.redirect_url) {
      window.location.href = result.redirect_url;
    } else {
      setLoginErrors(result.errors || ["Unknown error."]);
      setTimeout(() => {
        setLoginErrors([]);
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className=" block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" w-full px-4 py-2 bg-white/20 backdrop-blur text-white placeholder-white focus:outline-none rounded border border-transparent focus:border-yellow-500"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label className=" block mb-1">Password</label>
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
        <span
          className=" text-gray-300 hover:text-gray-200 hover:underline cursor-pointer"
          onClick={() => (window.location.href = "/users/password/new")}
        >
          Forgot your password?
        </span>
      </div>

      {/* Display errors above the login button */}
      {loginErrors.length > 0 && (
        <div className="text-red-500 text-sm">
          {loginErrors.map((error, index) => (
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
            "Log In"
          )}
        </div>
      </button>
    </form>
  );
}
