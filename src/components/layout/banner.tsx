"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { homeData, homeDataType } from "@/resource";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function Banner() {
  const data: homeDataType = homeData;

  return (
    <AuroraBackground className="mb-44">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 w-full"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          <h1>{data.title}</h1>
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          <p>{data.description}</p>
        </div>
        <Link
          href={data.button.href}
          className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2 animate-bounce hover:animate-none"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("about")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });
          }}
        >
          {data.button.text}
        </Link>
      </motion.div>
    </AuroraBackground>
  );
}
