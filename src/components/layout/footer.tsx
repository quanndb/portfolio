import React from "react";
import { footer } from "@/resource";

export default function Footer() {
  return (
    <footer>
      <p className="text-center text-sm py-4 text-neutral-500 dark:text-neutral-200">
        {footer.copyright}
      </p>
    </footer>
  );
}
