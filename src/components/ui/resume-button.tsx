"use client";
import { Button } from "@/components/ui/moving-border";
import { resume } from "@/resource";
import React from "react";

export default function ResumeButton() {
  const handleDowloadResume = () => {
    const link = document.createElement("a");
    link.href = resume.url;
    link.download = resume.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Button
      borderRadius="1.75rem"
      className=" bg-slate-900 dark:bg-slate-100 font-extrabold text-white dark:text-black border-neutral-200 dark:border-slate-800 hover:drop-shadow-2xl"
      onClick={handleDowloadResume}
      title="Click to download my resume"
    >
      Resume
    </Button>
  );
}
