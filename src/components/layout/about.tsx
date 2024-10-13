import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";

import { about, aboutDataType } from "@/resource";
import { Spotlight } from "@/components/ui/spotlight";
const Grid = dynamic(() => import("@/components/ui/grid-pattern"), {
  ssr: false,
});

export default function About() {
  const aboutData: aboutDataType = about;

  return (
    <section
      className="container mx-auto w-full mb-44 flex flex-col justify-center -translate-y-8"
      id="about"
    >
      <div className="relative bg-gradient-to-b dark:from-teal-950 from-neutral-100 dark:to-neutral-950 to-white p-10 mt-14 rounded-3xl overflow-hidden shadow-xl">
        <Grid size={40} />
        <Spotlight fill="white" />
        <h2 className="text-2xl md:text-4xl font-bold text-left mb-10">
          About Me
        </h2>
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-20">
          <div className="flex flex-col gap-5 items-center float-left ">
            <Image
              src="/images/me-square.png"
              alt="A picture of me"
              width={300}
              height={300}
              className="rounded-full w-[200px] md:w-[300px] border-4 border-slate-300 dark:border-slate-700"
            />
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold">
                {aboutData.author.name}
              </p>
              <p className="text-base md:text-lg text-cyan-500">
                {aboutData.author.role}
              </p>
              <p className="text-base md:text-lg">
                Location: {aboutData.author.location}
              </p>
            </div>
            <div className="flex gap-5 flex-wrap justify-center">
              {aboutData.author.socials.map((social, idx) => (
                <div key={idx} className="flex gap-2">
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center text-base md:text-lg text-center border border-slate-300 dark:border-slate-700 rounded-md p-2 hover:bg-slate-300 hover:animate-pulse dark:hover:bg-slate-700"
                  >
                    {social.name}
                    <Icon
                      icon={social.icon}
                      width={50}
                      className="text-cyan-600"
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            {aboutData.author.description.map((desc, idx) => (
              <p
                key={idx}
                className="mt-5 text-base md:text-lg leading-relaxed"
              >
                {desc.includes("**") ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: desc.replace(
                        /\*\*(.*?)\*\*/g,
                        "<strong class='text-cyan-500'>$1</strong>"
                      ),
                    }}
                  />
                ) : (
                  desc
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
