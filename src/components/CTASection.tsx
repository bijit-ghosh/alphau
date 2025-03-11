
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

export function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // In a real application, you would submit this to your backend
    console.log("Demo requested for:", email);
    setSubmitted(true);
    toast.success("Demo request submitted! We'll be in touch soon.");
  };
  
  const benefits = [
    "70% faster deal processing",
    "50% improved investment accuracy",
    "AI-powered risk assessment",
    "Automated decision execution",
  ];
  
  return (
    <div id="contact" className="py-20 px-4 md:px-8 bg-gradient-to-br from-alpha-navy to-alpha-darknavy">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Experience the Future of Investment Intelligence?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Join leading investment firms that are already leveraging AlphaU to transform their decision-making process.
            </p>
            
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center">
                  <div className="mr-4 rounded-full p-1 bg-gradient-to-br from-alpha-blue to-alpha-purple text-white">
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="text-gray-200">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 md:p-8 shadow-glass">
            <h3 className="text-2xl font-bold text-white mb-4">Request a Demo</h3>
            <p className="text-gray-300 mb-6">
              See how AlphaU can revolutionize your investment process with a personalized demo.
            </p>
            
            {submitted ? (
              <div className="bg-alpha-blue/20 border border-alpha-blue/30 rounded-lg p-4 text-center">
                <div className="rounded-full bg-alpha-blue/20 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-alpha-blue" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">Thank you!</h4>
                <p className="text-gray-300">
                  We've received your request and our team will contact you shortly to schedule your demo.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-200 mb-2 text-sm font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-alpha-blue text-white"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-200 mb-2 text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-alpha-blue text-white"
                    placeholder="you@company.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-gray-200 mb-2 text-sm font-medium">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-alpha-blue text-white"
                    placeholder="Your company"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center h-12 px-6 rounded-lg bg-gradient-to-r from-alpha-blue to-alpha-purple text-white font-medium transition-all hover:shadow-neon hover:brightness-110"
                >
                  Request Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
