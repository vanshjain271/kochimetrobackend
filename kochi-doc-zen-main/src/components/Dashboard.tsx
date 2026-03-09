import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, TrendingUp, Clock, CheckCircle, AlertTriangle, Users } from "lucide-react";
import { KPICard } from "./KPICard";
import DocumentFlow from "./DocumentFlow";
import { RecentActivity } from "./RecentActivity";

const Dashboard = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const kpiData = [
    {
      title: "Total Documents",
      value: 12847,
      change: 12,
      icon: FileText,
      trend: "up" as const,
    },
    {
      title: "Processed Today",
      value: 324,
      change: 8,
      icon: TrendingUp,
      trend: "up" as const,
    },
    {
      title: "Pending Review",
      value: 47,
      change: -15,
      icon: Clock,
      trend: "down" as const,
    },
    {
      title: "AI Accuracy",
      value: 97.8,
      change: 2.1,
      icon: CheckCircle,
      trend: "up" as const,
      suffix: "%",
    },
  ];

  const systemMetrics = [
    { label: "Storage Usage", value: 78, status: "normal" },
    { label: "Processing Speed", value: 92, status: "excellent" },
    { label: "System Health", value: 85, status: "good" },
  ];

  const recentDocuments = [
    {
      id: "DOC-2024-001",
      title: "Monthly Passenger Report",
      status: "completed" as const,
      type: "Report",
      priority: "high" as const,
      timestamp: "2 hours ago",
    },
    {
      id: "DOC-2024-002", 
      title: "Safety Inspection Checklist",
      status: "processing" as const,
      type: "Checklist",
      priority: "medium" as const,
      timestamp: "4 hours ago",
    },
    {
      id: "DOC-2024-003",
      title: "Maintenance Schedule Q1",
      status: "pending" as const,
      type: "Schedule",
      priority: "high" as const,
      timestamp: "6 hours ago",
    },
  ];

  if (!mounted) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="loading-shimmer h-32 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">
            Metro Rail Document Intelligence
          </h1>
          <p className="text-muted-foreground mt-1">
            AI-powered document management for efficient operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="status-success">
            <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse-primary" />
            System Active
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard
            key={kpi.title}
            {...kpi}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document Flow Chart */}
        <div className="lg:col-span-2">
          <DocumentFlow />
        </div>

        {/* System Metrics */}
        <Card className="card-metro">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              System Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemMetrics.map((metric) => (
              <div key={metric.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{metric.label}</span>
                  <span className="font-medium">{metric.value}%</span>
                </div>
                <Progress 
                  value={metric.value} 
                  className="h-2"
                />
                <div className="flex justify-end">
                  <Badge
                    variant={metric.status === "excellent" ? "default" : "secondary"}
                    className={
                      metric.status === "excellent" 
                        ? "status-success" 
                        : metric.status === "good"
                        ? "status-pending"
                        : "status-warning"
                    }
                  >
                    {metric.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity documents={recentDocuments} />
        
        {/* Quick Actions */}
        <Card className="card-metro">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Team Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-elevated rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">Active Users</p>
                    <p className="text-sm text-muted-foreground">Online now</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">23</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-success rounded-full animate-pulse-primary"
                        style={{ animationDelay: `${i * 200}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-elevated rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Processing</p>
                  <p className="text-xl font-bold text-accent">8</p>
                </div>
                <div className="p-3 bg-elevated rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Reviewing</p>
                  <p className="text-xl font-bold text-warning">3</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;