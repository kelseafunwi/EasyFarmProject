"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import {
  BarChart3,
  Download,
  CalendarIcon,
  TrendingUp,
  DollarSign,
  Leaf,
  Thermometer,
  Activity,
  FileText,
  PieChart,
  LineChart,
} from "lucide-react"
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"

// Mock data for charts
const revenueData = [
  { month: "Jan", revenue: 45000, expenses: 32000, profit: 13000 },
  { month: "Feb", revenue: 52000, expenses: 35000, profit: 17000 },
  { month: "Mar", revenue: 48000, expenses: 33000, profit: 15000 },
  { month: "Apr", revenue: 61000, expenses: 38000, profit: 23000 },
  { month: "May", revenue: 55000, expenses: 36000, profit: 19000 },
  { month: "Jun", revenue: 67000, expenses: 41000, profit: 26000 },
]

const cropYieldData = [
  { crop: "Corn", yield: 180, target: 200, efficiency: 90 },
  { crop: "Wheat", yield: 65, target: 70, efficiency: 93 },
  { crop: "Soybeans", yield: 55, target: 50, efficiency: 110 },
  { crop: "Tomatoes", yield: 45, target: 40, efficiency: 113 },
  { crop: "Potatoes", yield: 320, target: 300, efficiency: 107 },
]

const expenseBreakdown = [
  { category: "Seeds & Plants", amount: 25000, color: "#8884d8" },
  { category: "Fertilizers", amount: 18000, color: "#82ca9d" },
  { category: "Equipment", amount: 35000, color: "#ffc658" },
  { category: "Labor", amount: 42000, color: "#ff7300" },
  { category: "Utilities", amount: 12000, color: "#00ff88" },
  { category: "Other", amount: 8000, color: "#ff0088" },
]

const weatherData = [
  { date: "Jan", temperature: 35, rainfall: 2.1, humidity: 65 },
  { date: "Feb", temperature: 42, rainfall: 1.8, humidity: 62 },
  { date: "Mar", temperature: 55, rainfall: 3.2, humidity: 68 },
  { date: "Apr", temperature: 68, rainfall: 2.8, humidity: 70 },
  { date: "May", temperature: 75, rainfall: 4.1, humidity: 72 },
  { date: "Jun", temperature: 82, rainfall: 3.5, humidity: 75 },
]

