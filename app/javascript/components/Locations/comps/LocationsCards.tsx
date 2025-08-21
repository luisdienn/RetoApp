import React from "react";
import { useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function LocationsCards({ location }: any) {
  const [images, setImages] = useState<(string | File)[]>(
    location?.images ?? []
  );

  const LINK = `/locations/${location.id}`;

  const tags3 = location.tags.slice(0, 3);

  var carousel_settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 4000,
    autoplay: true,
    speed: 10000,
    cssEase: "linear",
  };

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

  return (
    <div className="max-w-full rounded overflow-hidden shadow-sm hover:shadow-lg bg-white">
      <a href={LINK}>
        <div className="relative aspect-[16/9] w-full overflow-hidden  h-42">
          <Slider {...carousel_settings} className="!overflow-hidden">
            {images.map((image) => (
              <div>
                <img
                  src={image}
                  alt=""
                  className="inset-0 h-42 w-full object-cover transition-transform duration-300 hover:scale-105 "
                  loading="lazy"
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="px-6 py-4">
          <div className="flex justify-between">
            <div className="font-bold text-xl">{location.name}</div>
          </div>
          <p className="text-gray-600 text-sm ">{location.address}</p>
          <p className="text-gray-600 text-sm">
            Phone: {formatPhoneIntlDashed(location.phone)}
          </p>{" "}
          <p className="text-gray-600 text-sm pb-4">
            Shifts: {toHHMM(location?.open_time)} -{" "}
            {toHHMM(location?.close_time)}
          </p>
          <p className="text-black ">{location.details}</p>
        </div>

        <div className="px-6 pt-2 pb-2 gap-2">
          {tags3?.map((tag: any) => (
            <span className="inline-block bg-gray-200 rounded-full px-4 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ">
              {tag}
            </span>
          ))}
        </div>
      </a>
    </div>
  );
}
