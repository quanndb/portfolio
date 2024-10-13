import React from "react";
import Image from "next/image";

import { projects, projectsDataType } from "@/resource";
import { Timeline } from "@/components/ui/timeline";
import { LinkPreview } from "@/components/ui/link-preview";

export type TimelineItemType = {
  title: string;
  content: React.ReactNode;
};

export type TimelineItemProps = {
  title: string;
  description: {
    url: string;
    name: string;
    preview: string;
    content: string;
  };
  images: string[];
};

export type TimelineProps = {
  title: string;
  description: string;
  items: TimelineItemProps[];
};

const TimelineItem = ({
  title,
  description,
  images,
}: TimelineItemProps): TimelineItemType => {
  return {
    title,
    content: (
      <div>
        <LinkPreview
          isStatic
          url={description.url}
          imageSrc={description.preview}
          className="font-bold bg-clip-text text-xl text-transparent bg-gradient-to-br from-emerald-500 to-blue-500 dark:from-emerald-300 dark:to-blue-300"
        >
          {description.name}
        </LinkPreview>
        <p className="text-neutral-800 dark:text-neutral-200 text-md md:text-xl font-normal mb-8 mt-2">
          {description.content}
        </p>
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, idx) => (
            <Image
              key={idx}
              src={image}
              alt={title}
              width={500}
              height={500}
              priority
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          ))}
        </div>
      </div>
    ),
  };
};

export default function Projects() {
  const projectData: projectsDataType = projects;

  return (
    <section className="w-full mb-44" id="projects">
      <Timeline
        items={projectData.items.map(TimelineItem)}
        title={projectData.title}
        description={projectData.description}
      />
    </section>
  );
}
