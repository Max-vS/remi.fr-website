"use client";

import Link from "next/link";
import TimeWidget from "./TimeWidget";

interface NavigationItem {
  title?: string;
  image?: string;
  href: string;
}

const navigationItems: NavigationItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

const NavigationBar = () => {
  return (
    <nav className="z-[500] bg-black">
      <div className="relative z-[5000] flex w-full m-0 p-0 shadow-[inset_1px_1px_0_0_#808080,2px_2px_0_0_0]">
        <ul className="z-[500] inline-block w-full px-3 list-none select-none rounded-t-xl bg-system-2 shadow-[inset_1px_1px_0_0_#808080,_2px_2px_0_0_black]">
          {navigationItems.map((item: NavigationItem) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-row float-left items-center flex-wrap justify-between h-[100%-6px]  hover:text-white hover:bg-theme-4 py-0.5 px-1.5"
            >
              {item.title}
            </Link>
          ))}
          <TimeWidget />
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
