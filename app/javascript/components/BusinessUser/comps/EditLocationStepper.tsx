"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Country, City } from "country-state-city";
import Select from "react-select";
import {
  FaWheelchair,
  FaParking,
  FaShower,
  FaLightbulb,
} from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { PiSolarRoof, PiChairFill, PiSoccerBall } from "react-icons/pi";
import { GiLockers } from "react-icons/gi";
import { RiImageAddLine, RiLoader4Line } from "react-icons/ri";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { updateRequest } from "../../../api";


const GOLD = "#ddc68b";

const stepWrap = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { type: "spring" as const, stiffness: 260, damping: 22 },
};

const labelClass = "block text-sm font-medium mb-1 text-black";
const inputBase =
  "w-full rounded-md border border-black/10 bg-white px-3 py-2 text-black placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-[" +
  GOLD +
  "] focus:border-transparent";

const timeOptions = Array.from({ length: 24 }, (_, i) => {
  const h = String(i).padStart(2, "0");
  return `${h}:00`;
});

const tagOptions = [
  { key: "Accessibility", label: "Accessibility", Icon: FaWheelchair },
  { key: "Free Parking", label: "Free Parking", Icon: FaParking },
  { key: "Snacks", label: "Snacks", Icon: MdFastfood },
  { key: "Locker", label: "Locker", Icon: GiLockers },
  { key: "Shower", label: "Shower", Icon: FaShower },
  { key: "Lighting", label: "Lighting", Icon: FaLightbulb },
  { key: "Indoor", label: "Indoor", Icon: PiSolarRoof },
  { key: "Equipment Rental", label: "Equipment Rental", Icon: PiSoccerBall },
  { key: "Changing Rooms", label: "Changing Rooms", Icon: PiChairFill },
];

function toHHMM(value?: string | null): string {
  if (!value) return "";
  const m = String(value).match(/(\d{2}):(\d{2})/);
  return m ? `${m[1]}:${m[2]}` : "";
}

function toNum(v?: number | string | null): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = typeof v === "number" ? v : parseFloat(v);
  return Number.isFinite(n) ? n : null;
}

function splitAddress(addr?: string | null): { country: string; city: string } {
  if (!addr) return { country: "", city: "" };
  const parts = addr
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const country = parts[0] ?? "";
  const city = parts.slice(1).join(", ");
  return { country, city };
}

