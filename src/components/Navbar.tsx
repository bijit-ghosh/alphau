import { useState, useEffect } from "react";
import { Menu, X, Brain } from "lucide-react";
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
          <div className="relative h-8 w-8 flex items-center justify-center">
            <Brain className="w-full h-full stroke-[1.5] text-transparent bg-clip-text bg-gradient-to-r from-[#FF3BFF] via-[#5C24FF] to-[#00E7FF]" />
          </div>
          <span className="font-display text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF3BFF] to-[#00E7FF]">
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
