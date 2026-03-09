import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: number;
  change: number;
  trend: "up" | "down";
  icon: LucideIcon;
  suffix?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const KPICard = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon, 
  suffix = "",
  className,
  style 
}: KPICardProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Animate the counter
    const timer = setTimeout(() => {
      let start = 0;
      const end = value;
      const duration = 1500;
      const increment = end / (duration / 16);

      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(counter);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(counter);
    }, 200);

    return () => clearTimeout(timer);
  }, [value]);

  if (!mounted) {
    return (
      <Card className="loading-shimmer h-32">
        <CardContent className="p-6" />
      </Card>
    );
  }

  const formatValue = (val: number) => {
    if (suffix === "%") {
      return val.toFixed(1);
    }
    return val.toLocaleString();
  };

  return (
    <Card 
      className={cn("interactive-card group relative overflow-hidden", className)}
      style={style}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-vibrant-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardContent className="p-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide group-hover:text-foreground transition-colors">
              {title}
            </p>
            <p className="text-3xl font-bold text-gradient animate-counter group-hover:scale-105 transition-transform duration-300">
              {formatValue(displayValue)}{suffix}
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className={cn(
              "p-3 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:rotate-3",
              trend === "up" 
                ? "bg-gradient-to-r from-success/10 to-vibrant-green/10 text-success group-hover:from-success/20 group-hover:to-vibrant-green/20" 
                : "bg-gradient-to-r from-primary/10 to-vibrant-blue/10 text-primary group-hover:from-primary/20 group-hover:to-vibrant-blue/20"
            )}>
              <Icon className="w-6 h-6 group-hover:text-vibrant-blue transition-colors" />
            </div>
            
            <Badge 
              variant="outline"
              className={cn(
                "text-xs font-medium transition-all duration-300 group-hover:scale-105",
                trend === "up" 
                  ? "text-success border-success/30 bg-success/5 group-hover:bg-success/20 animate-pulse"
                  : "text-primary border-primary/30 bg-primary/5 group-hover:bg-primary/20"
              )}
            >
              <div className="flex items-center gap-1">
                {trend === "up" ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {Math.abs(change)}%
              </div>
            </Badge>
          </div>
        </div>
        
        {/* Enhanced Progress indicator at bottom */}
        <div className="mt-4 flex gap-1">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-1000 group-hover:h-2",
                i < (displayValue / value) * 10 
                  ? trend === "up" 
                    ? "bg-gradient-to-r from-success to-vibrant-green" 
                    : "bg-gradient-to-r from-primary to-vibrant-blue"
                  : "bg-border group-hover:bg-muted"
              )}
              style={{ 
                flex: 1,
                transitionDelay: `${i * 100}ms`
              }}
            />
          ))}
        </div>
      </CardContent>
      
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-vibrant-blue/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
    </Card>
  );
};