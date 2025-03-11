
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Comparison } from "@/components/Comparison";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Initialize intersection observer for animation-on-scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Target all elements with the animate-on-scroll class
    document.querySelectorAll(".animate-on-scroll").forEach((element) => {
      observer.observe(element);
    });
    
    return () => {
      document.querySelectorAll(".animate-on-scroll").forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-x {
            animation: gradient-x 15s linear infinite;
          }
          .mask-gradient-to-r {
            mask-image: linear-gradient(to right, transparent, white, transparent);
          }
        `}
      </style>
      <div className="min-h-screen bg-alpha-navy text-white overflow-hidden">
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        <Comparison />
        <CTASection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
