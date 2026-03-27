"use client";
import { IconMoon, IconSun } from "@tabler/icons-react";
import * as React from "react";
import { useTheme } from "next-themes";
import { useHasMounted } from "@/hooks/use-has-mounted";

export default function IconTheme({ className }: { className?: string }) {
  const { theme } = useTheme();
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return (
      <span className={className}>
        <IconSun className={className} />
      </span>
    );
  }

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
