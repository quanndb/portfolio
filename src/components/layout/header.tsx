import React from "react";

import Navbar from "./navbar";
import Logo from "@/components/layout/logo";
import ResumeButton from "@/components/ui/resume-button";

export default function Header() {
  return (
    <header>
      <nav>
        {/* blured background */}
        <div className="w-full backdrop-blur-xl flex justify-center fixed top-0 z-50 shadow-lg">
          <div className="container md:mx-auto p-3 flex justify-between items-center">
            <Logo />
            <div className="hover:-translate-y-1 hover:translate-x-1 transition-all duration-300">
              <ResumeButton />
            </div>
          </div>
        </div>
        {/* navigation */}
        <Navbar className="fixed bottom-0 right-4 md:right-auto md:left-1/2 md:-translate-x-1/2" />
      </nav>
    </header>
  );
}
