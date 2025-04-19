import { useState } from "react";
import NavigationItem from "./NavigationItem";
import LanguageMenu from "./LanguageMenu";
import { useAppStore } from "@/lib/appStore";

const LanguageWidget = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { languages, currentLanguage } = useAppStore();

  const currentLanguageTitle =
    languages.find((lang) => lang.code === currentLanguage)?.title || "English";

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <NavigationItem title={currentLanguageTitle} image="/icons/world1.png" />
      {isMenuOpen && <LanguageMenu />}
    </div>
  );
};

export default LanguageWidget;
