import NavigationItem from "./NavigationItem";
import { useAppStore } from "@/lib/appStore";

const LanguageMenu = () => {
  const { languages, setLanguage } = useAppStore();

  return (
    <div className="absolute top-full right-0 w-32 bg-system-2 border border-black shadow-[inset_-1px_-1px_#808080,inset_1px_1px_white,1px_1px_0_0_black]">
      <div className="flex flex-col">
        {languages.map((lang) => (
          <NavigationItem
            key={lang.code}
            title={lang.title}
            onClick={() => setLanguage(lang.code)}
          />
        ))}
      </div>
    </div>
  );
};

export default LanguageMenu;
