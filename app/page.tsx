"use client";
import { useState } from "react";
import Window from "../components/Window/Window";
import { Button } from "../components/Button";
import Image from "next/image";
export default function Home() {
  const [windows, setWindows] = useState([
    { id: 1, title: "Welcome", isOpen: true },
    { id: 2, title: "About", isOpen: false },
  ]);

  const closeWindow = (id: number) => {
    setWindows(windows.map((w) => (w.id === id ? { ...w, isOpen: false } : w)));
  };

  const openWindow = (id: number) => {
    setWindows(windows.map((w) => (w.id === id ? { ...w, isOpen: true } : w)));
  };

  return (
    <div 
      className="h-full overflow-hidden"
      style={{
        backgroundImage: "url('/wallpaper/MacOSTub.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Desktop Icons */}
      <div className="p-4 grid grid-cols-[repeat(auto-fill,64px)] gap-4">
        {windows.map((window, index) => (
          <button
            key={window.id}
            onDoubleClick={() => openWindow(window.id)}
            className="flex flex-col items-center gap-1 w-16 text-center"
          >
            <Image src="/icons/itunes.png" alt="itunes" width={60} height={60} />
            <span className="text-xs bg-gray-100/70 p-0.5 min-w-12">{window.title}</span>
          </button>
        ))}
      </div>
      {/* Windows */}
      {windows.map(
        (window, index) =>
          window.isOpen && (
            <Window key={window.id} title={window.title} onClose={() => closeWindow(window.id)}>
              {window.id === 1 ? (
                <div className="space-y-4 p-4">
                  <h1 className="text-xl font-bold">
                    Welcome to MacOS 9 Style
                  </h1>
                  <p>Click the desktop icons to open more windows!</p>
                  <div className="flex gap-2">
                    <Button variant="default">Test Button</Button>
                    <Button>OK</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">About</h2>
                  <p>This is a MacOS 9 style window system.</p>
                </div>
              )}
            </Window>
          )
      )}
    </div>
  );
}
