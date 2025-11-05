import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: 'url(/retro-waves-bg.jpg)' }}>
      <div className="text-center bg-card/95 backdrop-blur-sm p-12 rounded-lg border-4 border-accent shadow-thick">
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <p className="mb-6 text-2xl">Oops! Page not found</p>
        <a href="/" className="inline-block px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-semibold transition-colors">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
