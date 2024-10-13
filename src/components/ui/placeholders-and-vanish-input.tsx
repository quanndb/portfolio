"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type InputProps = Omit<React.ComponentPropsWithoutRef<"input">, "onChange"> & {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

type TextAreaProps = Omit<
  React.ComponentPropsWithoutRef<"textarea">,
  "onChange"
> & {
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
};

export interface PlaceholderProps {
  placeholders?: string[] | [];
  success?: boolean;
  isTextArea?: boolean;
  pending?: boolean;
}

type CombinedProps = PlaceholderProps & (InputProps | TextAreaProps);

export function PlaceholdersAndVanishInput({
  id,
  placeholders,
  isTextArea = false,
  success,
  pending,
  ...props
}: CombinedProps) {
  const [value, setValue] = useState("");
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAnimation = () => {
    if (placeholders) {
      intervalRef.current = setInterval(() => {
        setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
      }, 2000);
    }
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState !== "visible" && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else if (document.visibilityState === "visible") {
      startAnimation();
    }
  };

  useEffect(() => {
    startAnimation();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [placeholders]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const newDataRef = useRef<any[]>([]);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [animating, setAnimating] = useState(false);

  const draw = useCallback(() => {
    if (!inputRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, 800, 800);
    const computedStyles = getComputedStyle(inputRef.current);

    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = "#FFF";
    ctx.fillText(value, 16, 40);

    const imageData = ctx.getImageData(0, 0, 800, 800);
    const pixelData = imageData.data;
    const newData: any[] = [];

    for (let t = 0; t < 800; t++) {
      let i = 4 * t * 800;
      for (let n = 0; n < 800; n++) {
        let e = i + 4 * n;
        if (
          pixelData[e] !== 0 &&
          pixelData[e + 1] !== 0 &&
          pixelData[e + 2] !== 0
        ) {
          newData.push({
            x: n,
            y: t,
            color: [
              pixelData[e],
              pixelData[e + 1],
              pixelData[e + 2],
              pixelData[e + 3],
            ],
          });
        }
      }
    }

    newDataRef.current = newData.map(({ x, y, color }) => ({
      x,
      y,
      r: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
    }));
  }, [value]);

  useEffect(() => {
    draw();
  }, [value, draw]);

  const animate = (start: number) => {
    const animateFrame = (pos: number = 0) => {
      requestAnimationFrame(() => {
        const newArr = [];
        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i];
          if (current.x < pos) {
            newArr.push(current);
          } else {
            if (current.r <= 0) {
              current.r = 0;
              continue;
            }
            current.x += Math.random() > 0.5 ? 1 : -1;
            current.y += Math.random() > 0.5 ? 1 : -1;
            current.r -= 0.05 * Math.random();
            newArr.push(current);
          }
        }
        newDataRef.current = newArr;
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800);
          newDataRef.current.forEach((t) => {
            const { x: n, y: i, r: s, color } = t;
            if (n > pos) {
              ctx.beginPath();
              ctx.rect(n, i, s, s);
              ctx.fillStyle = color;
              ctx.strokeStyle = color;
              ctx.stroke();
            }
          });
        }
        if (newDataRef.current.length > 0) {
          animateFrame(pos - 8);
        } else {
          setValue("");
          setAnimating(false);
        }
      });
    };
    animateFrame(start);
  };

  const vanishAndSubmit = useCallback(() => {
    setAnimating(true);
    draw();

    const inputValue = inputRef.current?.value ?? "";
    if (inputValue && inputRef.current) {
      const maxX = newDataRef.current.reduce(
        (prev, current) => (current.x > prev ? current.x : prev),
        0
      );
      animate(maxX);
    }
  }, [draw]);

  useEffect(() => {
    if (success) {
      vanishAndSubmit();
    }
  }, [success, vanishAndSubmit]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value); // Allow typing even when animating
    },
    []
  );

  return (
    <div
      className={cn(
        "w-full relative mx-auto bg-white dark:bg-zinc-800 h-auto rounded-lg overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200",
        "flex items-center",
        "border border-slate-400 ",
        value && "bg-gray-50"
      )}
    >
      <canvas
        className={cn(
          "absolute pointer-events-none text-base transform scale-50 top-[20%] left-2 sm:left-8 origin-top-left filter invert dark:invert-0 pr-20",
          !animating ? "opacity-0" : "opacity-100"
        )}
        ref={canvasRef}
      />
      <label htmlFor={id} />
      {!isTextArea ? (
        <input
          onChange={handleChange}
          ref={inputRef as React.RefObject<HTMLInputElement>}
          value={value || ""}
          type="text"
          className={cn(
            "w-full relative text-sm sm:text-base dark:text-white bg-transparent text-black h-full rounded-lg px-4 sm:pl-10 py-5",
            "focus:ring-[100px]",
            animating ? "opacity-0" : "opacity-100"
          )}
          disabled={pending}
          {...(props as InputProps)}
        />
      ) : (
        <textarea
          onChange={handleChange}
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={value || ""}
          rows={4} // Set the number of visible rows
          style={{ resize: "vertical" }} // Allow vertical resize with a minimum height
          className={cn(
            "w-full relative z-20 text-sm sm:text-base dark:text-white bg-transparent text-black h-full rounded-lg px-4 sm:pl-10 py-5",
            "focus:ring-[2px]",
            animating ? "opacity-0" : "opacity-100"
          )}
          disabled={pending}
          {...(props as TextAreaProps)}
        />
      )}
      {placeholders && (
        <div className="absolute z-10 inset-0 flex pt-5 h-fit pl-4 sm:pl-10 pr-20">
          <AnimatePresence mode="wait">
            {value.length === 0 && !animating && (
              <motion.span
                key={placeholders[currentPlaceholder]}
                className={cn(
                  "text-gray-400 dark:text-gray-400 text-sm md:text-base"
                )}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                {placeholders[currentPlaceholder]}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
