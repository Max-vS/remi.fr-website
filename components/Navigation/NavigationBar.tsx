"use client";

import Image from "next/image";
import TimeWidget from "./TimeWidget";
import LanguageWidget from "./LanguageWidget";
import WallpaperWidget from "./WallpaperWidget";
import NavigationItem from "./NavigationItem";
import { useCallback } from "react";
import { useAppStore } from "@/lib/appStore";
import { appWindows } from "@/data/WindowConfig";

const NavigationBar = () => {
  const { openWindow } = useAppStore();

  const handleItemClick = useCallback(
    (windowId: number) => {
      openWindow(windowId);
    },
    [openWindow]
  );

  return (
    <nav className="z-[500] bg-black">
      <div className="relative z-[5000] flex w-full m-0 p-0 shadow-[inset_1px_1px_0_0_#808080,2px_2px_0_0_0]">
        <ul className="z-[500] inline-block w-full px-3 list-none select-none rounded-t-xl bg-system-2 shadow-[inset_1px_1px_0_0_#808080,_2px_2px_0_0_black]">
          <li className="flex flex-row float-left items-center flex-wrap justify-between hover:text-white hover:bg-theme-4 py-0.5 gap-1 h-full px-3">
            <Image
              src="/icons/apple-logo.png"
              alt="Rèmi.fr"
              width={14}
              height={14}
            />
          </li>

          {appWindows
            .filter((app) => app.showInNavbar)
            .map((app) => (
              <NavigationItem
                key={app.id}
                title={app.title}
                className="float-left cursor-pointer"
                onClick={() => handleItemClick(app.id)}
              />
            ))}
          <div className="float-right flex items-center">
            <TimeWidget />
            <LanguageWidget />
            <WallpaperWidget />
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
