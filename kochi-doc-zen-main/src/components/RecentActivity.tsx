import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Clock, Eye, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Document {
  id: string;
  title: string;
  status: "completed" | "processing" | "pending";
  type: string;
  priority: "high" | "medium" | "low";
  timestamp: string;
}

interface RecentActivityProps {
  documents: Document[];
}

export const RecentActivity = ({ documents }: RecentActivityProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "status-success";
      case "processing":
        return "status-pending";
      case "pending":
        return "status-warning";
      default:
        return "bg-muted";
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

  return (
    <Card className="card-metro">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Recent Activity
          </CardTitle>
          <Button variant="outline" size="sm" className="transition-metro">
            View All
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {documents.map((doc, index) => (
          <div
            key={doc.id}
            className={cn(
              "document-item group",
              "animate-slide-in-right"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-4">
              {/* Document Icon */}
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              
              {/* Document Info */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm leading-tight group-hover:text-primary transition-metro">
                      {doc.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {doc.id} • {doc.type}
                    </p>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Status and Priority */}
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn("text-xs", getStatusColor(doc.status))}
                  >
                    {doc.status}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn("text-xs", getPriorityColor(doc.priority))}
                  >
                    {doc.priority}
                  </Badge>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {doc.timestamp}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="outline" size="sm" className="h-7 text-xs">
                <Eye className="w-3 h-3 mr-1" />
                View
              </Button>
              {doc.status === "pending" && (
                <Button size="sm" className="btn-metro h-7 text-xs">
                  Process
                </Button>
              )}
            </div>
            
            {/* Processing indicator */}
            {doc.status === "processing" && (
              <div className="mt-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse-primary" />
                  AI Processing in progress...
                </div>
                <div className="mt-2 w-full bg-muted rounded-full h-1">
                  <div 
                    className="bg-accent h-1 rounded-full transition-all duration-1000"
                    style={{ width: "67%" }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        
        {/* Load More */}
        <div className="pt-4 border-t">
          <Button 
            variant="ghost" 
            className="w-full text-sm text-muted-foreground hover:text-primary transition-metro"
          >
            Load more activities
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};