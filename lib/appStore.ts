import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Zentrale Definition der verfügbaren Sprachen
export const LANGUAGES = [
  { code: "en", title: "English" },
  { code: "de", title: "Deutsch" },
  { code: "fr", title: "Français" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

interface WindowState {
  openWindows: number[];
  openWindow: (id: number) => void;
  closeWindow: (id: number) => void;
}

interface WallpaperState {
  currentWallpaper: string;
  setWallpaper: (imagePath: string) => void;
}

interface LanguageState {
  languages: typeof LANGUAGES;
  currentLanguage: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
}

interface AppState extends WindowState, WallpaperState, LanguageState {}

export const useAppStore = create<AppState>()(
  devtools(
    (set) => ({
      // Window state
      openWindows: [1], // Default: Welcome window is open
      openWindow: (id) =>
        set((state) => ({
          openWindows: state.openWindows.includes(id)
            ? state.openWindows
            : [...state.openWindows, id],
        })),
      closeWindow: (id) =>
        set((state) => ({
          openWindows: state.openWindows.filter((windowId) => windowId !== id),
        })),

      // Wallpaper state
      currentWallpaper: "/wallpaper/MacOSCapsules.png",
      setWallpaper: (imagePath) => set({ currentWallpaper: imagePath }),

      // Language state
      languages: LANGUAGES,
      currentLanguage: "en",
      setLanguage: (language) => set({ currentLanguage: language }),
    }),
    {
      name: "remi-app-storage",
    }
  )
);
