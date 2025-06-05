"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plane,
  MapPin,
  Battery,
  Signal,
  Camera,
  Droplets,
  Play,
  Square,
  RotateCcw,
  Settings,
  Download,
  Eye,
  CheckCircle,
  Clock,
  Wind,
  Thermometer,
} from "lucide-react"
import { showToast } from "@/lib/toast-utils"

interface Drone {
  id: string
  name: string
  model: string
  status: "idle" | "flying" | "charging" | "maintenance"
  batteryLevel: number
  signalStrength: number
  location: { lat: number; lng: number }
  altitude: number
  speed: number
  flightTime: number
  lastMission: string
  capabilities: string[]
}

interface Mission {
  id: string
  name: string
  type: "survey" | "spray" | "monitoring" | "mapping"
  droneId: string
  status: "scheduled" | "active" | "completed" | "failed"
  progress: number
  area: number
  startTime: string
  estimatedDuration: number
  waypoints: number
}

export default function DroneManagementPage() {
  const [drones, setDrones] = useState<Drone[]>([])
  const [missions, setMissions] = useState<Mission[]>([])
  const [selectedDrone, setSelectedDrone] = useState<string | null>(null)
  const [isCreatingMission, setIsCreatingMission] = useState(false)

  useEffect(() => {
    // Initialize sample data
    const sampleDrones: Drone[] = [
      {
        id: "drone-001",
        name: "AgriDrone Alpha",
        model: "DJI Agras T30",
        status: "idle",
        batteryLevel: 87,
        signalStrength: 95,
        location: { lat: 40.7128, lng: -74.006 },
        altitude: 0,
        speed: 0,
        flightTime: 0,
        lastMission: "Field Survey - Corn",
        capabilities: ["Multispectral Imaging", "Precision Spraying", "Thermal Imaging"],
      },
      {
        id: "drone-002",
        name: "SkyMapper Pro",
        model: "Parrot Bluegrass",
        status: "flying",
        batteryLevel: 64,
        signalStrength: 88,
        location: { lat: 40.7589, lng: -73.9851 },
        altitude: 120,
        speed: 15,
        flightTime: 23,
        lastMission: "Pest Detection - Soybeans",
        capabilities: ["RGB Imaging", "NDVI Analysis", "3D Mapping"],
      },
      {
        id: "drone-003",
        name: "CropGuard Beta",
        model: "Yamaha RMAX",
        status: "charging",
        batteryLevel: 34,
        signalStrength: 0,
        location: { lat: 40.7505, lng: -73.9934 },
        altitude: 0,
        speed: 0,
        flightTime: 0,
        lastMission: "Fertilizer Application",
        capabilities: ["Precision Spraying", "Heavy Payload", "GPS Navigation"],
      },
    ]

    const sampleMissions: Mission[] = [
      {
        id: "mission-001",
        name: "Weekly Field Survey",
        type: "survey",
        droneId: "drone-002",
        status: "active",
        progress: 65,
        area: 45,
        startTime: new Date().toISOString(),
        estimatedDuration: 35,
        waypoints: 24,
      },
      {
        id: "mission-002",
        name: "Pest Control Application",
        type: "spray",
        droneId: "drone-001",
        status: "scheduled",
        progress: 0,
        area: 30,
        startTime: new Date(Date.now() + 3600000).toISOString(),
        estimatedDuration: 45,
        waypoints: 18,
      },
      {
        id: "mission-003",
        name: "Crop Health Monitoring",
        type: "monitoring",
        droneId: "drone-001",
        status: "completed",
        progress: 100,
        area: 60,
        startTime: new Date(Date.now() - 7200000).toISOString(),
        estimatedDuration: 40,
        waypoints: 32,
      },
    ]

    setDrones(sampleDrones)
    setMissions(sampleMissions)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setDrones((prevDrones) =>
        prevDrones.map((drone) => ({
          ...drone,
          batteryLevel: drone.status === "flying" ? Math.max(0, drone.batteryLevel - 0.5) : drone.batteryLevel,
          flightTime: drone.status === "flying" ? drone.flightTime + 1 : drone.flightTime,
        })),
      )

      setMissions((prevMissions) =>
        prevMissions.map((mission) => ({
          ...mission,
          progress: mission.status === "active" ? Math.min(100, mission.progress + 1) : mission.progress,
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "idle":
        return "bg-gray-100 text-gray-800"
      case "flying":
        return "bg-green-100 text-green-800"
      case "charging":
        return "bg-blue-100 text-blue-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMissionStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getMissionIcon = (type: string) => {
    switch (type) {
      case "survey":
        return <Camera className="h-4 w-4" />
      case "spray":
        return <Droplets className="h-4 w-4" />
      case "monitoring":
        return <Eye className="h-4 w-4" />
      case "mapping":
        return <MapPin className="h-4 w-4" />
      default:
        return <Plane className="h-4 w-4" />
    }
  }

  const handleDroneAction = (droneId: string, action: string) => {
    setDrones((prevDrones) =>
      prevDrones.map((drone) => {
        if (drone.id === droneId) {
          switch (action) {
            case "takeoff":
              return { ...drone, status: "flying" as const }
            case "land":
              return { ...drone, status: "idle" as const, altitude: 0, speed: 0 }
            case "return":
              return { ...drone, status: "idle" as const }
            default:
              return drone
          }
        }
        return drone
      }),
    )
    showToast.success(`Drone ${action} command sent successfully`)
  }

  const activeDrones = drones.filter((d) => d.status === "flying").length
  const activeMissions = missions.filter((m) => m.status === "active").length
  const totalFlightTime = drones.reduce((sum, drone) => sum + drone.flightTime, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:pl-64">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Plane className="mr-3 h-6 w-6 text-blue-600" />
                  Drone Fleet Management
                </h1>
                <p className="text-gray-600 mt-1">Autonomous precision agriculture with intelligent drone operations</p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {activeDrones} Active
                </Badge>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Play className="mr-2 h-4 w-4" />
                  New Mission
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
                <CardTitle className="text-sm font-medium">Active Drones</CardTitle>
                <Plane className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeDrones}</div>
                <p className="text-xs text-muted-foreground">of {drones.length} total drones</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Missions</CardTitle>
                <Play className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeMissions}</div>
                <p className="text-xs text-muted-foreground">in progress</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Flight Time Today</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.floor(totalFlightTime / 60)}h {totalFlightTime % 60}m
                </div>
                <p className="text-xs text-muted-foreground">across all drones</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Coverage Today</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">135</div>
                <p className="text-xs text-muted-foreground">acres surveyed</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="fleet" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="fleet">Drone Fleet</TabsTrigger>
              <TabsTrigger value="missions">Mission Control</TabsTrigger>
              <TabsTrigger value="analytics">Flight Analytics</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            </TabsList>

            <TabsContent value="fleet" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {drones.map((drone) => (
                  <Card key={drone.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{drone.name}</CardTitle>
                          <CardDescription>{drone.model}</CardDescription>
                        </div>
                        <Badge className={getStatusColor(drone.status)}>{drone.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Status Indicators */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center">
                              <Battery className="h-4 w-4 mr-1" />
                              Battery
                            </span>
                            <span className="font-medium">{drone.batteryLevel}%</span>
                          </div>
                          <Progress value={drone.batteryLevel} className="h-2" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center">
                              <Signal className="h-4 w-4 mr-1" />
                              Signal
                            </span>
                            <span className="font-medium">{drone.signalStrength}%</span>
                          </div>
                          <Progress value={drone.signalStrength} className="h-2" />
                        </div>
                      </div>

                      {/* Flight Data */}
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <p className="font-medium">{drone.altitude}m</p>
                          <p className="text-xs text-gray-500">Altitude</p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <p className="font-medium">{drone.speed} km/h</p>
                          <p className="text-xs text-gray-500">Speed</p>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <p className="font-medium">{drone.flightTime}m</p>
                          <p className="text-xs text-gray-500">Flight Time</p>
                        </div>
                      </div>

                      {/* Capabilities */}
                      <div>
                        <p className="text-sm font-medium mb-2">Capabilities</p>
                        <div className="flex flex-wrap gap-1">
                          {drone.capabilities.map((capability, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {capability}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex space-x-2">
                        {drone.status === "idle" && (
                          <Button size="sm" className="flex-1" onClick={() => handleDroneAction(drone.id, "takeoff")}>
                            <Play className="h-4 w-4 mr-1" />
                            Takeoff
                          </Button>
                        )}
                        {drone.status === "flying" && (
                          <>
                            <Button size="sm" variant="outline" onClick={() => handleDroneAction(drone.id, "land")}>
                              <Square className="h-4 w-4 mr-1" />
                              Land
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleDroneAction(drone.id, "return")}>
                              <RotateCcw className="h-4 w-4 mr-1" />
                              Return
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-xs text-gray-500">Last mission: {drone.lastMission}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="missions" className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Mission Control</h2>
                <Button onClick={() => setIsCreatingMission(true)}>
                  <Play className="mr-2 h-4 w-4" />
                  Create Mission
                </Button>
              </div>

              <div className="space-y-4">
                {missions.map((mission) => (
                  <Card key={mission.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getMissionIcon(mission.type)}
                          <div>
                            <CardTitle className="text-lg">{mission.name}</CardTitle>
                            <CardDescription className="capitalize">{mission.type} Mission</CardDescription>
                          </div>
                        </div>
                        <Badge className={getMissionStatusColor(mission.status)}>{mission.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Area</p>
                          <p className="font-medium">{mission.area} acres</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Duration</p>
                          <p className="font-medium">{mission.estimatedDuration} min</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Waypoints</p>
                          <p className="font-medium">{mission.waypoints}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Drone</p>
                          <p className="font-medium">
                            {drones.find((d) => d.id === mission.droneId)?.name || "Unassigned"}
                          </p>
                        </div>
                      </div>

                      {mission.status === "active" && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{mission.progress}%</span>
                          </div>
                          <Progress value={mission.progress} className="h-2" />
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          {mission.status === "scheduled"
                            ? `Scheduled: ${new Date(mission.startTime).toLocaleString()}`
                            : mission.status === "active"
                              ? `Started: ${new Date(mission.startTime).toLocaleString()}`
                              : `Completed: ${new Date(mission.startTime).toLocaleString()}`}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          {mission.status === "completed" && (
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-1" />
                              Data
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Flight Performance</CardTitle>
                    <CardDescription>Today's operational metrics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Flight Time</span>
                      <span className="font-semibold">
                        {Math.floor(totalFlightTime / 60)}h {totalFlightTime % 60}m
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Area Covered</span>
                      <span className="font-semibold">135 acres</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Missions Completed</span>
                      <span className="font-semibold">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Speed</span>
                      <span className="font-semibold">18 km/h</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Efficiency Metrics</CardTitle>
                    <CardDescription>Performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Mission Success Rate</span>
                      <span className="font-semibold text-green-600">98.5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Battery Efficiency</span>
                      <span className="font-semibold">92%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Data Quality</span>
                      <span className="font-semibold">99.2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Uptime</span>
                      <span className="font-semibold">96.8%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Weather Conditions</CardTitle>
                  <CardDescription>Current conditions affecting flight operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Wind className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                      <p className="text-sm text-gray-600">Wind Speed</p>
                      <p className="font-semibold">12 km/h</p>
                      <Badge variant="outline" className="mt-1 bg-green-50 text-green-700">
                        Safe
                      </Badge>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Thermometer className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                      <p className="text-sm text-gray-600">Temperature</p>
                      <p className="font-semibold">24°C</p>
                      <Badge variant="outline" className="mt-1 bg-green-50 text-green-700">
                        Optimal
                      </Badge>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Droplets className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                      <p className="text-sm text-gray-600">Humidity</p>
                      <p className="font-semibold">65%</p>
                      <Badge variant="outline" className="mt-1 bg-green-50 text-green-700">
                        Good
                      </Badge>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Eye className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                      <p className="text-sm text-gray-600">Visibility</p>
                      <p className="font-semibold">10 km</p>
                      <Badge variant="outline" className="mt-1 bg-green-50 text-green-700">
                        Excellent
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="maintenance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Schedule</CardTitle>
                  <CardDescription>Upcoming and overdue maintenance tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      drone: "AgriDrone Alpha",
                      task: "Battery Calibration",
                      due: "Tomorrow",
                      priority: "medium",
                      status: "scheduled",
                    },
                    {
                      drone: "SkyMapper Pro",
                      task: "Propeller Inspection",
                      due: "3 days",
                      priority: "low",
                      status: "scheduled",
                    },
                    {
                      drone: "CropGuard Beta",
                      task: "Spray System Cleaning",
                      due: "Overdue",
                      priority: "high",
                      status: "overdue",
                    },
                  ].map((maintenance, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold">{maintenance.drone}</h3>
                        <p className="text-sm text-gray-600">{maintenance.task}</p>
                        <p className="text-xs text-gray-500">Due: {maintenance.due}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            maintenance.priority === "high"
                              ? "destructive"
                              : maintenance.priority === "medium"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {maintenance.priority}
                        </Badge>
                        <Badge
                          variant={maintenance.status === "overdue" ? "destructive" : "default"}
                          className={maintenance.status === "overdue" ? "" : "bg-blue-100 text-blue-800"}
                        >
                          {maintenance.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {drones.map((drone) => (
                  <Card key={drone.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{drone.name}</CardTitle>
                      <CardDescription>Maintenance Status</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Flight Hours</span>
                        <span className="font-medium">247h</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Last Service</span>
                        <span className="font-medium">15 days ago</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Next Service</span>
                        <span className="font-medium">5 days</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Health Score</span>
                        <span className="font-medium text-green-600">94%</span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        <Settings className="h-4 w-4 mr-2" />
                        Schedule Service
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
