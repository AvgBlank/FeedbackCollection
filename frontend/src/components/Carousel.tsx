"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    { src: "/spaghetti.png", alt: "Spaghetti" },
    { src: "/pizza.png", alt: "Pizza" },
    { src: "/lazagna.png", alt: "Lasagna" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-full w-full aspect-[3/2]">
      {images.map((image, index) => (
        <Image
          key={image.alt}
          src={image.src}
          alt={image.alt}
          sizes="729px"
          className={`absolute object-cover rounded-4xl ${currentIndex === index ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
          priority
          fill
        />
      ))}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex justify-center gap-2 z-10 w-full">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex ? "bg-white w-8" : "bg-white/50 w-3"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
