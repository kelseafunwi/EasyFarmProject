"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Leaf,
  Users,
  Package,
  BarChart3,
  ShoppingCart,
  Cloud,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Calendar,
  DollarSign,
  Droplets,
  Sun,
  Wind,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Sample data - in real app, this would come from Spring Boot API
  const farmData = {
    name: "Green Valley Farm",
    totalArea: "250 acres",
    activeFields: 12,
    totalEmployees: 8,
    monthlyRevenue: 45000,
    monthlyExpenses: 28000,
  }

  const weatherData = {
    temperature: 24,
    humidity: 65,
    windSpeed: 12,
    condition: "Partly Cloudy",
    forecast: "Rain expected tomorrow",
  }

  const cropData = [
    { name: "Corn", area: "80 acres", stage: "Flowering", progress: 75, status: "healthy" },
    { name: "Wheat", area: "60 acres", stage: "Harvesting", progress: 90, status: "ready" },
    { name: "Soybeans", area: "70 acres", stage: "Growing", progress: 45, status: "healthy" },
    { name: "Tomatoes", area: "40 acres", stage: "Fruiting", progress: 60, status: "attention" },
  ]

  const recentTasks = [
    { id: 1, task: "Irrigation System Check", assignee: "John Smith", status: "completed", priority: "high" },
    {
      id: 2,
      task: "Fertilizer Application - Field A",
      assignee: "Maria Garcia",
      status: "in-progress",
      priority: "medium",
    },
    { id: 3, task: "Equipment Maintenance", assignee: "David Wilson", status: "pending", priority: "low" },
    { id: 4, task: "Harvest Planning - Wheat", assignee: "Sarah Johnson", status: "completed", priority: "high" },
  ]

  const inventoryAlerts = [
    { item: "Nitrogen Fertilizer", level: "Low", quantity: "2 bags remaining" },
    { item: "Seeds - Corn", level: "Critical", quantity: "Out of stock" },
    { item: "Pesticide", level: "Medium", quantity: "15 bottles remaining" },
  ]

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3, current: true },
    { name: "Crop Planning", href: "/crops", icon: Leaf, current: false },
    { name: "Inventory", href: "/inventory", icon: Package, current: false },
    { name: "Employees", href: "/employees", icon: Users, current: false },
    { name: "Tasks", href: "/tasks", icon: CheckCircle, current: false },
    { name: "Marketplace", href: "/marketplace", icon: ShoppingCart, current: false },
    { name: "Reports", href: "/reports", icon: BarChart3, current: false },
    { name: "Weather", href: "/weather", icon: Cloud, current: false },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-lg font-bold">FarmMS</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.current ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4 border-b">
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-lg font-bold">FarmMS</span>
            </div>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.current ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">Farm Manager</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="flex-1">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">{farmData.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
                <Badge className="ml-1 bg-red-500 text-white text-xs">3</Badge>
              </Button>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">Welcome back!</p>
                <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${farmData.monthlyRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Fields</CardTitle>
                <Leaf className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{farmData.activeFields}</div>
                <p className="text-xs text-muted-foreground">Across {farmData.totalArea}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{farmData.totalEmployees}</div>
                <p className="text-xs text-muted-foreground">
                  <CheckCircle className="inline h-3 w-3 mr-1 text-green-500" />
                  All active today
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(((farmData.monthlyRevenue - farmData.monthlyExpenses) / farmData.monthlyRevenue) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  ${(farmData.monthlyRevenue - farmData.monthlyExpenses).toLocaleString()} profit
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Weather Widget */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Cloud className="h-5 w-5" />
                  <span>Weather Today</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Sun className="h-8 w-8 text-yellow-500" />
                      <div>
                        <p className="text-2xl font-bold">{weatherData.temperature}°C</p>
                        <p className="text-sm text-gray-500">{weatherData.condition}</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Droplets className="h-4 w-4 text-blue-500" />
                      <span>{weatherData.humidity}% Humidity</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Wind className="h-4 w-4 text-gray-500" />
                      <span>{weatherData.windSpeed} km/h</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-700">{weatherData.forecast}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Irrigation
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Package className="mr-2 h-4 w-4" />
                  Add Inventory Item
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Assign New Task
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            {/* Inventory Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <span>Inventory Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {inventoryAlerts.map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{alert.item}</p>
                      <p className="text-xs text-gray-500">{alert.quantity}</p>
                    </div>
                    <Badge
                      variant={
                        alert.level === "Critical" ? "destructive" : alert.level === "Low" ? "secondary" : "default"
                      }
                    >
                      {alert.level}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Crop Status and Recent Tasks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Crop Status */}
            <Card>
              <CardHeader>
                <CardTitle>Crop Status Overview</CardTitle>
                <CardDescription>Current status of all active crops</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cropData.map((crop, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{crop.name}</p>
                        <p className="text-sm text-gray-500">
                          {crop.area} • {crop.stage}
                        </p>
                      </div>
                      <Badge
                        variant={
                          crop.status === "healthy" ? "default" : crop.status === "ready" ? "secondary" : "destructive"
                        }
                      >
                        {crop.status}
                      </Badge>
                    </div>
                    <Progress value={crop.progress} className="h-2" />
                    <p className="text-xs text-gray-500">{crop.progress}% Complete</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Tasks */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Tasks</CardTitle>
                <CardDescription>Latest task assignments and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{task.task}</p>
                      <p className="text-xs text-gray-500">Assigned to {task.assignee}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          task.priority === "high"
                            ? "destructive"
                            : task.priority === "medium"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {task.priority}
                      </Badge>
                      <Badge
                        variant={
                          task.status === "completed"
                            ? "default"
                            : task.status === "in-progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
