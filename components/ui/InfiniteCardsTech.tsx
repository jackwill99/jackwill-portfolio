"use client";

import { cn } from "@/lib/utils";
import React, { Fragment, useEffect, useState } from "react";

export const InfiniteMovingCardsTech = ({
  items,
  direction = "left",
  className,
}: {
  items: string[];
  direction?: "left" | "right";
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          `flex flex-none py-0.5 gap-6 pr-6 animate-${
            direction == "left" ? "scrollLeft" : "scrollRight"
          } [animation-duration:40s]`,
        )}
      >
        {[...new Array(2)].fill(0).map((_, index) => {
          console.log(index);
          return (
            <Fragment key={index}>
              {[...items, ...items].map((item, id) => (
                <span
                  key={id}
                  className=" inline-flex items-center gap-4 lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E] whitespace-nowrap"
                >
                  {item}
                </span>
              ))}
            </Fragment>
          );
        })}
      </div>
    </div>

    // <div className="bg-dark text-white p-6 rounded-lg space-y-6">
    //   {/* My Toolbox Section */}
    //   <div className="flex flex-col items-center">
    //     <div className="overflow-hidden w-full mt-4">

    //       {/* Row 1 - Moves Left to Right */}
    //       {/* <div className="flex  animate-scrollLeft">
    //         {[
    //           new Array(2).fill(0).map((_, index) => (
    //             <Fragment key={index}>
    //               {skills.map((skill, index) => (
    //                 <div
    //                   key={`row1-${index}`}
    //                   className="bg-gray-800 text-gray-200 px-4 py-2 rounded-full whitespace-nowrap mx-2"
    //                 >
    //                   {skill}
    //                 </div>
    //               ))}
    //             </Fragment>
    //           )),
    //         ]}
    //       </div> */}

    //       {/* Row 2 - Moves Right to Left */}
    //       {/* <div className="flex animate-scrollRight mt-4">
    //         {skills.concat(skills).map((skill, index) => (
    //           <div
    //             key={`row2-${index}`}
    //             className="bg-gray-800 text-gray-200 px-4 py-2 rounded-full whitespace-nowrap mx-2"
    //           >
    //             {skill}
    //           </div>
    //         ))}
    //       </div> */}
    //     </div>
    //   </div>
    // </div>
  );
};

export const InfiniteMovingCardsTechVertical = ({
  items,
  direction = "up",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: string[];
  direction?: "up" | "down";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeAnimation();
  }, []);

  const [start, setStart] = useState(false);

  const initializeAnimation = () => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      // Duplicate items for seamless scrolling
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      setScrollDirection();
      setScrollSpeed();
      setStart(true);
    }
  };

  const setScrollDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "up" ? "forwards" : "reverse",
      );
    }
  };

  const setScrollSpeed = () => {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 h-[500px] w-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white_20%,white_80%,transparent)]",
        `${className} rotate-[10deg]`,
      )}
    >
      <div
        ref={scrollerRef}
        className={cn(
          "flex flex-col gap-3 md:gap-3 lg:gap-8",
          start && "animate-scrollVertical",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <span
            key={idx}
            className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
