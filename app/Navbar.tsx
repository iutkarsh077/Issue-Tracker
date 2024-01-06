"use client";
import React from "react";
import { SiBugcrowd } from "react-icons/si";
import Link from "next/link";
import classnames from "classnames";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  const currPath = usePathname();
  return (
    <nav className="flex space-x-6 border-2 h-16 items-center mb-5 pl-2 border-gray-400">
      <Link href="/">
        <SiBugcrowd />
      </Link>
      <ul className="flex space-x-5">
        {links.map((mylink) => (
          <Link
            href={mylink.href}
            className={classnames({
                'text-gray-950' : mylink.href === currPath,
                'text-gray-400' : mylink.href !== currPath,
                'hover:text-zinc-700 transition-colors': true
            })}
            key={mylink.href}
          >
            {mylink.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