const productivityData = [
  { metric: "Tasks Completed", value: 156, target: 150, change: 4 },
  { metric: "Equipment Uptime", value: 94, target: 90, change: 4.4 },
  { metric: "Crop Health Score", value: 87, target: 85, change: 2.3 },
  { metric: "Water Efficiency", value: 92, target: 88, change: 4.5 },
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [selectedReport, setSelectedReport] = useState("overview")
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2024, 0, 1),
    to: new Date(2024, 5, 30),
  })
  const { toast } = useToast()

  const handleExportReport = (reportType: string) => {
    toast({
      title: "Report Exported",
      description: `${reportType} report has been exported successfully.`,
    })
  }

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Custom report has been generated successfully.",
    })
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 lg:ml-64">
        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Reports & Analytics</h1>
                <p className="text-gray-600 mt-1">Comprehensive insights into your farm operations</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={(range) => range && setDateRange(range)}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                <Button variant="outline" onClick={() => handleExportReport("All Reports")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export All
                </Button>
                <Button onClick={handleGenerateReport}>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$328,000</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  +12.5% from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$113,000</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  +8.2% from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Crop Yield</CardTitle>
                <Leaf className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">665 tons</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  +5.8% from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Efficiency Score</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92%</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  +3.1% from last period
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Report Tabs */}
          <Tabs value={selectedReport} onValueChange={setSelectedReport} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="production">Production</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LineChart className="h-5 w-5" />
                      Revenue vs Profit Trend
                    </CardTitle>
                    <CardDescription>Monthly financial performance over the last 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
                        profit: { label: "Profit", color: "hsl(var(--chart-2))" },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
                          <Line type="monotone" dataKey="profit" stroke="var(--color-profit)" strokeWidth={2} />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Crop Yield Performance
                    </CardTitle>
                    <CardDescription>Actual vs target yield by crop type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        yield: { label: "Actual Yield", color: "hsl(var(--chart-1))" },
                        target: { label: "Target Yield", color: "hsl(var(--chart-2))" },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={cropYieldData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="crop" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Bar dataKey="yield" fill="var(--color-yield)" />
                          <Bar dataKey="target" fill="var(--color-target)" />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Thermometer className="h-5 w-5" />
                      Weather Impact Analysis
                    </CardTitle>
                    <CardDescription>Temperature, rainfall, and humidity trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        temperature: { label: "Temperature (°F)", color: "hsl(var(--chart-1))" },
                        rainfall: { label: "Rainfall (inches)", color: "hsl(var(--chart-2))" },
                        humidity: { label: "Humidity (%)", color: "hsl(var(--chart-3))" },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={weatherData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Line type="monotone" dataKey="temperature" stroke="var(--color-temperature)" />
                          <Line type="monotone" dataKey="rainfall" stroke="var(--color-rainfall)" />
                          <Line type="monotone" dataKey="humidity" stroke="var(--color-humidity)" />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Productivity Metrics</CardTitle>
                    <CardDescription>Key performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {productivityData.map((metric, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{metric.metric}</span>
                          <span className="text-sm text-gray-500">{metric.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: `${metric.value}%` }} />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Target: {metric.target}%</span>
                          <span className="text-green-600">+{metric.change}%</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Expense Breakdown
                    </CardTitle>
                    <CardDescription>Distribution of farm expenses by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        amount: { label: "Amount", color: "hsl(var(--chart-1))" },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={expenseBreakdown}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="amount"
                          >
                            {expenseBreakdown.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Financial Summary</CardTitle>
                    <CardDescription>Key financial metrics for the selected period</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                        <p className="text-2xl font-bold text-green-600">$328,000</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                        <p className="text-2xl font-bold text-red-600">$215,000</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600">Net Profit</p>
                        <p className="text-2xl font-bold text-blue-600">$113,000</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600">Profit Margin</p>
                        <p className="text-2xl font-bold text-purple-600">34.5%</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <Button className="w-full" onClick={() => handleExportReport("Financial Report")}>
                        <Download className="h-4 w-4 mr-2" />
                        Export Financial Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="production" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Crop Production Summary</CardTitle>
                    <CardDescription>Production metrics by crop type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {cropYieldData.map((crop, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{crop.crop}</p>
                            <p className="text-sm text-gray-600">{crop.yield} tons produced</p>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold ${crop.efficiency >= 100 ? "text-green-600" : "text-yellow-600"}`}>
                              {crop.efficiency}%
                            </p>
                            <p className="text-sm text-gray-600">Efficiency</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quality Metrics</CardTitle>
                    <CardDescription>Product quality and grade distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Grade A Products</span>
                        <span className="font-bold text-green-600">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "78%" }} />
                      </div>

                      <div className="flex justify-between items-center">
                        <span>Grade B Products</span>
                        <span className="font-bold text-yellow-600">18%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: "18%" }} />
                      </div>

                      <div className="flex justify-between items-center">
                        <span>Grade C Products</span>
                        <span className="font-bold text-red-600">4%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: "4%" }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="operations" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Equipment Utilization</CardTitle>
                    <CardDescription>Equipment usage and efficiency</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Tractors</span>
                        <span className="font-bold">94% uptime</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Harvesters</span>
                        <span className="font-bold">87% uptime</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Irrigation</span>
                        <span className="font-bold">98% uptime</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Labor Efficiency</CardTitle>
                    <CardDescription>Workforce productivity metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Tasks Completed</span>
                        <span className="font-bold text-green-600">156</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Avg. Task Time</span>
                        <span className="font-bold">2.3 hours</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Efficiency Score</span>
                        <span className="font-bold text-blue-600">92%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Resource Usage</CardTitle>
                    <CardDescription>Water, fuel, and energy consumption</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Water Usage</span>
                        <span className="font-bold">1,250 gallons</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Fuel Consumption</span>
                        <span className="font-bold">340 gallons</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Energy Usage</span>
                        <span className="font-bold">2,100 kWh</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
