
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { BrainCog } from "lucide-react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-alpha-darknavy to-black text-white flex flex-col">
      <div className="p-4">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="relative h-8 w-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF3BFF] via-[#5C24FF] to-[#00E7FF] rounded-full opacity-20 group-hover:opacity-30 blur-md animate-pulse"></div>
            <BrainCog className="w-full h-full stroke-[1.5] text-transparent bg-clip-text bg-gradient-to-r from-[#FF3BFF] via-[#5C24FF] to-[#00E7FF]" />
          </div>
          <span className="font-display text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF3BFF] to-[#00E7FF] transition-all duration-300 group-hover:brightness-110">
            AlphaU
          </span>
        </Link>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <ClerkSignIn
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "bg-alpha-darknavy/50 backdrop-blur-md border border-alpha-purple/20 shadow-xl rounded-xl",
                headerTitle: "text-white",
                headerSubtitle: "text-gray-300",
                socialButtonsBlockButton: "bg-white/10 border border-white/20 hover:bg-white/20 text-white",
                dividerLine: "bg-white/20",
                dividerText: "text-white/50",
                formFieldLabel: "text-white",
                formFieldInput: "bg-white/10 border-white/20 text-white placeholder:text-white/40",
                formButtonPrimary: "bg-gradient-to-r from-[#00E7FF] to-[#FF3BFF] hover:opacity-90 transition-opacity text-white",
                footerActionLink: "text-[#00E7FF] hover:text-[#FF3BFF]",
                formFieldAction: "text-[#00E7FF] hover:text-[#FF3BFF]",
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
