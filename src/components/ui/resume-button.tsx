"use client";
import { Button } from "@/components/ui/moving-border";
import { resume } from "@/resource";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

function ResumeModal({ onClose }: { onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-[95vw] h-[95vh] bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800"
      >
        <div className="absolute top-3 right-[4%] z-10 flex gap-2">
          <a
            href={resume.downloadUrl}
            download={resume.fileName}
            className="p-2 rounded-full bg-black/20 hover:bg-black/30 dark:bg-white/20 dark:hover:bg-white/30 transition-colors"
            title="Download Resume"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white dark:text-white"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
          </a>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/20 hover:bg-black/30 dark:bg-white/20 dark:hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-zinc-900">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-neutral-300 dark:border-neutral-600 border-t-cyan-500 rounded-full animate-spin" />
              <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">
                Loading resume...
              </p>
            </div>
          </div>
        )}
        <iframe
          src={resume.url}
          className="w-full h-full border-none"
          title="Resume Preview"
          allow="autoplay"
          onLoad={() => setIsLoading(false)}
        />
      </motion.div>
    </div>,
    document.body,
  );
}

export default function ResumeButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        borderRadius="1.75rem"
        className="bg-slate-900 dark:bg-slate-100 font-extrabold text-white dark:text-black border-neutral-200 dark:border-slate-800 hover:drop-shadow-2xl"
        onClick={() => setIsOpen(true)}
        title="Click to view my resume"
      >
        Resume
      </Button>

      <AnimatePresence>
        {isOpen && <ResumeModal onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
