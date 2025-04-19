"use client";
import { useRef } from "react";
import React from "react";
import Window from "../components/Window/Window";
import Image from "next/image";
import { useAppStore } from "@/lib/appStore";
import { Clippy } from "clippy-react";
import { appWindows } from "@/data/WindowConfig";

export default function Home() {
  const { openWindows, openWindow, closeWindow, currentWallpaper } = useAppStore();

  const clippy = useRef<Clippy>(null);

  const onClippyLoad = () => {
    if (clippy.current) {
      clippy.current.show();
      clippy.current.speak("Welcome to Rèmi's website!");
      setTimeout(() => {
        if (clippy.current) {
          clippy.current.speak("Click on the app icons to open them.");
          clippy.current.gestureAt(1000, 100);
          clippy.current.play("GetArtsy");
        }
      }, 3000);
    }
  };

  const apps = appWindows;

  return (
    <div
      className="h-full overflow-hidden relative"
      style={{
        backgroundImage: `url('${currentWallpaper}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Clippy name="Clippy" ref={clippy} onLoad={onClippyLoad} />
      {/* Desktop Icons - Spalte rechts */}
      <div className="absolute right-0 top-0 h-full w-20 m-5 flex flex-col items-center gap-5 overflow-y-auto">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => {
              clippy.current?.speak("Opening " + app.title + "...");
              openWindow(app.id);
            }}
            className="flex flex-col items-center gap-1 w-16 text-center"
          >
            <Image src={app.icon} alt={app.title} width={50} height={50} />
            <span className="text-xs bg-gray-100/70 p-0.5 min-w-12">
              {app.title}
            </span>
          </button>
        ))}
      </div>

      {/* Fenster */}
      {apps
        .filter((app) => openWindows.includes(app.id))
        .map((app) => (
          <Window
            key={app.id}
            title={app.title}
            initialSize={app.initialSize}
            header={app.header}
            onClose={() => closeWindow(app.id)}
            resizable={app.resizable}
          >
            {app.windowContent}
          </Window>
        ))}
    </div>
  );
}
