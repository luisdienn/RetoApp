import React from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";

function toHHMM(value?: string | null): string {
  if (!value) return "";
  const m = String(value).match(/(\d{2}):(\d{2})/);
  return m ? `${m[1]}:${m[2]}` : "";
}

function formatPhoneIntl(raw?: string): string {
  if (!raw) return "";
  const input = raw.startsWith("+") ? raw : `+${raw}`;
  const phone = parsePhoneNumberFromString(input);
  return phone ? phone.formatInternational() : input;
}

function formatPhoneIntlDashed(raw?: string): string {
  const formatted = formatPhoneIntl(raw);
  const firstSpace = formatted.indexOf(" ");
  if (firstSpace === -1) return formatted;
  const prefix = formatted.slice(0, firstSpace);
  const national = formatted.slice(firstSpace + 1);
  return `${prefix} ${national.replace(/\s+/g, "-")}`;
}

export default function PhoneShift({ location }: any) {
  return (
    <div>
      <p className="font-bold text-lg pb-4">Genaral Information</p>
      <p className="text-gray-600 text-sm">
        Phone: {formatPhoneIntlDashed(location.phone)}
      </p>{" "}
      <p className="text-gray-600 text-sm ">
        Open: {toHHMM(location?.open_time)} - {toHHMM(location?.close_time)}
      </p>
    </div>
  );
}
