import React, { useState, useEffect } from "react";
import { postRequest } from "../../../api";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { RiLoader4Line } from "react-icons/ri";
import { FaRegCircleQuestion } from "react-icons/fa6";

import Select from "react-select";
import { Country, City } from "country-state-city";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showConfirmationPassword, setConfirmationShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);

  const [signupErrors, setSignupErrors] = useState<string[]>([]);

  const [isUser, setIsUser] = useState(true);



  useEffect(() => {
    if (isUser) {
      if (
        email != "" &&
        password != "" &&
        name != "" &&
        passwordConfirmation != ""
      ) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    } else {
      if (
        email != "" &&
        password != "" &&
        phone != "" &&
        country != "" &&
        city != "" &&
        name != "" &&
        passwordConfirmation != ""
      ) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    }
  }, [email, password, phone, country, city, name, passwordConfirmation]);




  const countryOptions = Country.getAllCountries().map((c) => ({
    value: c.isoCode,
    label: c.name,
  }));

  const cityOptions = country
    ? (City.getCitiesOfCountry(country) ?? []).map((city) => ({
        value: city.name,
        label: city.name,
      }))
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    
  const address = `${country}, ${city}`;

    
    let user: any;

    if (isUser) {
      user = {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        role: "user",
      };
    } else {
      user = {
        name,
        email,
        phone,
        address,
        password,
        password_confirmation: passwordConfirmation,
        role: "business",
      };
    }

    console.log("User Data:", user);

    const result = await postRequest("/users", {
      user,
    });
    setLoading(false);

    if (result.success && result.redirect_url) {
      window.location.href = result.redirect_url;
    } else {
      setSignupErrors(result.errors || ["Unknown error."]);
      setTimeout(() => {
        setSignupErrors([]);
      }, 5000);
    }
  };

  return (
    <div>
      <div className="flex justify-center gap-4 mb-4 ">
        <button
          className={`${
            isUser ? "border-b-3 text-[#f9e7b8]" : ""
          } hover:cursor-pointer px-2`}
          onClick={() => setIsUser(true)}
        >
          Player
        </button>
        <button
          className={`${
            isUser ? "" : "border-b-3 text-[#f9e7b8]"
          } hover:cursor-pointer px-2`}
          onClick={() => setIsUser(false)}
        >
          Business
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 pb-4">
          <div className="">
            <label className="block mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-white/20 backdrop-blur text-white placeholder-white focus:outline-none rounded border border-transparent focus:border-yellow-500"
              placeholder="Your Name"
            />
          </div>
          <div>
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
          </div>

          {isUser ? (
            <></>
          ) : (
            <>
              <div className="">
                <label className="block mb-1">Address</label>
                <div className="flex gap-2 w-full">
                  <Select
                    unstyled
                    options={countryOptions}
                    onChange={(val) => setCountry(val?.value || "")}
                    placeholder="Country"
                    classNames={{
                      control: () =>
                        "bg-white/20 backdrop-blur w-[9rem] text-white rounded border border-transparent focus-within:border-yellow-500 px-2",
                      valueContainer: () => "text-white",
                      placeholder: () => "text-white/70",
                      input: () => "text-white",
                      menu: () => "mt-2 bg-black rounded shadow-lg",
                      option: (state) =>
                        `px-3 py-2 cursor-pointer ${
                          state.isFocused ? "bg-white/10" : ""
                        } ${
                          state.isSelected ? "bg-yellow-600/30" : ""
                        } text-white`,
                      singleValue: () => "text-white",
                      indicatorsContainer: () => "text-white",
                    }}
                  />
                  <Select
                    unstyled
                    options={cityOptions}
                    onChange={(val) => setCity(val?.value || "")}
                    isDisabled={!country}
                    placeholder="City"
                    classNames={{
                      control: () =>
                        `bg-white/20 backdrop-blur text-white w-[8rem] rounded border border-transparent px-2 ${
                          country
                            ? "focus-within:border-yellow-500"
                            : "opacity-50"
                        }`,
                      valueContainer: () => "text-white",
                      placeholder: () => "text-white/70",
                      input: () => "text-white",
                      menu: () =>
                        "mt-2 bg-black/80 backdrop-blur rounded shadow-lg",
                      option: (state) =>
                        `px-3 py-2 cursor-pointer ${
                          state.isFocused ? "bg-white/10" : ""
                        } ${
                          state.isSelected ? "bg-yellow-600/30" : ""
                        } text-white`,
                      singleValue: () => "text-white",
                      indicatorsContainer: () => "text-white",
                    }}
                  />
                </div>
              </div>
              <div className="">
                <label className="block mb-1">Phone</label>

                <PhoneInput
                  country={country.toLowerCase()}
                  value={phone}
                  onChange={setPhone}
                  containerClass="w-full"
                  inputClass="!w-full !bg-white/20 !backdrop-blur !text-white placeholder:!text-white/70 !rounded !border !border-transparent focus:!border-yellow-500 !px-12 !py-2"
                  buttonClass="!bg-white/10 hover:!bg-white/20 !border !border-transparent"
                  dropdownClass="!bg-black !text-white"
                  inputStyle={{
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                  buttonStyle={{
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                />
              </div>
            </>
          )}

          <div>
            <label className="block mb-1 flex">
              Password
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
            <label className="block mb-1">Confirm Password</label>
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
        </div>

        {/* Display errors above the login button */}
        {signupErrors.length > 0 && (
          <div className="text-red-500 text-sm">
            {signupErrors.map((error, index) => (
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
              "Sign Up"
            )}
          </div>
        </button>
      </form>
    </div>
  );
}
