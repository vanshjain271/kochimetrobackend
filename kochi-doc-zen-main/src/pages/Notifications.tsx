import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, AlertTriangle, CheckCircle, Info, X, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: "alert",
      title: "High Priority Document Pending",
      message: "Safety Inspection Report requires immediate review and approval.",
      timestamp: "2 minutes ago",
      unread: true,
      priority: "high"
    },
    {
      id: 2,
      type: "success",
      title: "Batch Processing Complete",
      message: "Successfully processed 47 documents from morning batch upload.",
      timestamp: "15 minutes ago",
      unread: true,
      priority: "medium"
    },
    {
      id: 3,
      type: "info",
      title: "System Maintenance Scheduled",
      message: "Planned maintenance window: Tonight 11:00 PM - 2:00 AM IST.",
      timestamp: "1 hour ago",
      unread: false,
      priority: "low"
    },
    {
      id: 4,
      type: "alert",
      title: "AI Model Update Available",
      message: "New document classification model with 2.3% accuracy improvement.",
      timestamp: "2 hours ago",
      unread: false,
      priority: "medium"
    },
    {
      id: 5,
      type: "success",
      title: "Monthly Report Generated",
      message: "December 2024 analytics report has been automatically generated.",
      timestamp: "4 hours ago",
      unread: false,
      priority: "low"
    },
    {
      id: 6,
      type: "info",
      title: "New User Onboarded",
      message: "Operations Manager (Priya Sharma) has been added to the system.",
      timestamp: "6 hours ago",
      unread: false,
      priority: "low"
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="w-5 h-5" />;
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "info":
        return <Info className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "alert":
        return "text-destructive bg-destructive/10 border-destructive/20";
      case "success":
        return "text-success bg-success/10 border-success/20";
      case "info":
        return "text-accent bg-accent/10 border-accent/20";
      default:
        return "text-muted-foreground bg-muted/10 border-border";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-destructive border-destructive/30 bg-destructive/5";
      case "medium":
        return "text-warning border-warning/30 bg-warning/5";
      case "low":
        return "text-muted-foreground border-border bg-muted/5";
      default:
        return "text-muted-foreground border-border bg-muted/5";
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <Layout>
      <div className="p-6 space-y-6 animate-fade-in-up">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient flex items-center gap-3">
              <Bell className="w-8 h-8" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="bg-destructive text-destructive-foreground">
                  {unreadCount} new
                </Badge>
              )}
            </h1>
            <p className="text-muted-foreground mt-1">
              Stay updated with system alerts and document processing status
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              Mark All Read
            </Button>
          </div>
        </div>

        {/* Notification Filters */}
        <Card className="card-metro">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                All
              </Button>
              <Button variant="outline" size="sm">
                Alerts ({notifications.filter(n => n.type === "alert").length})
              </Button>
              <Button variant="outline" size="sm">
                Success ({notifications.filter(n => n.type === "success").length})
              </Button>
              <Button variant="outline" size="sm">
                Info ({notifications.filter(n => n.type === "info").length})
              </Button>
              <Button variant="outline" size="sm">
                Unread ({unreadCount})
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <Card 
              key={notification.id}
              className={cn(
                "card-metro hover-lift transition-metro group",
                notification.unread && "border-primary/50 bg-primary/5"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={cn(
                    "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border",
                    getNotificationColor(notification.type)
                  )}>
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className={cn(
                        "font-semibold text-lg leading-tight",
                        notification.unread && "text-primary"
                      )}>
                        {notification.title}
                      </h3>
                      
                      <div className="flex items-center gap-2">
                        {notification.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse-primary" />
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {notification.message}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={getPriorityColor(notification.priority)}
                        >
                          {notification.priority} priority
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {notification.timestamp}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {notification.unread && (
                          <Button variant="outline" size="sm">
                            Mark Read
                          </Button>
                        )}
                        {notification.type === "alert" && (
                          <Button size="sm" className="btn-metro">
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" className="transition-metro">
            Load More Notifications
          </Button>
        </div>

        {/* Notification Settings Summary */}
        <Card className="card-metro">
          <CardHeader>
            <CardTitle className="text-lg">Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-elevated rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Email Notifications</span>
                <Badge className="status-success">Enabled</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Receive alerts via email
              </p>
            </div>
            <div className="p-4 bg-elevated rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Push Notifications</span>
                <Badge className="status-success">Enabled</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Browser push alerts
              </p>
            </div>
            <div className="p-4 bg-elevated rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">SMS Alerts</span>
                <Badge variant="outline">High Priority Only</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Critical system alerts
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Notifications;