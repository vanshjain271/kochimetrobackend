import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./Sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Moon, Sun, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-gradient-surface px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover-lift transition-metro" />
              <div className="hidden md:block">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse-primary" />
                  <span className="text-sm text-muted-foreground">
                    Real-time monitoring active
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative hover-lift transition-metro"
              >
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-destructive text-destructive-foreground"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>

              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="hover-lift transition-metro"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>

              {/* Settings */}
              <Button 
                variant="ghost" 
                size="sm"
                className="hover-lift transition-metro"
              >
                <Settings className="w-5 h-5" />
              </Button>

              {/* Status Indicator */}
              <div className="hidden lg:flex items-center gap-3 ml-3 pl-3 border-l border-border">
                <div className="text-right">
                  <p className="text-sm font-medium">System Status</p>
                  <p className="text-xs text-success">All systems operational</p>
                </div>
                <div className="w-3 h-3 bg-success rounded-full animate-pulse-primary" />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-border px-6 py-4 bg-gradient-surface">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>© 2024 Kochi Metro Rail Limited</span>
                <div className="hidden md:flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                  <span>Document Intelligence System v2.1</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2">
                  <span>Last sync:</span>
                  <span className="text-primary font-medium">Just now</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse-primary" />
                  <span>Connected</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};