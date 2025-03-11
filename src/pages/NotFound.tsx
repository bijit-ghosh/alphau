
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-alpha-navy px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-alpha-blue to-alpha-purple mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-gradient-to-r from-alpha-blue to-alpha-purple text-white font-medium transition-all hover:shadow-neon hover:brightness-110"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
