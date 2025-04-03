"use client";
import { useState } from "react";
import Window from "../components/Window";
import { Button } from "../components/Button";

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
      className="fixed inset-0 overflow-hidden"
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
            onClick={() => openWindow(window.id)}
            className="flex flex-col items-center gap-1 w-16 text-center"
          >
            <div className="w-12 h-12 bg-white/80 rounded shadow" />
            <span className="text-xs text-white shadow-sm">{window.title}</span>
          </button>
        ))}
      </div>

      {/* Test Buttons */}
      <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
        <Button>Regular Button</Button>
        <Button>Default Button</Button>
        <Button shape="square">□</Button>
        <Button size="small">Small</Button>
        <Button disabled>Disabled</Button>
      </div>

      {/* Windows */}
      {windows.map(
        (window, index) =>
          window.isOpen && (
            <Window key={window.id} title={window.title}>
              {window.id === 1 ? (
                <div className="space-y-4">
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
