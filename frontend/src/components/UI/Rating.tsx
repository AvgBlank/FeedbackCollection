"use client";
import { useState } from "react";
import { PiForkKnifeFill, PiForkKnife } from "react-icons/pi";

interface Props {
  rating: number;
  setRating: (value: number) => void;
}

const Rating = ({rating, setRating}: Props) => {
  const [hover, setHover] = useState(0);
  const colorActive = "#FFE850";
  const colorInactive = "#C4A38A88";

  return (
    <div className="flex gap-2 text-4xl">
      {[0, 1, 2, 3, 4].map((index) => {
        const current = hover || rating;

        const isFull = current >= index + 1;
        const isHalf = !isFull && current >= index + 0.5;

        return (
          <div
            key={index}
            className="relative w-13 h-13 md:w-15 md:h-15 cursor-pointer"
            onMouseLeave={() => setHover(0)}
          >
            {/* Half area */}
            <div
              className="absolute top-0 left-0 w-1/2 h-full z-10"
              onMouseEnter={() => setHover(index + 0.5)}
              onClick={() => setRating(index + 0.5)}
            />
            {/* Full area */}
            <div
              className="absolute top-0 right-0 w-1/2 h-full z-10"
              onMouseEnter={() => setHover(index + 1)}
              onClick={() => setRating(index + 1)}
            />

            {/* Unfilled Icon */}
            <PiForkKnife
              className="w-full h-full transform rotate-[15deg]"
              color={colorInactive}
            />

            {/* Filled Icon - Full or Half */}
            {isFull && (
              <PiForkKnifeFill
                className="w-full h-full absolute top-0 left-0 transform rotate-[15deg]"
                color={colorActive}
              />
            )}
            {isHalf && (
              <PiForkKnifeFill
                className="w-full h-full absolute top-0 left-0 overflow-hidden transform rotate-[15deg]"
                style={{ clipPath: "inset(0 50% 0 0)" }}
                color={colorActive}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Rating;
