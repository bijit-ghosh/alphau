
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);
  
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Comparison", href: "#comparison" },
  ];
  
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 px-4 md:px-8",
        scrolled ? "bg-alpha-darknavy/80 backdrop-blur-lg shadow-md" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2 group">
          <div className="relative h-8 w-8">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
              <path
                d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12c3.314 0 6.314-1.343 8.485-3.515l-2.828-2.828C20.143 23.171 18.171 24 16 24c-4.418 0-8-3.582-8-8s3.582-8 8-8c2.171 0 4.143.829 5.657 2.343l2.828-2.828C22.314 5.343 19.314 4 16 4z"
                fill="url(#gradient)"
              />
              <defs>
                <linearGradient id="gradient" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FF3BFF" />
                  <stop offset="50%" stopColor="#5C24FF" />
                  <stop offset="100%" stopColor="#0097FF" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="font-display text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF3BFF] to-[#0097FF]">
            AlphaU
          </span>
        </a>
        
        {isMobile ? (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-gray-200 hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        ) : (
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-gray-200 hover:text-white font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <a
              href="#contact"
              className="hidden md:inline-flex h-10 px-6 py-2 rounded-full bg-gradient-to-r from-alpha-blue to-alpha-purple text-white font-medium text-sm transition-all hover:shadow-md hover:brightness-110"
            >
              Request Demo
            </a>
          </div>
        )}
      </div>
      
      {isMobile && (
        <div
          className={cn(
            "absolute top-full left-0 right-0 bg-alpha-darknavy/95 backdrop-blur-lg shadow-lg transition-all duration-300 overflow-hidden",
            mobileMenuOpen ? "max-h-[300px]" : "max-h-0"
          )}
        >
          <div className="px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-200 hover:text-white font-medium py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex justify-center h-10 px-6 py-2 rounded-full bg-gradient-to-r from-alpha-blue to-alpha-purple text-white font-medium text-sm transition-all hover:shadow-md hover:brightness-110"
              onClick={() => setMobileMenuOpen(false)}
            >
              Request Demo
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
