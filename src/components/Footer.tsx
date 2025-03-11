
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "How It Works", href: "#how-it-works" },
        { name: "Comparison", href: "#comparison" },
        { name: "Pricing", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "API Reference", href: "#" },
        { name: "Case Studies", href: "#" },
        { name: "Support", href: "#" },
      ],
    },
  ];
  
  return (
    <footer className="bg-alpha-darknavy py-12 px-4 md:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <a href="#" className="flex items-center space-x-2 mb-4">
              <span className="font-display text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-alpha-blue to-alpha-purple">
                AlphaU
              </span>
            </a>
            <p className="text-gray-400 mb-4 max-w-xs">
              AI-first investment intelligence engine transforming decision-making for investment firms.
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center text-sm text-alpha-blue hover:text-alpha-purple transition-colors"
            >
              Schedule a Demo
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </a>
          </div>
          
          {footerLinks.map((group, i) => (
            <div key={i}>
              <h3 className="font-semibold text-white mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link, j) => (
                  <li key={j}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} AlphaU. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
