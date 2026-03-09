import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Search, Filter, Download, Eye, Edit } from "lucide-react";

const Documents = () => {
  const documents = [
    {
      id: "DOC-2024-001",
      title: "Monthly Passenger Report - December 2024",
      type: "Report",
      status: "completed",
      priority: "high",
      size: "2.4 MB",
      date: "2024-12-15",
      author: "Operations Team"
    },
    {
      id: "DOC-2024-002", 
      title: "Safety Inspection Checklist - Red Line",
      type: "Checklist",
      status: "processing",
      priority: "medium",
      size: "1.8 MB",
      date: "2024-12-14",
      author: "Safety Department"
    },
    {
      id: "DOC-2024-003",
      title: "Maintenance Schedule Q1 2025",
      type: "Schedule",
      status: "pending",
      priority: "high",
      size: "3.2 MB",
      date: "2024-12-13",
      author: "Maintenance Team"
    },
    {
      id: "DOC-2024-004",
      title: "Financial Audit Report FY24",
      type: "Audit",
      status: "completed",
      priority: "low",
      size: "5.1 MB",
      date: "2024-12-12",
      author: "Finance Department"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "status-success";
      case "processing": return "status-pending";
      case "pending": return "status-warning";
      default: return "bg-muted";
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6 animate-fade-in-up">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Document Inbox</h1>
            <p className="text-muted-foreground mt-1">
              Manage and process documents with AI-powered intelligence
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="btn-metro">
              <FileText className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="card-metro">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents by title, content, or ID..."
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document List */}
        <div className="grid gap-4">
          {documents.map((doc, index) => (
            <Card 
              key={doc.id} 
              className="document-item hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div>
                        <h3 className="font-semibold text-lg">{doc.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {doc.id} • {doc.type} • {doc.size} • by {doc.author}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                        <Badge 
                          variant="outline"
                          className={
                            doc.priority === "high" 
                              ? "text-destructive border-destructive/30" 
                              : doc.priority === "medium"
                              ? "text-warning border-warning/30"
                              : "text-muted-foreground"
                          }
                        >
                          {doc.priority} priority
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {doc.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    {doc.status === "pending" && (
                      <Button size="sm" className="btn-metro">
                        <Edit className="w-4 h-4 mr-2" />
                        Process
                      </Button>
                    )}
                  </div>
                </div>
                
                {doc.status === "processing" && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse-primary" />
                      AI Processing: Extracting metadata and content analysis...
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-accent h-2 rounded-full transition-all duration-1000"
                        style={{ width: "73%" }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" className="transition-metro">
            Load More Documents
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Documents;