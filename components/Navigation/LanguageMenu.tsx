import NavigationItem from "./NavigationItem";

const languages = [
  { title: "English", href: "/en" },
  { title: "Deutsch", href: "/de" },
  { title: "Français", href: "/fr" },
];

const LanguageMenu = () => {
  return (
    <div className="absolute top-full right-0 w-32 bg-system-2 border border-black shadow-[inset_-1px_-1px_#808080,inset_1px_1px_white,1px_1px_0_0_black]">
      <div className="flex flex-col">
        {languages.map((lang) => (
          <NavigationItem
            key={lang.href}
            title={lang.title}
            href={lang.href}
          />
        ))}
      </div>
    </div>
  );
};

export default LanguageMenu; 