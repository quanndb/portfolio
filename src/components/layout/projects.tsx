import { Timeline } from "@/components/ui/timeline";
import React from "react";

export type TimelineItemType = {
  id: string;
  title: string;
  content: React.ReactNode;
};

export type TimelineItemProps = {
  id: string;
  title: string;
  description: {
    url: string;
    name: string;
    preview: string;
    content: string;
  };
  images: string[];
};

export default function Projects() {
  return (
    <section className="w-full mb-44" id="projects">
      <Timeline />
    </section>
  );
}
