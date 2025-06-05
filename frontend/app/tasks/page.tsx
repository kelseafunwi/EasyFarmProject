"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import {
  Plus,
  Search,
  Clock,
  User,
  CalendarIcon,
  CheckCircle2,
  XCircle,
  Edit,
  Trash2,
  Eye,
  Flag,
  MapPin,
  Timer,
} from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  assignee: string
  assigneeAvatar?: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "pending" | "in-progress" | "completed" | "overdue"
  category: string
  location: string
  dueDate: string
  createdDate: string
  estimatedHours: number
  actualHours?: number
  tags: string[]
  dependencies?: string[]
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Harvest Corn Field A",
    description:
      "Complete harvest of the 50-acre corn field in the north section. Check moisture levels and quality before storage.",
    assignee: "John Smith",
    priority: "high",
    status: "in-progress",
    category: "Harvesting",
    location: "Field A - North Section",
    dueDate: "2024-01-20",
    createdDate: "2024-01-15",
    estimatedHours: 16,
    actualHours: 8,
    tags: ["Corn", "Harvest", "Quality Control"],
  },
  {
    id: "2",
    title: "Irrigation System Maintenance",
    description: "Inspect and maintain the drip irrigation system in greenhouse B. Replace any damaged components.",
    assignee: "David Johnson",
    priority: "medium",
    status: "pending",
    category: "Maintenance",
    location: "Greenhouse B",
    dueDate: "2024-01-22",
    createdDate: "2024-01-16",
    estimatedHours: 4,
    tags: ["Irrigation", "Maintenance", "Greenhouse"],
  },
  {
    id: "3",
    title: "Soil Testing - South Fields",
    description:
      "Collect soil samples from the south fields and send for nutrient analysis. Document pH levels and recommendations.",
    assignee: "Maria Garcia",
    priority: "medium",
    status: "completed",
    category: "Soil Management",
    location: "South Fields",
    dueDate: "2024-01-18",
    createdDate: "2024-01-10",
    estimatedHours: 6,
    actualHours: 5,
    tags: ["Soil", "Testing", "Analysis"],
  },
  {
    id: "4",
    title: "Pesticide Application",
    description:
      "Apply organic pesticide to tomato crops in greenhouse A. Follow safety protocols and document application rates.",
    assignee: "Lisa Chen",
    priority: "urgent",
    status: "overdue",
    category: "Crop Protection",
    location: "Greenhouse A",
    dueDate: "2024-01-17",
    createdDate: "2024-01-12",
    estimatedHours: 3,
    tags: ["Pesticide", "Tomatoes", "Organic"],
  },
  {
    id: "5",
    title: "Equipment Calibration",
    description: "Calibrate the new planting equipment for spring season. Test accuracy and adjust settings as needed.",
    assignee: "Robert Wilson",
    priority: "low",
    status: "pending",
    category: "Equipment",
    location: "Equipment Shed",
    dueDate: "2024-01-25",
    createdDate: "2024-01-16",
    estimatedHours: 8,
    tags: ["Equipment", "Calibration", "Planting"],
  },
  {
    id: "6",
    title: "Livestock Health Check",
    description: "Conduct weekly health inspection of cattle. Check for signs of illness and update health records.",
    assignee: "John Smith",
    priority: "high",
    status: "in-progress",
    category: "Livestock",
    location: "Pasture C",
    dueDate: "2024-01-19",
    createdDate: "2024-01-14",
    estimatedHours: 2,
    actualHours: 1,
    tags: ["Livestock", "Health", "Cattle"],
  },
]

const categories = [
  "All",
  "Harvesting",
  "Maintenance",
  "Soil Management",
  "Crop Protection",
  "Equipment",
  "Livestock",
  "Planting",
]
const priorities = ["All", "Low", "Medium", "High", "Urgent"]
const statuses = ["All", "Pending", "In Progress", "Completed", "Overdue"]

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPriority, setSelectedPriority] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [activeTab, setActiveTab] = useState("list")
  const { toast } = useToast()

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || task.category === selectedCategory
    const matchesPriority = selectedPriority === "All" || task.priority === selectedPriority.toLowerCase()
    const matchesStatus = selectedStatus === "All" || task.status === selectedStatus.toLowerCase().replace(" ", "-")
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-blue-100 text-blue-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "urgent":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "in-progress":
        return <Timer className="h-4 w-4" />
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />
      case "overdue":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const handleAddTask = () => {
    toast({
      title: "Task Created",
      description: "New task has been created and assigned successfully.",
    })
    setIsAddDialogOpen(false)
  }

  const handleStatusChange = (taskId: string, newStatus: string) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, status: newStatus as any } : task)))
    toast({
      title: "Task Updated",
      description: "Task status has been updated successfully.",
    })
  }

  const pendingTasks = tasks.filter((task) => task.status === "pending").length
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress").length
  const completedTasks = tasks.filter((task) => task.status === "completed").length
  const overdueTasks = tasks.filter((task) => task.status === "overdue").length

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 lg:ml-64">
        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Task Management</h1>
                <p className="text-gray-600 mt-1">Organize and track farm operations and activities</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  Schedule View
                </Button>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Create Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Task</DialogTitle>
                      <DialogDescription>Create a new task and assign it to a team member.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">Task Title</Label>
                        <Input id="title" placeholder="Enter task title" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Describe the task details" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="assignee">Assign To</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select team member" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="john-smith">John Smith</SelectItem>
                            <SelectItem value="maria-garcia">Maria Garcia</SelectItem>
                            <SelectItem value="david-johnson">David Johnson</SelectItem>
                            <SelectItem value="lisa-chen">Lisa Chen</SelectItem>
                            <SelectItem value="robert-wilson">Robert Wilson</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="grid gap-2">
                          <Label htmlFor="priority">Priority</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="category">Category</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.slice(1).map((category) => (
                                <SelectItem key={category} value={category.toLowerCase().replace(" ", "-")}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="Field, greenhouse, etc." />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="grid gap-2">
                          <Label>Due Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="justify-start text-left font-normal">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="hours">Est. Hours</Label>
                          <Input id="hours" type="number" placeholder="8" />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddTask}>Create Task</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-600">{pendingTasks}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <Timer className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{inProgressTasks}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue</CardTitle>
                <XCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{overdueTasks}</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search tasks, assignees, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tasks List */}
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h3 className="text-lg font-semibold">{task.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(task.priority)}>
                            <Flag className="h-3 w-3 mr-1" />
                            {task.priority}
                          </Badge>
                          <Badge className={getStatusColor(task.status)}>
                            {getStatusIcon(task.status)}
                            <span className="ml-1">{task.status.replace("-", " ")}</span>
                          </Badge>
                          <Badge variant="outline">{task.category}</Badge>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm">{task.description}</p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={task.assigneeAvatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">
                              {task.assignee
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {task.assignee}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {task.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {task.estimatedHours}h estimated
                          {task.actualHours && ` (${task.actualHours}h actual)`}
                        </div>
                      </div>

                      {task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {task.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Select value={task.status} onValueChange={(value) => handleStatusChange(task.id, value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="overdue">Overdue</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
