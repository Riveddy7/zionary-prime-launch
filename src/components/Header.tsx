import { useState, useEffect } from "react";

interface HeaderProps {
  onContactClick: () => void;
}

const Header = ({ onContactClick }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[hsl(var(--fluent-background))]/95 backdrop-blur-md border-b border-[hsl(var(--fluent-border-default))] fluent-shadow-4"
          : "bg-transparent"
      }`}
    >
      <div className="fluent-container">
        <div className="flex items-center justify-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl font-bold fluent-text-primary tracking-tight">
              Zionary
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
