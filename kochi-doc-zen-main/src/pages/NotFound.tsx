import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search, FileText } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-6">
      <Card className="card-metro max-w-md w-full animate-bounce-in">
        <CardContent className="p-8 text-center space-y-6">
          {/* Metro-style 404 */}
          <div className="space-y-4">
            <div className="w-24 h-24 mx-auto bg-gradient-metro rounded-lg flex items-center justify-center">
              <FileText className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-6xl font-bold text-gradient">404</h1>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Page Not Found</h2>
              <p className="text-muted-foreground">
                The page you're looking for doesn't exist in our document system.
              </p>
              <p className="text-sm text-muted-foreground">
                Route: <code className="bg-muted px-2 py-1 rounded">{location.pathname}</code>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Link to="/">
              <Button className="btn-metro w-full">
                <Home className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => window.history.back()} className="flex-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              <Link to="/documents" className="flex-1">
                <Button variant="outline" className="w-full">
                  <Search className="w-4 h-4 mr-2" />
                  Search Docs
                </Button>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Metro Rail Document Intelligence System
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
