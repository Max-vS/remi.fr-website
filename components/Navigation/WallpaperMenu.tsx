import NavigationItem from "./NavigationItem";

const wallpapers = [
  { title: "Capsules", image: "/wallpaper/MacOSCapsules.png" },
  { title: "Quantum", image: "/wallpaper/MacOSQuant.png" },
  { title: "Tubes", image: "/wallpaper/MacOSTub.png" },
];

interface WallpaperMenuProps {
  onSelect: (imagePath: string) => void;
}

const WallpaperMenu = ({ onSelect }: WallpaperMenuProps) => {
  return (
    <div className="absolute top-full right-0 w-32 bg-system-2 border border-black shadow-[inset_-1px_-1px_#808080,inset_1px_1px_white,1px_1px_0_0_black]">
      <div className="flex flex-col">
        {wallpapers.map((wallpaper) => (
          <NavigationItem
            key={wallpaper.title}
            title={wallpaper.title}
            onClick={() => onSelect(wallpaper.image)}
          />
        ))}
      </div>
    </div>
  );
};

export default WallpaperMenu;
