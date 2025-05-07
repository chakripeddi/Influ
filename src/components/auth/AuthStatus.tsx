
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface AuthStatusProps {
  requireAuth?: boolean;
  children: React.ReactNode;
}

export const AuthStatus = ({ requireAuth = true, children }: AuthStatusProps) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showRedirecting, setShowRedirecting] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        setShowRedirecting(true);
        // Redirect to login after a short delay so the user can see what's happening
        const timer = setTimeout(() => {
          navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`, { replace: true });
        }, 1500);
        return () => clearTimeout(timer);
      }
      
      if (!requireAuth && user) {
        navigate('/brand');
      }
    }
  }, [user, loading, navigate, requireAuth, location.pathname]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (requireAuth && !user) {
    return (
      <div className="container max-w-md py-16">
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            {showRedirecting 
              ? "Redirecting to login page..." 
              : "You need to be logged in to view this page."}
          </AlertDescription>
        </Alert>
        
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate('/login')}>
            Log in
          </Button>
          <Button variant="outline" onClick={() => navigate('/signup')}>
            Sign up
          </Button>
        </div>
      </div>
    );
  }

  if (!requireAuth && user) {
    return null;
  }

  // Ensure we're returning a single React element
  return <>{children}</>;
}
