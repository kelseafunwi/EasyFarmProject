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
import { useToast } from "@/hooks/use-toast"
import {
  Users,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  Award,
  TrendingUp,
} from "lucide-react"

interface Employee {
  id: string
  name: string
  email: string
  phone: string
  position: string
  department: string
  hireDate: string
  salary: number
  status: "active" | "inactive" | "on-leave"
  address: string
  emergencyContact: string
  skills: string[]
  avatar?: string
  performance: number
  hoursWorked: number
  tasksCompleted: number
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@farm.com",
    phone: "+1 (555) 123-4567",
    position: "Farm Manager",
    department: "Management",
    hireDate: "2022-03-15",
    salary: 65000,
    status: "active",
    address: "123 Farm Road, Rural County",
    emergencyContact: "Jane Smith - (555) 987-6543",
    skills: ["Leadership", "Crop Management", "Equipment Operation"],
    performance: 95,
    hoursWorked: 2080,
    tasksCompleted: 156,
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria.garcia@farm.com",
    phone: "+1 (555) 234-5678",
    position: "Crop Specialist",
    department: "Agriculture",
    hireDate: "2023-01-20",
    salary: 48000,
    status: "active",
    address: "456 Valley View, Rural County",
    emergencyContact: "Carlos Garcia - (555) 876-5432",
    skills: ["Plant Pathology", "Soil Analysis", "Pest Control"],
    performance: 88,
    hoursWorked: 1950,
    tasksCompleted: 142,
  },
  {
    id: "3",
    name: "David Johnson",
    email: "david.johnson@farm.com",
    phone: "+1 (555) 345-6789",
    position: "Equipment Operator",
    department: "Operations",
    hireDate: "2021-08-10",
    salary: 42000,
    status: "active",
    address: "789 Country Lane, Rural County",
    emergencyContact: "Sarah Johnson - (555) 765-4321",
    skills: ["Heavy Machinery", "Maintenance", "Safety Protocols"],
    performance: 92,
    hoursWorked: 2100,
    tasksCompleted: 98,
  },
  {
    id: "4",
    name: "Lisa Chen",
    email: "lisa.chen@farm.com",
    phone: "+1 (555) 456-7890",
    position: "Quality Control",
    department: "Quality Assurance",
    hireDate: "2023-06-01",
    salary: 45000,
    status: "on-leave",
    address: "321 Harvest Street, Rural County",
    emergencyContact: "Michael Chen - (555) 654-3210",
    skills: ["Quality Testing", "Documentation", "Compliance"],
    performance: 85,
    hoursWorked: 1200,
    tasksCompleted: 67,
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert.wilson@farm.com",
    phone: "+1 (555) 567-8901",
    position: "Field Worker",
    department: "Operations",
    hireDate: "2022-11-15",
    salary: 35000,
    status: "active",
    address: "654 Meadow Drive, Rural County",
    emergencyContact: "Emma Wilson - (555) 543-2109",
    skills: ["Planting", "Harvesting", "Irrigation"],
    performance: 78,
    hoursWorked: 1980,
    tasksCompleted: 203,
  },
]

const departments = ["All", "Management", "Agriculture", "Operations", "Quality Assurance", "Maintenance"]
const positions = [
  "Farm Manager",
  "Crop Specialist",
  "Equipment Operator",
  "Field Worker",
  "Quality Control",
  "Maintenance Technician",
]

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const { toast } = useToast()

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "All" || employee.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "on-leave":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return "text-green-600"
    if (performance >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  const handleAddEmployee = () => {
    toast({
      title: "Employee Added",
      description: "New employee has been added successfully.",
    })
    setIsAddDialogOpen(false)
  }

  const activeEmployees = employees.filter((emp) => emp.status === "active").length
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0)
  const avgPerformance = employees.reduce((sum, emp) => sum + emp.performance, 0) / employees.length

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 lg:ml-64">
        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Employee Management</h1>
                <p className="text-gray-600 mt-1">Manage your farm workforce and track performance</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Performance Review
                </Button>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      Add Employee
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Employee</DialogTitle>
                      <DialogDescription>Add a new employee to your farm workforce.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="Enter full name" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="employee@farm.com" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" placeholder="+1 (555) 123-4567" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="position">Position</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                          <SelectContent>
                            {positions.map((position) => (
                              <SelectItem key={position} value={position.toLowerCase().replace(" ", "-")}>
                                {position}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="department">Department</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.slice(1).map((dept) => (
                              <SelectItem key={dept} value={dept.toLowerCase().replace(" ", "-")}>
                                {dept}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="salary">Annual Salary</Label>
                        <Input id="salary" type="number" placeholder="50000" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea id="address" placeholder="Enter address" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="emergency">Emergency Contact</Label>
                        <Input id="emergency" placeholder="Name - Phone" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddEmployee}>Add Employee</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{employees.length}</div>
                <p className="text-xs text-muted-foreground">{activeEmployees} active employees</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalSalary.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Annual salary budget</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getPerformanceColor(avgPerformance)}`}>
                  {avgPerformance.toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">Team performance score</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Departments</CardTitle>
                <Filter className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{departments.length - 1}</div>
                <p className="text-xs text-muted-foreground">Active departments</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search employees by name, email, or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Employee Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <Card key={employee.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{employee.name}</CardTitle>
                        <p className="text-sm text-gray-600">{employee.position}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(employee.status)}>{employee.status.replace("-", " ")}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      {employee.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {employee.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {employee.department}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Hired: {new Date(employee.hireDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className={`text-lg font-bold ${getPerformanceColor(employee.performance)}`}>
                        {employee.performance}%
                      </div>
                      <div className="text-xs text-gray-500">Performance</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{employee.hoursWorked.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Hours</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{employee.tasksCompleted}</div>
                      <div className="text-xs text-gray-500">Tasks</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Skills:</div>
                    <div className="flex flex-wrap gap-1">
                      {employee.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="text-lg font-bold text-green-600">${employee.salary.toLocaleString()}/yr</div>
                    <div className="flex gap-1">
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
