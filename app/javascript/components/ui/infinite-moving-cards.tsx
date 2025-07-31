"use client";

import { cn } from "../../utils";
import React, { useEffect, useState } from "react";

type CarouselProps = {
  items: any;
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
};

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: CarouselProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (!containerRef.current || !scrollerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const scrollerContent = Array.from(scrollerRef.current.children);

    const contentWidth = scrollerContent.reduce((acc, item) => {
      return acc + (item as HTMLElement).offsetWidth;
    }, 0);

    const minDuplication = Math.ceil((containerWidth * 2) / contentWidth);

    for (let i = 0; i < minDuplication; i++) {
      scrollerContent.forEach((item) => {
        const cloned = item.cloneNode(true);
        scrollerRef.current!.appendChild(cloned);
      });
    }

    getDirection();
    getSpeed();
    setStart(true);
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li className="relative w-auto  py-6 px-4 md:w-auto " key={item.name}>
            <blockquote>
              <img
                src={`http://localhost:3000/${item.image_url}`}
                alt="badge"
                className="w-42 h-42 object-contain cursor-pointer"
              />
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
