"use client";

import React, { createContext, useContext, useState } from 'react';

interface WallpaperContextType {
  currentWallpaper: string;
  setWallpaper: (imagePath: string) => void;
}

const WallpaperContext = createContext<WallpaperContextType | undefined>(undefined);

export const WallpaperProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentWallpaper, setCurrentWallpaper] = useState('/wallpaper/MacOSQuant.png');

  const setWallpaper = (imagePath: string) => {
    setCurrentWallpaper(imagePath);
  };

  return (
    <WallpaperContext.Provider value={{ currentWallpaper, setWallpaper }}>
      {children}
    </WallpaperContext.Provider>
  );
};

export const useWallpaper = () => {
  const context = useContext(WallpaperContext);
  if (context === undefined) {
    throw new Error('useWallpaper must be used within a WallpaperProvider');
  }
  return context;
}; 
