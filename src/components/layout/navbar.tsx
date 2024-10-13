"use client";
import { useTheme } from "next-themes";
import {
  IconArrowUpDashed,
  IconExternalLink,
  IconFolder,
  IconUserSquare,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import IconTheme from "@/components/ui/toggle-theme";
import { FloatingDock } from "@/components/ui/floating-dock";

export default function Navbar({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <FloatingDock
      items={[
        {
          title: "About",
          icon: (
            <IconUserSquare className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
          ),
          href: "#about",
          callback: () => {
            document.getElementById("about")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });
          },
        },
        {
          title: "Projects",
          icon: (
            <IconFolder className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
          ),
          href: "#projects",
          callback: () => {
            document.getElementById("projects")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });
          },
        },
        {
          title: "Contact",
          icon: (
            <IconExternalLink className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
          ),
          href: "#contact",
          callback: () => {
            document.getElementById("contact")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });
          },
        },
        // theme toggle
        {
          title: "Theme",
          icon: (
            <IconTheme className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
          ),
          callback: () => {
            setTheme(theme === "light" ? "dark" : "light");
          },
        },
        // scroll to top
        {
          title: "Top",
          icon: (
            <IconArrowUpDashed className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
          ),
          callback: () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          },
        },
      ]}
      className={cn("mb-8 z-50", className)}
      // mobile is right
    />
  );
}
