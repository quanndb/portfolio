"use client";
import * as React from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";

export default function IconTheme({ className }: { className?: string }) {
  const [theme, setTheme] = React.useState("dark");
  React.useEffect(() => {
    if (window) {
      const theme = localStorage.getItem("theme");
      if (theme) {
        setTheme(theme);
      } else {
        localStorage.setItem("theme", "dark");
        setTheme("dark");
      }
    }
  }, []);

  return (
    <span>
      {theme === "light" ? (
        <IconSun className={className} />
      ) : (
        <IconMoon className={className} />
      )}
    </span>
  );
}
