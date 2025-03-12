
import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Comparison } from "@/components/Comparison";
import { TransparencySection } from "@/components/TransparencySection";
import { EnterpriseSecuritySection } from "@/components/EnterpriseSecuritySection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Comparison />
      <TransparencySection />
      <EnterpriseSecuritySection />
      <CTASection />
      
      {/* Adding a quick navigation section to help with testing */}
      <div className="py-8 bg-alpha-darknavy">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Access</h2>
          <div className="flex justify-center gap-4">
            <Link 
              to="/dashboard" 
              className="px-6 py-3 bg-alpha-blue rounded-md text-white hover:bg-alpha-blue/90 transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="/agent-studio" 
              className="px-6 py-3 bg-alpha-purple rounded-md text-white hover:bg-alpha-purple/90 transition-colors"
            >
              Agent Studio
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