export default function EditLocationStepper({ onClose, location }:any) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // --- Step 1 ---
  const [name, setName] = useState(location?.name ?? "");
  const [phone, setPhone] = useState(location?.phone ?? "");
  const [details, setDetails] = useState(location?.details ?? "");
  const [openTime, setOpenTime] = useState<string>(toHHMM(location?.open_time));
  const [closeTime, setCloseTime] = useState<string>(
    toHHMM(location?.close_time)
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    location?.tags ?? []
  );

  // --- Step 2 ---
  const initAddr = splitAddress(location?.address);
  const [country, setCountry] = useState<string>(initAddr.country);
  const [city, setCity] = useState<string>(initAddr.city);
  const [lat, setLat] = useState<number | null>(toNum(location?.latitude));
  const [lng, setLng] = useState<number | null>(toNum(location?.longitude));

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

  // --- Step 3 ---
  const [files, setFiles] = useState<(string | File)[]>(location?.images ?? []);
  const [errors, setErrors] = useState<string[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  function removeFile(idx: any) {
    setFiles((prev) => {
      const removed = prev[idx];
      if (typeof removed === "string")
        setRemovedImages((imgs) => [...imgs, removed]);
      return prev.filter((_, i) => i !== idx);
    });
  }

  // Google Maps loader
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_API_KEY || "",
    libraries: ["places"],
  });

  const center = useMemo(
    () => ({ lat: lat ?? 9.9281, lng: lng ?? -84.0907 }),
    [lat, lng]
  ); 

  // Validations
  function parseTimeStr(t:string) {
    if (!t) return null;
    const [hh, mm] = t.split(":");
    return Number(hh) * 60 + Number(mm);
  }

  const step1Valid =
    name.trim().length > 1 &&
    phone.trim().length > 0 &&
    details.trim().length > 0 &&
    !!openTime &&
    !!closeTime &&
    parseTimeStr(openTime) !== null &&
    parseTimeStr(closeTime) !== null &&
    parseTimeStr(closeTime)! > parseTimeStr(openTime)! &&
    selectedTags.length > 0;

  const step2Valid = country && city && lat != null && lng != null;

  const step3Valid = files.length > 0;

  const canNext =
    step === 1 ? step1Valid : step === 2 ? step2Valid : step3Valid;

  function toggleTag(key:any) {
    setSelectedTags((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  function onDropFiles(newFiles: FileList | File[]) {
    const ok: File[] = [];
    const errs: string[] = [];
    Array.from(newFiles as File[]).forEach((f: File) => {
      if (["image/png", "image/jpeg"].includes(f.type)) ok.push(f);
      else errs.push("Only JPG and PNG files are allowed.");
    });
    if (errs.length) {
      setErrors(errs);
      setTimeout(() => setErrors([]), 5000);
    }
    if (ok.length) setFiles((prev) => [...prev, ...ok]);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const address = `${country}, ${city}`;

      const fd = new FormData();

      fd.append("location[name]", name ?? "");
      fd.append("location[phone]", phone ?? "");
      fd.append("location[details]", details ?? "");
      fd.append("location[address]", address);
      fd.append("location[open_time]", openTime);
      fd.append("location[close_time]", closeTime);

      if (lat != null) fd.append("location[latitude]", String(lat));
      if (lng != null) fd.append("location[longitude]", String(lng));

      (selectedTags ?? []).forEach((t: string) => {
        fd.append("location[tags][]", t);
      });

      (files ?? []).forEach((file) => {
        if (file instanceof File) {
          fd.append("location[images][]", file);
        }
      });

      removedImages.forEach((url) => {
        fd.append("location[remove_images][]", url);
      });

      const result = await updateRequest(`/locations/${location.id}`, fd);

      if (result.success && result.redirect_url) {
        window.location.href = result.redirect_url;
        return;
      }

      if (!result.success) {
        console.error(result.errors);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-full justify-center ">
      {/* Header  stepper */}
      <div className="flex items-center gap-3 mb-6 justify-center">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex items-center gap-10">
            <div
              className={`h-9 w-9 grid place-items-center rounded-full border transition-all ${
                step >= n
                  ? `bg-[${GOLD}] text-black border-[${GOLD}]`
                  : "bg-white text-black border-black/20"
              }`}
            >
              <span className="text-sm font-semibold">{n}</span>
            </div>
            {n < 3 && (
              <div
                className={`h-px w-12 ${
                  step > n ? `bg-[${GOLD}]` : "bg-black/20"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-black/10 shadow-sm p-4 md:p-6 ">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" {...stepWrap}>
              <h2 className="text-xl font-semibold text-black mb-4">
                Business details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
                {/* name */}
                <div className="mb-4">
                  <label className={labelClass}>Name</label>
                  <input
                    type="text"
                    className={inputBase}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="My Soccer Center"
                  />
                </div>

                {/* phone */}
                <div className="mb-4">
                  <label className={labelClass}>Phone</label>
                  <PhoneInput
                    country={"cr"}
                    value={phone}
                    onChange={setPhone}
                    containerClass="w-full"
                    inputClass="!w-full !bg-white !text-black placeholder:!text-black/50 !rounded-md !border !border-black/10 focus:!border-transparent !py-2 !px-12 !focus:!ring-2 !focus:!ring-[#ddc68b]"
                    buttonClass="!bg-white hover:!bg-black/5 !border !border-black/10"
                    dropdownClass="!bg-white !text-black"
                    inputStyle={{
                      backgroundColor: "white",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                    buttonStyle={{
                      backgroundColor: "white",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  />
                </div>

                {/* details */}
                <div className="mb-4">
                  <label className={labelClass}>Details</label>
                  <textarea
                    className={inputBase}
                    rows={2}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="General Info..."
                  />
                </div>

                {/* open/close time */}
                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Open time</label>
                    <select
                      className={inputBase}
                      value={openTime}
                      onChange={(e) => setOpenTime(e.target.value)}
                    >
                      <option value="">Select...</option>
                      {timeOptions.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Close time</label>
                    <select
                      className={inputBase}
                      value={closeTime}
                      onChange={(e) => setCloseTime(e.target.value)}
                    >
                      <option value="">Select...</option>
                      {timeOptions.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {openTime &&
                      closeTime &&
                      parseTimeStr(closeTime) !== null &&
                      parseTimeStr(openTime) !== null &&
                      parseTimeStr(closeTime)! <= parseTimeStr(openTime)! && (
                        <p className="mt-1 text-sm text-red-600">
                          Close time must be after open time.
                        </p>
                      )}
                  </div>
                </div>
              </div>

              {/* tags grid 3x3 */}
              <div className="mb-2">
                <label className={labelClass}>Tags</label>
                <div className="grid grid-cols-3 gap-3">
                  {tagOptions.map(({ key, label, Icon }) => {
                    const active = selectedTags.includes(key);
                    return (
                      <button
                        type="button"
                        key={key}
                        onClick={() => toggleTag(key)}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-2 transition ${
                          active
                            ? `border-[${GOLD}] bg-[${GOLD}] text-black`
                            : "border-black/10 bg-white text-black hover:border-black/30"
                        }`}
                      >
                        <Icon />
                        <span className="text-sm">{label}</span>
                      </button>
                    );
                  })}
                </div>
                {selectedTags.length === 0 && (
                  <p className="mt-1 text-sm text-red-600">
                    Select at least one tag.
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" {...stepWrap}>
              <h2 className="text-xl font-semibold text-black mb-4">
                Address & map
              </h2>

              {/* country & city */}
              <div className="mb-4">
                <label className={labelClass}>Address (Country / City)</label>
                <div className="flex gap-2 w-full">
                  <Select
                    unstyled
                    options={countryOptions}
                    onChange={(val) => setCountry(val?.value || "")}
                    placeholder={country}
                    classNames={{
                      control: () =>
                        `bg-white w-[9rem] rounded border border-black/10 px-2 focus-within:ring-2 focus-within:ring-[${GOLD}]`,
                      valueContainer: () => "text-black",
                      placeholder: () => "text-black/50",
                      input: () => "text-black",
                      menu: () => "mt-2 bg-white text-black rounded shadow-lg",
                      option: (state) =>
                        `px-3 py-2 cursor-pointer ${
                          state.isFocused ? "bg-white/10" : ""
                        } ${state.isSelected ? "bg-[#ddc68b]/30" : ""}`,
                      singleValue: () => "text-black",
                      indicatorsContainer: () => "text-black",
                    }}
                  />

                  <Select
                    unstyled
                    options={cityOptions}
                    onChange={(val) => setCity(val?.value || "")}
                    isDisabled={!country}
                    placeholder={city}
                    classNames={{
                      control: () =>
                        `bg-white text-black w-[12rem] rounded border border-black/10 px-2 ${
                          country
                            ? `focus-within:ring-2 focus-within:ring-[${GOLD}]`
                            : "opacity-50"
                        }`,
                      valueContainer: () => "text-black",
                      placeholder: () => "text-black/50",
                      input: () => "text-black",
                      menu: () => "mt-2 bg-white text-black rounded shadow-lg",
                      option: (state) =>
                        `px-3 py-2 cursor-pointer ${
                          state.isFocused ? "bg-white/10" : ""
                        } ${state.isSelected ? "bg-[#ddc68b]/30" : ""}`,
                      singleValue: () => "text-black",
                      indicatorsContainer: () => "text-black",
                    }}
                  />
                </div>
              </div>

              {/* Map */}
              <div className="mb-4">
                <label className={labelClass}>Pin on map</label>
                <div className="h-64 w-full rounded-lg overflow-hidden border border-black/10">
                  {isLoaded ? (
                    <GoogleMap
                      mapContainerStyle={{ width: "100%", height: "100%" }}
                      center={center}
                      zoom={13}
                      onClick={(e) => {
                        const latLng = e.latLng;
                        if (!latLng) return;
                        setLat(latLng.lat());
                        setLng(latLng.lng());
                      }}
                      options={{
                        disableDefaultUI: true,
                        clickableIcons: false,
                        styles: [],
                      }}
                    >
                      {lat != null && lng != null && (
                        <Marker position={{ lat, lng }} />
                      )}
                    </GoogleMap>
                  ) : (
                    <div className="grid place-items-center h-full text-black">
                      Loading map…
                    </div>
                  )}
                </div>

                {!(lat != null && lng != null) && (
                  <p className="mt-1 text-sm text-red-600">
                    Click on the map to set a pin.
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" {...stepWrap}>
              <h2 className="text-xl font-semibold text-black mb-4">Photos</h2>

              <div className="mb-4">
                <label className={labelClass}>Upload images</label>

                <div
                  className="flex flex-col items-center justify-center w-full min-h-32 border-2 border-dashed border-black/20 rounded-lg bg-white text-black hover:border-[#ddc68b] hover:bg-[#fdf9ee] transition cursor-pointer p-4"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    onDropFiles(e.dataTransfer.files);
                  }}
                  onClick={() =>
                    document.getElementById("location-image-upload")?.click()
                  }
                >
                  <RiImageAddLine className="text-3xl mb-2" />
                  <p className="text-sm opacity-70">
                    Drag & drop or click to select (JPG/PNG)
                  </p>
                  {!!files.length && (
                    <p className="text-xs mt-2 opacity-70">
                      Selected: {files.length} file(s)
                    </p>
                  )}
                </div>

                <input
                  id="location-image-upload"
                  type="file"
                  accept="image/png, image/jpeg"
                  multiple
                  onChange={(e) => {
                    const f = e.target.files;
                    if (f) onDropFiles(f);
                  }}
                  className="hidden"
                />

                {errors.map((er, i) => (
                  <p key={i} className="mt-2 text-sm text-red-600">
                    {er}
                  </p>
                ))}

                {/* Previews */}
                {files.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {files.map((f, i) => (
                      <div key={i} className="relative group">
                        <img
                          src={
                            typeof f === "string" ? f : URL.createObjectURL(f)
                          }
                          alt={typeof f === "string" ? "uploaded" : f.name}
                          className="h-28 w-full object-cover rounded-md border border-black/10"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer  */}
        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-black/10 text-black hover:bg-black/5 hover:cursor-pointer"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="px-4 py-2 rounded-md border border-black/10 text-black hover:bg-black/5 hover:cursor-pointer"
              >
                Back
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                disabled={!canNext}
                onClick={() => setStep((s) => s + 1)}
                className={`px-4 py-2 rounded-md font-semibold transition  hover:cursor-pointer ${
                  canNext
                    ? `bg-[${GOLD}] text-black hover:brightness-95`
                    : "bg-black/10 text-black/40 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                disabled={loading ? true : false}
                onClick={handleSubmit}
                className={`px-4 py-2 rounded-md font-semibold transition hover:cursor-pointer ${loading? "bg-gray-200":""}  ${ 
                  canNext
                    ? `bg-[${GOLD}] text-black hover:brightness-95`
                    : "bg-black/10 text-black/40 cursor-not-allowed"
                }`}
              >
                {
                  loading ? (
                    <div className="cursor-not-allowed  px-2">
                      <RiLoader4Line className="loader text-2xl" />
                    </div>
                  ) : (
                    "Finish"
                  )
                }
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
