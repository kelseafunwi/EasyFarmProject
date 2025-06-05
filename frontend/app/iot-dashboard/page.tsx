"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Thermometer,
  Droplets,
  Wind,
  Zap,
  Wifi,
  AlertTriangle,
  CheckCircle,
  Activity,
  Gauge,
  MapPin,
  Settings,
  TrendingUp,
  TrendingDown,
  Battery,
  Signal,
} from "lucide-react"

interface SensorData {
  id: string
  name: string
  type: string
  location: string
  value: number
  unit: string
  status: "online" | "offline" | "warning"
  batteryLevel: number
  signalStrength: number
  lastUpdate: string
  threshold: { min: number; max: number }
  trend: "up" | "down" | "stable"
}

export default function IoTDashboard() {
  const [sensors, setSensors] = useState<SensorData[]>([])
  const [selectedField, setSelectedField] = useState("all")

  // Simulate real-time sensor data
  useEffect(() => {
    const initialSensors: SensorData[] = [
      {
        id: "soil-001",
        name: "Soil Moisture Sensor",
        type: "soil_moisture",
        location: "Field A - North",
        value: 65,
        unit: "%",
        status: "online",
        batteryLevel: 87,
        signalStrength: 92,
        lastUpdate: new Date().toISOString(),
        threshold: { min: 40, max: 80 },
        trend: "stable",
      },
      {
        id: "temp-001",
        name: "Temperature Sensor",
        type: "temperature",
        location: "Field A - Center",
        value: 24.5,
        unit: "°C",
        status: "online",
        batteryLevel: 76,
        signalStrength: 88,
        lastUpdate: new Date().toISOString(),
        threshold: { min: 15, max: 35 },
        trend: "up",
      },
      {
        id: "ph-001",
        name: "pH Sensor",
        type: "ph",
        location: "Field A - South",
        value: 6.8,
        unit: "pH",
        status: "warning",
        batteryLevel: 23,
        signalStrength: 65,
        lastUpdate: new Date().toISOString(),
        threshold: { min: 6.0, max: 7.5 },
        trend: "down",
      },
      {
        id: "humidity-001",
        name: "Humidity Sensor",
        type: "humidity",
        location: "Greenhouse 1",
        value: 72,
        unit: "%",
        status: "online",
        batteryLevel: 94,
        signalStrength: 96,
        lastUpdate: new Date().toISOString(),
        threshold: { min: 60, max: 80 },
        trend: "stable",
      },
      {
        id: "light-001",
        name: "Light Intensity Sensor",
        type: "light",
        location: "Greenhouse 1",
        value: 45000,
        unit: "lux",
        status: "online",
        batteryLevel: 82,
        signalStrength: 91,
        lastUpdate: new Date().toISOString(),
        threshold: { min: 20000, max: 60000 },
        trend: "up",
      },
      {
        id: "wind-001",
        name: "Wind Speed Sensor",
        type: "wind",
        location: "Weather Station",
        value: 12.3,
        unit: "km/h",
        status: "online",
        batteryLevel: 68,
        signalStrength: 85,
        lastUpdate: new Date().toISOString(),
        threshold: { min: 0, max: 50 },
        trend: "down",
      },
    ]

    setSensors(initialSensors)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setSensors((prevSensors) =>
        prevSensors.map((sensor) => ({
          ...sensor,
          value: sensor.value + (Math.random() - 0.5) * 2,
          lastUpdate: new Date().toISOString(),
          trend: Math.random() > 0.5 ? "up" : Math.random() > 0.5 ? "down" : "stable",
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getSensorIcon = (type: string) => {
    switch (type) {
      case "soil_moisture":
        return <Droplets className="h-5 w-5 text-blue-600" />
      case "temperature":
        return <Thermometer className="h-5 w-5 text-red-600" />
      case "ph":
        return <Activity className="h-5 w-5 text-purple-600" />
      case "humidity":
        return <Droplets className="h-5 w-5 text-cyan-600" />
      case "light":
        return <Zap className="h-5 w-5 text-yellow-600" />
      case "wind":
        return <Wind className="h-5 w-5 text-gray-600" />
      default:
        return <Gauge className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800"
      case "offline":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const onlineSensors = sensors.filter((s) => s.status === "online").length
  const warningSensors = sensors.filter((s) => s.status === "warning").length
  const offlineSensors = sensors.filter((s) => s.status === "offline").length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:pl-64">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Activity className="mr-3 h-6 w-6 text-blue-600" />
                  Smart Farm IoT Dashboard
                </h1>
                <p className="text-gray-600 mt-1">Real-time monitoring of farm sensors and environmental conditions</p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  <Wifi className="h-4 w-4 mr-1" />
                  {onlineSensors} Online
                </Badge>
                {warningSensors > 0 && (
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    {warningSensors} Warnings
                  </Badge>
                )}
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sensors</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{sensors.length}</div>
                <p className="text-xs text-muted-foreground">Across all fields</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Online Sensors</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{onlineSensors}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((onlineSensors / sensors.length) * 100)}% operational
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Warnings</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{warningSensors}</div>
                <p className="text-xs text-muted-foreground">Need attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Data Points</CardTitle>
                <Gauge className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.7K</div>
                <p className="text-xs text-muted-foreground">Collected today</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="sensors" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="sensors">Live Sensors</TabsTrigger>
              <TabsTrigger value="alerts">Alerts & Notifications</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="automation">Automation Rules</TabsTrigger>
            </TabsList>

            <TabsContent value="sensors" className="space-y-6">
              {/* Sensor Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sensors.map((sensor) => (
                  <Card key={sensor.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getSensorIcon(sensor.type)}
                          <CardTitle className="text-lg">{sensor.name}</CardTitle>
                        </div>
                        <Badge className={getStatusColor(sensor.status)}>{sensor.status}</Badge>
                      </div>
                      <CardDescription className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {sensor.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Current Value */}
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-3xl font-bold flex items-center justify-center space-x-2">
                          <span>{sensor.value.toFixed(1)}</span>
                          <span className="text-lg text-gray-500">{sensor.unit}</span>
                          {getTrendIcon(sensor.trend)}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Current Reading</p>
                      </div>

                      {/* Threshold Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>
                            Range: {sensor.threshold.min} - {sensor.threshold.max}
                          </span>
                          <span
                            className={
                              sensor.value >= sensor.threshold.min && sensor.value <= sensor.threshold.max
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {sensor.value >= sensor.threshold.min && sensor.value <= sensor.threshold.max
                              ? "Optimal"
                              : "Out of Range"}
                          </span>
                        </div>
                        <Progress
                          value={
                            ((sensor.value - sensor.threshold.min) / (sensor.threshold.max - sensor.threshold.min)) *
                            100
                          }
                          className="h-2"
                        />
                      </div>

                      {/* Sensor Status */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Battery className="h-4 w-4 text-gray-500" />
                          <span>{sensor.batteryLevel}%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Signal className="h-4 w-4 text-gray-500" />
                          <span>{sensor.signalStrength}%</span>
                        </div>
                      </div>

                      <div className="text-xs text-gray-500">
                        Last update: {new Date(sensor.lastUpdate).toLocaleTimeString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Alerts</CardTitle>
                  <CardDescription>Real-time notifications and warnings from your sensors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      type: "warning",
                      title: "Low Battery Alert",
                      description: "pH Sensor (Field A - South) battery level is at 23%",
                      time: "2 minutes ago",
                      action: "Replace battery",
                    },
                    {
                      type: "info",
                      title: "Optimal Conditions",
                      description: "All greenhouse sensors reporting optimal growing conditions",
                      time: "15 minutes ago",
                      action: "Continue monitoring",
                    },
                    {
                      type: "warning",
                      title: "Soil Moisture Low",
                      description: "Field B moisture levels below optimal range",
                      time: "1 hour ago",
                      action: "Schedule irrigation",
                    },
                  ].map((alert, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-l-4 ${
                        alert.type === "warning"
                          ? "bg-yellow-50 border-yellow-400"
                          : alert.type === "error"
                            ? "bg-red-50 border-red-400"
                            : "bg-blue-50 border-blue-400"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{alert.title}</h3>
                          <p className="text-sm text-gray-700 mt-1">{alert.description}</p>
                          <p className="text-xs text-gray-500 mt-2">{alert.time}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          {alert.action}
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sensor Performance</CardTitle>
                    <CardDescription>Uptime and reliability metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Average Uptime</span>
                        <span className="font-semibold">98.7%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Data Accuracy</span>
                        <span className="font-semibold">99.2%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Response Time</span>
                        <span className="font-semibold">1.2s</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Environmental Trends</CardTitle>
                    <CardDescription>24-hour averages</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Avg Temperature</span>
                        <span className="font-semibold">23.8°C</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Avg Humidity</span>
                        <span className="font-semibold">68%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Avg Soil Moisture</span>
                        <span className="font-semibold">62%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="automation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Automation Rules</CardTitle>
                  <CardDescription>Configure automatic responses to sensor data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      name: "Auto Irrigation",
                      condition: "Soil moisture < 40%",
                      action: "Start irrigation for 30 minutes",
                      status: "Active",
                    },
                    {
                      name: "Temperature Alert",
                      condition: "Temperature > 35°C",
                      action: "Send SMS alert to farm manager",
                      status: "Active",
                    },
                    {
                      name: "Greenhouse Ventilation",
                      condition: "Humidity > 85%",
                      action: "Open ventilation fans",
                      status: "Active",
                    },
                    {
                      name: "Low Battery Warning",
                      condition: "Battery level < 25%",
                      action: "Send maintenance notification",
                      status: "Active",
                    },
                  ].map((rule, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold">{rule.name}</h3>
                        <p className="text-sm text-gray-600">
                          When {rule.condition} → {rule.action}
                        </p>
                      </div>
                      <Badge variant={rule.status === "Active" ? "default" : "secondary"}>{rule.status}</Badge>
                    </div>
                  ))}
                  <Button className="w-full" variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    Add New Rule
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
