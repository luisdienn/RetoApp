import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./../../../../assets/stylesheets/application.css"; 
import Slider from "react-slick";

export default function Carousel({ location }: any) {
  const [images] = useState<(string | File)[]>(location?.images ?? []);

  const carousel_settings = {
    dots: true,
    arrows: true,            
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,     
    speed: 1000,           
  };

  return (
    <div className="relative aspect-[16/9] w-full rounded h-64 px-2">
      <Slider {...carousel_settings}>
        {images.map((image, i) => (
          <div key={i}>
            <img
              src={typeof image === "string" ? image : ""}
              alt=""
              className="inset-0 h-64 w-full object-cover transition-transform duration-300 hover:scale-105 rounded text-black"
              loading="lazy"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
