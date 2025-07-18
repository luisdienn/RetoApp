import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postRequest } from "../../api";
import { MdOutlineMarkEmailUnread  } from "react-icons/md";

import { useState } from "react";

export default function Confirmation({ RetoLogo }) {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await postRequest("/users/confirmation", {
      user: {
        email: email,
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
                  <MdOutlineMarkEmailUnread  className=" text-white mx-auto mb-2"style={{ fontSize: '8rem' }}/>

            <h2 className="text-2xl font-bold mb-2 text-center">
              Resend Confirmation Email
            </h2>
            <p className="text-sm mb-6 text-center">Enter the email address associated with your account</p>
            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-white/20 backdrop-blur text-white placeholder-white focus:outline-none rounded border border-transparent focus:border-yellow-500"
                  placeholder="your@email.com"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[rgb(143,108,32)] via-[rgb(228,191,86)] to-[rgb(143,108,32)] text-black font-bold py-2 px-4 rounded  shadow-lg hover:brightness-110 transition-all duration-300 cursor-pointer"
              >
                Resend
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
