import React, { useState } from "react";
import { postRequest } from "../../api";


export default function RegisterForm() {
  // Estado de campos
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");



const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const result = await postRequest("/users", {
    user: {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      role: "user"
    },
  });

  if (result.success && result.redirect_url) {
    window.location.href = result.redirect_url;
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <label className="block mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 bg-white/20 backdrop-blur text-white placeholder-white focus:outline-none rounded border border-transparent focus:border-yellow-500"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 bg-white/20 backdrop-blur text-white placeholder-white focus:outline-none rounded border border-transparent focus:border-yellow-500"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 bg-white/20 backdrop-blur text-white placeholder-white focus:outline-none rounded border border-transparent focus:border-yellow-500"
          placeholder="••••••••"
        />
      </div>
      <div>
        <label className="block mb-1">Confirm Password</label>
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          className="w-full px-4 py-2 bg-white/20 backdrop-blur text-white placeholder-white focus:outline-none rounded border border-transparent focus:border-yellow-500"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-[rgb(143,108,32)] via-[rgb(228,191,86)] to-[rgb(143,108,32)] text-black font-bold py-2 px-4 rounded shadow-lg hover:brightness-110 transition-all duration-300 cursor-pointer"
      >
        Register
      </button>
    </form>
  );
}
