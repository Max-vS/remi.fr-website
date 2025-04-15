import { useState } from "react";
import NavigationItem from "./NavigationItem";
import LanguageMenu from "./LanguageMenu";

const LanguageWidget = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <NavigationItem
        title="English"
        image="/icons/world1.png"
      />
      {isMenuOpen && <LanguageMenu />}
    </div>
  );
};

export default LanguageWidget;
