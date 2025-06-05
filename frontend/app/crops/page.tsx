"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaf, Plus, MapPin, AlertTriangle, CheckCircle, Edit, Eye } from "lucide-react"

export default function CropPlanning() {
  const [selectedCrop, setSelectedCrop] = useState(null)
  const [showAddDialog, setShowAddDialog] = useState(false)

  // Sample crop data - in real app, this would come from Spring Boot API
  const crops = [
    {
      id: 1,
      name: "Corn",
      variety: "Sweet Corn",
      area: "80 acres",
      field: "Field A",
      plantingDate: "2024-04-15",
      expectedHarvest: "2024-08-20",
      currentStage: "Flowering",
      progress: 75,
      status: "healthy",
      yield: "Expected: 180 bushels/acre",
      notes: "Growth is on track. Regular irrigation scheduled.",
      tasks: [
        { task: "Fertilizer Application", date: "2024-06-10", status: "completed" },
        { task: "Pest Control", date: "2024-06-25", status: "pending" },
        { task: "Irrigation Check", date: "2024-07-01", status: "scheduled" },
      ],
    },
    {
      id: 2,
      name: "Wheat",
      variety: "Winter Wheat",
      area: "60 acres",
      field: "Field B",
      plantingDate: "2024-03-01",
      expectedHarvest: "2024-07-15",
      currentStage: "Harvesting",
      progress: 90,
      status: "ready",
      yield: "Actual: 45 bushels/acre",
      notes: "Ready for harvest. Weather conditions favorable.",
      tasks: [
        { task: "Harvest Planning", date: "2024-07-10", status: "completed" },
        { task: "Equipment Check", date: "2024-07-12", status: "completed" },
        { task: "Harvest Execution", date: "2024-07-15", status: "in-progress" },
      ],
    },
    {
      id: 3,
      name: "Soybeans",
      variety: "Non-GMO Soybeans",
      area: "70 acres",
      field: "Field C",
      plantingDate: "2024-05-01",
      expectedHarvest: "2024-09-30",
      currentStage: "Growing",
      progress: 45,
      status: "healthy",
      yield: "Expected: 50 bushels/acre",
      notes: "Good germination rate. Monitor for pests.",
      tasks: [
        { task: "Weed Control", date: "2024-06-15", status: "completed" },
        { task: "Soil Test", date: "2024-07-01", status: "pending" },
        { task: "Mid-season Fertilizer", date: "2024-07-20", status: "scheduled" },
      ],
    },
    {
      id: 4,
      name: "Tomatoes",
      variety: "Roma Tomatoes",
      area: "40 acres",
      field: "Field D",
      plantingDate: "2024-04-20",
      expectedHarvest: "2024-07-30",
      currentStage: "Fruiting",
      progress: 60,
      status: "attention",
      yield: "Expected: 25 tons/acre",
      notes: "Some signs of blight detected. Treatment applied.",
      tasks: [
        { task: "Disease Treatment", date: "2024-06-20", status: "completed" },
        { task: "Support Structure Check", date: "2024-06-30", status: "pending" },
        { task: "Harvest Preparation", date: "2024-07-25", status: "scheduled" },
      ],
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800"
      case "ready":
        return "bg-blue-100 text-blue-800"
      case "attention":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTaskStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "scheduled":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:pl-64">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Leaf className="mr-3 h-6 w-6 text-green-600" />
                  Crop Planning & Management
                </h1>
                <p className="text-gray-600 mt-1">Plan, monitor, and manage your crop lifecycle</p>
              </div>
              <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Crop
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Crop</DialogTitle>
                    <DialogDescription>Create a new crop planning entry for your farm</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="crop-name">Crop Name</Label>
                      <Input id="crop-name" placeholder="e.g., Corn" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="variety">Variety</Label>
                      <Input id="variety" placeholder="e.g., Sweet Corn" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="field">Field</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select field" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="field-a">Field A</SelectItem>
                          <SelectItem value="field-b">Field B</SelectItem>
                          <SelectItem value="field-c">Field C</SelectItem>
                          <SelectItem value="field-d">Field D</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="area">Area (acres)</Label>
                      <Input id="area" type="number" placeholder="80" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="planting-date">Planting Date</Label>
                      <Input id="planting-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="harvest-date">Expected Harvest</Label>
                      <Input id="harvest-date" type="date" />
                    </div>
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea id="notes" placeholder="Additional notes about this crop..." />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">Create Crop Plan</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Crops</CardTitle>
                <Leaf className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{crops.length}</div>
                <p className="text-xs text-muted-foreground">Active crop plans</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Area</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">250</div>
                <p className="text-xs text-muted-foreground">Acres under cultivation</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ready to Harvest</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Wheat ready for harvest</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Needs Attention</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Tomatoes need monitoring</p>
              </CardContent>
            </Card>
          </div>

          {/* Crop Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {crops.map((crop) => (
              <Card key={crop.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{crop.name}</CardTitle>
                      <CardDescription>
                        {crop.variety} • {crop.area}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(crop.status)}>{crop.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{crop.progress}%</span>
                    </div>
                    <Progress value={crop.progress} className="h-2" />
                    <p className="text-sm text-gray-600">{crop.currentStage}</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Field:</span>
                      <span className="font-medium">{crop.field}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Planted:</span>
                      <span className="font-medium">{new Date(crop.plantingDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Harvest:</span>
                      <span className="font-medium">{new Date(crop.expectedHarvest).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">{crop.yield}</p>
                    <p className="text-xs text-gray-600 mt-1">{crop.notes}</p>
                  </div>

                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>
                            {crop.name} - {crop.variety}
                          </DialogTitle>
                          <DialogDescription>Detailed crop information and task management</DialogDescription>
                        </DialogHeader>
                        <Tabs defaultValue="overview" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="tasks">Tasks</TabsTrigger>
                            <TabsTrigger value="analytics">Analytics</TabsTrigger>
                          </TabsList>
                          <TabsContent value="overview" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-base">Crop Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span>Variety:</span>
                                    <span className="font-medium">{crop.variety}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Area:</span>
                                    <span className="font-medium">{crop.area}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Field:</span>
                                    <span className="font-medium">{crop.field}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Current Stage:</span>
                                    <span className="font-medium">{crop.currentStage}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Progress:</span>
                                    <span className="font-medium">{crop.progress}%</span>
                                  </div>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-base">Timeline</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span>Planted:</span>
                                    <span className="font-medium">
                                      {new Date(crop.plantingDate).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Expected Harvest:</span>
                                    <span className="font-medium">
                                      {new Date(crop.expectedHarvest).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Days to Harvest:</span>
                                    <span className="font-medium">
                                      {Math.ceil((new Date(crop.expectedHarvest) - new Date()) / (1000 * 60 * 60 * 24))}{" "}
                                      days
                                    </span>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-base">Notes & Observations</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-gray-700">{crop.notes}</p>
                              </CardContent>
                            </Card>
                          </TabsContent>
                          <TabsContent value="tasks" className="space-y-4">
                            <div className="space-y-3">
                              {crop.tasks.map((task, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                  <div>
                                    <p className="font-medium text-sm">{task.task}</p>
                                    <p className="text-xs text-gray-500">
                                      Due: {new Date(task.date).toLocaleDateString()}
                                    </p>
                                  </div>
                                  <Badge className={getTaskStatusColor(task.status)}>{task.status}</Badge>
                                </div>
                              ))}
                            </div>
                            <Button className="w-full" variant="outline">
                              <Plus className="mr-2 h-4 w-4" />
                              Add New Task
                            </Button>
                          </TabsContent>
                          <TabsContent value="analytics" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-base">Yield Projection</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold text-green-600">{crop.yield.split(": ")[1]}</div>
                                  <p className="text-sm text-gray-600">Based on current conditions</p>
                                </CardContent>
                              </Card>
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-base">Health Score</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="text-2xl font-bold text-blue-600">
                                    {crop.status === "healthy" ? "95%" : crop.status === "ready" ? "100%" : "75%"}
                                  </div>
                                  <p className="text-sm text-gray-600">Overall crop health</p>
                                </CardContent>
                              </Card>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
