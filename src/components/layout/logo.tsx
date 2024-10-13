"use client";
import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link
      href="/"
      className="w-fit"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
    >
      <Image
        src="/images/logo.png"
        alt="logo"
        width={50}
        height={50}
        className="mr-2"
        priority
      />
    </Link>
  );
}
