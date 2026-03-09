import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { TrendingUp, Download, Calendar, Filter, Users, FileText, Clock, CheckCircle } from "lucide-react";

const Analytics = () => {
  const monthlyData = [
    { month: "Jan", processed: 2400, accuracy: 94.5 },
    { month: "Feb", processed: 2210, accuracy: 95.8 },
    { month: "Mar", processed: 2290, accuracy: 96.2 },
    { month: "Apr", processed: 2000, accuracy: 97.1 },
    { month: "May", processed: 2181, accuracy: 97.8 },
    { month: "Jun", processed: 2500, accuracy: 98.2 },
  ];

  const documentTypes = [
    { name: "Reports", value: 35, color: "hsl(var(--primary))" },
    { name: "Schedules", value: 25, color: "hsl(var(--success))" },
    { name: "Checklists", value: 20, color: "hsl(var(--accent))" },
    { name: "Audits", value: 12, color: "hsl(var(--warning))" },
    { name: "Others", value: 8, color: "hsl(var(--muted))" },
  ];

  const weeklyTrend = [
    { day: "Mon", efficiency: 92 },
    { day: "Tue", efficiency: 94 },
    { day: "Wed", efficiency: 89 },
    { day: "Thu", efficiency: 97 },
    { day: "Fri", efficiency: 95 },
    { day: "Sat", efficiency: 88 },
    { day: "Sun", efficiency: 85 },
  ];

  return (
    <Layout>
      <div className="p-6 space-y-6 animate-fade-in-up">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive insights into document processing performance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-metro hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Processed</p>
                  <p className="text-3xl font-bold text-gradient">14,592</p>
                  <p className="text-xs text-success">+12.5% from last month</p>
                </div>
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-metro hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Processing Time</p>
                  <p className="text-3xl font-bold text-gradient">1.2m</p>
                  <p className="text-xs text-success">-8.3% faster</p>
                </div>
                <Clock className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-metro hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                  <p className="text-3xl font-bold text-gradient">98.2%</p>
                  <p className="text-xs text-success">+2.1% improvement</p>
                </div>
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-metro hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <p className="text-3xl font-bold text-gradient">47</p>
                  <p className="text-xs text-muted-foreground">Current session</p>
                </div>
                <Users className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Processing Volume */}
          <Card className="card-metro">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Monthly Processing Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="processed" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Document Types Distribution */}
          <Card className="card-metro">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Document Types Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={documentTypes}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {documentTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {documentTypes.map((type) => (
                  <div key={type.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: type.color }}
                    />
                    <span className="text-sm">{type.name}</span>
                    <span className="text-sm text-muted-foreground">{type.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Efficiency Trend */}
        <Card className="card-metro">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Weekly Processing Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [`${value}%`, "Efficiency"]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Insights Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-metro">
            <CardHeader>
              <CardTitle className="text-lg">AI Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                <p className="text-sm font-medium text-success">Peak Performance</p>
                <p className="text-xs text-muted-foreground">Thursday shows highest efficiency</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
                <p className="text-sm font-medium text-warning">Improvement Area</p>
                <p className="text-xs text-muted-foreground">Weekend processing needs optimization</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-metro">
            <CardHeader>
              <CardTitle className="text-lg">System Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">AI Model Accuracy</span>
                <Badge className="status-success">98.2%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Response Time</span>
                <Badge className="status-success">Optimal</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Error Rate</span>
                <Badge className="status-success">1.8%</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="card-metro">
            <CardHeader>
              <CardTitle className="text-lg">Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="font-medium">New Record!</p>
                <p className="text-muted-foreground">Processed 500 docs in single day</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Efficiency Boost</p>
                <p className="text-muted-foreground">25% faster than last month</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Zero Downtime</p>
                <p className="text-muted-foreground">15 days of continuous operation</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;