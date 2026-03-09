import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Calendar, Filter, Download, TrendingUp } from "lucide-react";

const DocumentFlow = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const flowData = [
    { name: "Mon", received: 450, processed: 432, pending: 18 },
    { name: "Tue", received: 520, processed: 508, pending: 12 },
    { name: "Wed", received: 380, processed: 375, pending: 5 },
    { name: "Thu", received: 680, processed: 670, pending: 10 },
    { name: "Fri", received: 750, processed: 735, pending: 15 },
    { name: "Sat", received: 320, processed: 318, pending: 2 },
    { name: "Sun", received: 180, processed: 180, pending: 0 },
  ];

  const trendData = [
    { name: "Week 1", efficiency: 92 },
    { name: "Week 2", efficiency: 94 },
    { name: "Week 3", efficiency: 89 },
    { name: "Week 4", efficiency: 97 },
  ];

  if (!mounted) {
    return (
      <Card className="loading-shimmer h-96">
        <CardContent className="p-6" />
      </Card>
    );
  }

  return (
    <Card className="card-metro">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Document Processing Flow
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="transition-metro"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Last 7 days
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="transition-metro"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="transition-metro"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="flex gap-4 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-sm text-muted-foreground">Received</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success rounded-full" />
            <span className="text-sm text-muted-foreground">Processed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-warning rounded-full" />
            <span className="text-sm text-muted-foreground">Pending</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main Flow Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={flowData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="name" 
                className="text-sm"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                className="text-sm"
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "var(--shadow-elevated)"
                }}
              />
              <Bar 
                dataKey="received" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
                className="transition-all duration-300"
              />
              <Bar 
                dataKey="processed" 
                fill="hsl(var(--success))" 
                radius={[4, 4, 0, 0]}
                className="transition-all duration-300"
              />
              <Bar 
                dataKey="pending" 
                fill="hsl(var(--warning))" 
                radius={[4, 4, 0, 0]}
                className="transition-all duration-300"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Processing Efficiency Trend */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-muted-foreground">
              Processing Efficiency Trend
            </h4>
            <Badge className="status-success">
              +5.2% this month
            </Badge>
          </div>
          
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <Area 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
                <XAxis 
                  dataKey="name" 
                  hide
                />
                <YAxis 
                  hide
                  domain={[85, 100]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px"
                  }}
                  labelFormatter={(label) => `${label}`}
                  formatter={(value) => [`${value}%`, "Efficiency"]}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center space-y-1">
            <p className="text-2xl font-bold text-primary">3,280</p>
            <p className="text-xs text-muted-foreground">Total This Week</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-2xl font-bold text-success">97.8%</p>
            <p className="text-xs text-muted-foreground">Success Rate</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-2xl font-bold text-accent">1.2m</p>
            <p className="text-xs text-muted-foreground">Avg Processing</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentFlow;