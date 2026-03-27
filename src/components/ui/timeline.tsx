"use client";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { projects } from "@/resource";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { LinkPreview } from "./link-preview";

const Grid = dynamic(() => import("@/components/ui/grid-pattern"), {
  ssr: false,
});

type TimelineProps = {
  title: string;
  description: string;
  items: {
    id: string;
    title: string;
    content: React.ReactNode;
  }[];
};

export const Timeline = () => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const hasMounted = useHasMounted();

  const updateHeight = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  };

  useEffect(() => {
    updateHeight();

    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="relative w-full py-1 font-sans" ref={containerRef}>
      <div className="absolute inset-0 border border-transparent rounded-lg bg-gradient-to-r from-blue-500 to-emerald-500 animate-pulse opacity-75"></div>
      <div className="relative z-10 p-1 bg-gradient-to-l from-zinc-100 to-white dark:to-neutral-900 dark:from-gray-900 rounded-lg text-white">
        <div className="container md:mx-auto overflow-hidden py-20 px-6 md:px-0">
          <h2 className="text-2xl md:text-4xl font-bold mt-2 mb-4 text-black dark:text-white max-w-4xl">
            {projects.title}
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 text-md md:text-xl max-w-md">
            {projects.description}
          </p>
        </div>

        <div ref={ref} className="relative max-w-[90rem] mx-auto">
          {projects.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-start md:gap-10 mb-20 md:mb-40"
            >
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-slate-800 dark:bg-neutral-200 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-gradient-to-br from-emerald-300 to-blue-500 border border-neutral-300 dark:border-neutral-700 p-2" />
                </div>
                <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-slate-800 dark:text-neutral-200 ">
                  {item.title}
                </h3>
              </div>

              <div className="relative w-full bg-gradient-to-b dark:from-teal-950 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden shadow-xl">
                {hasMounted && <Grid size={30} />}
                <div className="relative pl-20 pr-4 md:pl-4 w-full">
                  <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                    {item.title}
                  </h3>
                  <div>
                    <LinkPreview
                      isStatic
                      url={item.description.url}
                      imageSrc={item.description.preview}
                      className="font-bold bg-clip-text text-xl text-transparent bg-gradient-to-br from-emerald-500 to-blue-500 dark:from-emerald-300 dark:to-blue-300"
                    >
                      {item.description.name}
                    </LinkPreview>
                    <p className="text-neutral-800 dark:text-neutral-200 text-md md:text-xl font-normal mb-8 mt-2">
                      {item.description.content}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {item.images.map((image, idx) => (
                        <Image
                          key={`${image}-${idx}`}
                          src={image}
                          alt={item.title}
                          width={500}
                          height={500}
                          priority
                          className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div
            style={{
              height: height + "px",
            }}
            className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-blue-500 via-emerald-500 dark:from-blue-800 dark:via-emerald-700 to-transparent from-[0%] via-[10%] rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
