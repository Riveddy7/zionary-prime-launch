import { useState, useEffect } from "react";
import { Button } from "./ui/button";

interface HeaderProps {
  onContactClick: () => void;
}

const Header = ({ onContactClick }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[hsl(var(--background-dark))]/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-[hsl(var(--text-primary))] tracking-tight">
              Zionary
            </h1>
          </div>
          <Button variant="hero" size="lg" onClick={onContactClick}>
            Iniciar el Diseño
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
