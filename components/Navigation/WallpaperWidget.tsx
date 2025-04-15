import { useState } from "react";
import NavigationItem from "./NavigationItem";
import WallpaperMenu from "./WallpaperMenu";
import { useWallpaper } from "@/hooks/useWallpaper";

const WallpaperWidget = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setWallpaper } = useWallpaper();

  const handleWallpaperChange = (imagePath: string) => {
    setWallpaper(imagePath);
    setIsMenuOpen(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <NavigationItem
        title="Wallpaper"
        image="/icons/screen.png"
      />
      {isMenuOpen && <WallpaperMenu onSelect={handleWallpaperChange} />}
    </div>
  );
};

export default WallpaperWidget;
