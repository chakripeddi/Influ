
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/components/layout/MainLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <Helmet>
        <title>404 - Page Not Found</title>
      </Helmet>
      <div className="container py-20 flex flex-col items-center justify-center text-center">
        <div className="mb-6">
          <div className="h-24 w-24 mx-auto rounded-full bg-brand-light flex items-center justify-center">
            <span className="text-5xl font-bold text-brand-dark">404</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl text-muted-foreground max-w-md mb-8">
          We couldn't find the page you were looking for. It might have been moved or doesn't exist.
        </p>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </MainLayout>
  );
};

export default NotFound;
