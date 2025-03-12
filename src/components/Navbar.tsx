import { useState, useEffect } from "react";
import { Menu, X, BrainCog, LayoutDashboard, Phone, Mail, MapPin, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [careersOpen, setCareersOpen] = useState(false);
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
  const navLinks = [{
    name: "Home",
    href: "#home"
  }, {
    name: "Features",
    href: "#features"
  }, {
    name: "How It Works",
    href: "#how-it-works"
  }, {
    name: "Comparison",
    href: "#comparison"
  }, {
    name: "Dashboard",
    href: "/dashboard",
    isExternal: true
  }];
  const openPositions = [{
    title: "Gen AI Engineer",
    department: "Engineering",
    location: "Jersey City, NJ / Remote"
  }, {
    title: "Data Engineer",
    department: "Data",
    location: "Jersey City, NJ / Remote"
  }, {
    title: "Full Stack Engineer",
    department: "Engineering",
    location: "Jersey City, NJ / Remote"
  }];
  return <nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-3 px-4 md:px-8", scrolled ? "bg-alpha-darknavy/80 backdrop-blur-lg shadow-md" : "bg-transparent")}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2 group">
          <div className="relative h-8 w-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF3BFF] via-[#5C24FF] to-[#00E7FF] rounded-full opacity-20 group-hover:opacity-30 blur-md animate-pulse"></div>
            <BrainCog className="w-full h-full stroke-[1.5] text-transparent bg-clip-text bg-gradient-to-r from-[#FF3BFF] via-[#5C24FF] to-[#00E7FF]" />
          </div>
          <span className="font-display text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF3BFF] to-[#00E7FF] transition-all duration-300 group-hover:brightness-110">
            AlphaU
          </span>
        </a>
        
        {isMobile ? <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-md text-gray-200 hover:bg-white/10 transition-colors">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button> : <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map(link => link.isExternal ? <Link key={link.name} to={link.href} className="text-sm text-gray-200 hover:text-white font-medium transition-colors relative group flex items-center">
                    {link.name}
                    {link.name === "Dashboard" && <LayoutDashboard className="ml-1 h-3 w-3" />}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF3BFF] to-[#00E7FF] group-hover:w-full transition-all duration-300"></span>
                  </Link> : <a key={link.name} href={link.href} className="text-sm text-gray-200 hover:text-white font-medium transition-colors relative group">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FF3BFF] to-[#00E7FF] group-hover:w-full transition-all duration-300"></span>
                  </a>)}
            </div>
            
            <Dialog open={careersOpen} onOpenChange={setCareersOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="md:inline-flex border-alpha-purple/30 text-white bg-gray-900 hover:bg-gray-800">
                  <Briefcase className="mr-1 h-4 w-4" /> Careers
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-alpha-darknavy border border-alpha-purple/20">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-white">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF3BFF] to-[#00E7FF]">
                      Join Our Team
                    </span>
                  </DialogTitle>
                  <DialogDescription className="text-gray-300">
                    Explore career opportunities at AlphaU and be part of the future of AI.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  {openPositions.map((position, index) => <div key={index} className="p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                      <h3 className="font-semibold text-white group-hover:text-[#FF3BFF] transition-colors">{position.title}</h3>
                      <div className="flex justify-between mt-2 text-sm">
                        <span className="text-gray-400">{position.department}</span>
                        <span className="text-gray-400">{position.location}</span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-white/5 flex justify-end">
                        <Button size="sm" className="bg-gradient-to-r from-[#FF3BFF] to-[#00E7FF] hover:opacity-90 transition-opacity text-xs" onClick={() => window.location.href = 'mailto:careers@alphau.ai?subject=Application for ' + position.title}>
                          Apply Now
                        </Button>
                      </div>
                    </div>)}
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog open={contactOpen} onOpenChange={setContactOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="hidden md:inline-flex border-alpha-purple/30 hover:bg-alpha-purple/10 text-gray-900">
                  Contact Us
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-alpha-darknavy border border-alpha-purple/20">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-white">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF3BFF] to-[#00E7FF]">
                      Contact Us
                    </span>
                  </DialogTitle>
                  <DialogDescription className="text-gray-300">
                    Reach out to our team for more information about AlphaU.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-alpha-purple/10">
                      <MapPin className="h-5 w-5 text-[#FF3BFF]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Address</h4>
                      <p className="text-gray-300 text-sm">111 Town Sq Pl, Jersey City, NJ 07310</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-alpha-blue/10">
                      <Phone className="h-5 w-5 text-[#00E7FF]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Phone</h4>
                      <p className="text-gray-300 text-sm">551-655-1898</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-gradient-to-r from-alpha-blue/10 to-alpha-purple/10">
                      <Mail className="h-5 w-5 text-transparent bg-clip-text bg-gradient-to-r from-[#00E7FF] to-[#FF3BFF]" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Email</h4>
                      <p className="text-gray-300 text-sm">info@alphau.ai</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="w-full bg-gradient-to-r from-[#00E7FF] to-[#FF3BFF] hover:opacity-90 transition-opacity" onClick={() => window.location.href = 'mailto:info@alphau.ai'}>
                      Email Us Now
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Link to="/login">
              <Button className="hidden md:inline-flex h-10 px-6 py-2 rounded-full bg-gradient-to-r from-alpha-blue to-alpha-purple text-white font-medium text-sm transition-all hover:shadow-md hover:shadow-alpha-purple/20 hover:brightness-110 hover:scale-105">
                Sign In
              </Button>
            </Link>
          </div>}
      </div>
      
      {isMobile && <div className={cn("absolute top-full left-0 right-0 bg-alpha-darknavy/95 backdrop-blur-lg shadow-lg transition-all duration-300 overflow-hidden", mobileMenuOpen ? "max-h-[600px] border-t border-white/5" : "max-h-0")}>
          <div className="px-4 py-4 flex flex-col space-y-4">
            {navLinks.map(link => link.isExternal ? <Link key={link.name} to={link.href} className="text-gray-200 hover:text-white font-medium py-2 transition-colors relative group flex items-center" onClick={() => setMobileMenuOpen(false)}>
                  <span className="w-1 h-0 group-hover:h-full absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-b from-alpha-blue to-alpha-purple transition-all duration-300 rounded-r-md"></span>
                  <span className="ml-2 flex items-center">
                    {link.name}
                    {link.name === "Dashboard" && <LayoutDashboard className="ml-1 h-3 w-3" />}
                  </span>
                </Link> : <a key={link.name} href={link.href} className="text-gray-200 hover:text-white font-medium py-2 transition-colors relative group flex items-center" onClick={() => setMobileMenuOpen(false)}>
                  <span className="w-1 h-0 group-hover:h-full absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-b from-alpha-blue to-alpha-purple transition-all duration-300 rounded-r-md"></span>
                  <span className="ml-2">{link.name}</span>
                </a>)}
            
            <Button variant="outline" className="w-full border-alpha-purple/30 text-white hover:bg-alpha-purple/10 justify-start" onClick={() => {
          setCareersOpen(true);
          setMobileMenuOpen(false);
        }}>
              <Briefcase className="mr-2 h-4 w-4" /> Careers
            </Button>
            
            <Dialog open={contactOpen} onOpenChange={setContactOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full border-alpha-purple/30 text-white hover:bg-alpha-purple/10" onClick={() => setMobileMenuOpen(false)}>
                  Contact Us
                </Button>
              </DialogTrigger>
            </Dialog>
            
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-gradient-to-r from-alpha-blue to-alpha-purple text-white hover:opacity-90 transition-opacity">
                Sign In
              </Button>
            </Link>
          </div>
        </div>}
    </nav>;
}