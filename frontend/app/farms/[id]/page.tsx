"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Leaf,
  MapPin,
  Users,
  ArrowLeft,
  Edit,
  Trash,
  Plus,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  BarChart3,
  Tractor,
  Warehouse,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { showToast } from "@/lib/toast-utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample farm data - in a real app, this would come from an API
const farmsData = [
  {
    id: 1,
    name: "Green Valley Farm",
    location: "Springfield, IL",
    size: "250 acres",
    type: "Crop",
    employeeCount: 8,
    description: "A large crop farm specializing in corn and soybeans.",
    status: "active",
    established: "2010-03-15",
    contactEmail: "info@greenvalleyfarm.com",
    contactPhone: "(555) 123-4567",
    crops: ["Corn", "Soybeans", "Wheat"],
    equipment: [
      { name: "Tractor - John Deere 8R", status: "operational" },
      { name: "Combine Harvester", status: "maintenance" },
      { name: "Planter", status: "operational" },
    ],
    buildings: [
      { name: "Main Barn", type: "Storage", size: "5000 sq ft" },
      { name: "Equipment Shed", type: "Equipment", size: "3000 sq ft" },
      { name: "Office Building", type: "Administrative", size: "1200 sq ft" },
    ],
  },
  {
    id: 2,
    name: "Sunset Ranch",
    location: "Austin, TX",
    size: "500 acres",
    type: "Livestock",
    employeeCount: 12,
    description: "Cattle ranch with some crop production for feed.",
    status: "active",
    established: "2005-06-22",
    contactEmail: "info@sunsetranch.com",
    contactPhone: "(555) 987-6543",
    livestock: ["Cattle", "Horses", "Sheep"],
    equipment: [
      { name: "Tractor - Ford", status: "operational" },
      { name: "Feed Mixer", status: "operational" },
      { name: "ATV", status: "maintenance" },
    ],
    buildings: [
      { name: "Main Barn", type: "Livestock", size: "8000 sq ft" },
      { name: "Feed Storage", type: "Storage", size: "4000 sq ft" },
      { name: "Ranch House", type: "Residential", size: "2500 sq ft" },
    ],
  },
  {
    id: 3,
    name: "Orchard Hills",
    location: "Portland, OR",
    size: "75 acres",
    type: "Orchard",
    employeeCount: 5,
    description: "Apple and pear orchard with a small vineyard section.",
    status: "active",
    established: "2012-09-10",
    contactEmail: "contact@orchardhills.com",
    contactPhone: "(555) 456-7890",
    crops: ["Apples", "Pears", "Grapes"],
    equipment: [
      { name: "Tractor - Compact", status: "operational" },
      { name: "Sprayer", status: "operational" },
      { name: "Pruning Equipment", status: "operational" },
    ],
    buildings: [
      { name: "Processing Facility", type: "Processing", size: "3000 sq ft" },
      { name: "Cold Storage", type: "Storage", size: "2000 sq ft" },
      { name: "Farm Stand", type: "Retail", size: "800 sq ft" },
    ],
  },
  {
    id: 4,
    name: "Meadow Brook Dairy",
    location: "Madison, WI",
    size: "120 acres",
    type: "Dairy",
    employeeCount: 7,
    description: "Dairy farm with organic practices and on-site processing.",
    status: "inactive",
    established: "2008-04-30",
    contactEmail: "info@meadowbrookdairy.com",
    contactPhone: "(555) 234-5678",
    livestock: ["Dairy Cows", "Goats"],
    equipment: [
      { name: "Milking System", status: "maintenance" },
      { name: "Tractor", status: "operational" },
      { name: "Feed Mixer", status: "operational" },
    ],
    buildings: [
      { name: "Milking Parlor", type: "Processing", size: "4000 sq ft" },
      { name: "Dairy Barn", type: "Livestock", size: "6000 sq ft" },
      { name: "Processing Facility", type: "Processing", size: "2500 sq ft" },
    ],
  },
]

// Sample employee data - in a real app, this would come from an API
const employeesData = [
  {
    id: 1,
    farmId: 1,
    name: "John Smith",
    role: "Farm Manager",
    phone: "(555) 111-2222",
    email: "john@greenvalleyfarm.com",
    hireDate: "2018-05-10",
    salary: 65000,
    status: "active",
  },
  {
    id: 2,
    farmId: 1,
    name: "Maria Garcia",
    role: "Field Supervisor",
    phone: "(555) 222-3333",
    email: "maria@greenvalleyfarm.com",
    hireDate: "2019-03-15",
    salary: 52000,
    status: "active",
  },
  {
    id: 3,
    farmId: 1,
    name: "David Wilson",
    role: "Equipment Operator",
    phone: "(555) 333-4444",
    email: "david@greenvalleyfarm.com",
    hireDate: "2020-06-01",
    salary: 45000,
    status: "active",
  },
  {
    id: 4,
    farmId: 1,
    name: "Sarah Johnson",
    role: "Administrative Assistant",
    phone: "(555) 444-5555",
    email: "sarah@greenvalleyfarm.com",
    hireDate: "2021-01-15",
    salary: 42000,
    status: "active",
  },
  {
    id: 5,
    farmId: 2,
    name: "Michael Brown",
    role: "Ranch Manager",
    phone: "(555) 555-6666",
    email: "michael@sunsetranch.com",
    hireDate: "2017-08-22",
    salary: 68000,
    status: "active",
  },
  {
    id: 6,
    farmId: 2,
    name: "Jennifer Lee",
    role: "Livestock Specialist",
    phone: "(555) 666-7777",
    email: "jennifer@sunsetranch.com",
    hireDate: "2019-05-10",
    salary: 54000,
    status: "active",
  },
]

export default function FarmDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const farmId = Number.parseInt(params.id)
  const [farm, setFarm] = useState<any>(null)
  const [employees, setEmployees] = useState<any[]>([])
  const [showAddEmployeeDialog, setShowAddEmployeeDialog] = useState(false)
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
    salary: "",
  })

  useEffect(() => {
    // In a real app, this would be an API call
    const farmData = farmsData.find((f) => f.id === farmId)
    if (farmData) {
      setFarm(farmData)
    } else {
      router.push("/farms")
      showToast.error("Farm not found")
    }

    // Get employees for this farm
    const farmEmployees = employeesData.filter((e) => e.farmId === farmId)
    setEmployees(farmEmployees)
  }, [farmId, router])

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.role || !newEmployee.email) {
      showToast.error("Please fill in all required fields")
      return
    }

    const newEmployeeWithId = {
      id: Math.max(0, ...employees.map((e) => e.id)) + 1,
      farmId: farmId,
      hireDate: new Date().toISOString().split("T")[0],
      status: "active",
      ...newEmployee,
      salary: newEmployee.salary ? Number.parseInt(newEmployee.salary) : 0,
    }

    setEmployees([...employees, newEmployeeWithId])
    setNewEmployee({
      name: "",
      role: "",
      phone: "",
      email: "",
      salary: "",
    })
    setShowAddEmployeeDialog(false)
    showToast.success(`Employee "${newEmployee.name}" has been added successfully`)
  }

  const handleDeleteEmployee = (id: number, name: string) => {
    setEmployees(employees.filter((employee) => employee.id !== id))
    showToast.success(`Employee "${name}" has been removed successfully`)
  }

  if (!farm) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading farm details...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:pl-64">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <Button variant="outline" size="sm" className="mr-4" onClick={() => router.push("/farms")}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Farms
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Leaf className="mr-3 h-6 w-6 text-green-600" />
                    {farm.name}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {farm.type} Farm • {farm.size}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => router.push(`/farms/${farm.id}/edit`)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Farm
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => {
                    router.push("/farms")
                    showToast.success(`Farm "${farm.name}" has been deleted`)
                  }}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Farm Overview</TabsTrigger>
              <TabsTrigger value="employees">Employees</TabsTrigger>
              <TabsTrigger value="assets">Assets & Equipment</TabsTrigger>
              <TabsTrigger value="finances">Finances</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Farm Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Farm Information</CardTitle>
                    <CardDescription>Basic details about the farm</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Location</p>
                        <p className="flex items-center mt-1">
                          <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                          {farm.location}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Status</p>
                        <Badge className="mt-1" variant={farm.status === "active" ? "default" : "secondary"}>
                          {farm.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Established</p>
                        <p className="flex items-center mt-1">
                          <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                          {new Date(farm.established).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Size</p>
                        <p className="mt-1">{farm.size}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-500">Description</p>
                      <p className="mt-1 text-gray-700">{farm.description}</p>
                    </div>

                    {farm.crops && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Crops</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {farm.crops.map((crop: string, index: number) => (
                            <Badge key={index} variant="outline">
                              {crop}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {farm.livestock && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">Livestock</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {farm.livestock.map((animal: string, index: number) => (
                            <Badge key={index} variant="outline">
                              {animal}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>How to reach the farm</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="flex items-center mt-1">
                        <Mail className="h-4 w-4 mr-1 text-gray-500" />
                        {farm.contactEmail}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="flex items-center mt-1">
                        <Phone className="h-4 w-4 mr-1 text-gray-500" />
                        {farm.contactPhone}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Address</p>
                      <p className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                        {farm.location}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Farm Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Farm Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500">Total Employees</p>
                      <div className="flex items-center mt-1">
                        <Users className="h-5 w-5 mr-2 text-blue-600" />
                        <span className="text-2xl font-bold">{employees.length}</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500">Monthly Payroll</p>
                      <div className="flex items-center mt-1">
                        <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                        <span className="text-2xl font-bold">
                          ${Math.round(employees.reduce((sum, emp) => sum + emp.salary / 12, 0)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500">Equipment</p>
                      <div className="flex items-center mt-1">
                        <Tractor className="h-5 w-5 mr-2 text-orange-600" />
                        <span className="text-2xl font-bold">{farm.equipment?.length || 0}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="employees" className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Farm Employees</h2>
                <Dialog open={showAddEmployeeDialog} onOpenChange={setShowAddEmployeeDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Employee
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Employee</DialogTitle>
                      <DialogDescription>Add a new employee to {farm.name}</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="employee-name">Full Name*</Label>
                        <Input
                          id="employee-name"
                          placeholder="e.g., John Smith"
                          value={newEmployee.name}
                          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role*</Label>
                        <Input
                          id="role"
                          placeholder="e.g., Farm Manager"
                          value={newEmployee.role}
                          onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email*</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="e.g., john@example.com"
                          value={newEmployee.email}
                          onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          placeholder="e.g., (555) 123-4567"
                          value={newEmployee.phone}
                          onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="salary">Annual Salary ($)</Label>
                        <Input
                          id="salary"
                          type="number"
                          placeholder="e.g., 50000"
                          value={newEmployee.salary}
                          onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setShowAddEmployeeDialog(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-green-600 hover:bg-green-700" onClick={handleAddEmployee}>
                        Add Employee
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employees.length > 0 ? (
                  employees.map((employee) => (
                    <Card key={employee.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle>{employee.name}</CardTitle>
                            <CardDescription>{employee.role}</CardDescription>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-600"
                            onClick={() => handleDeleteEmployee(employee.id, employee.name)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center text-sm">
                          <Mail className="mr-2 h-4 w-4 text-gray-500" />
                          <span>{employee.email}</span>
                        </div>
                        {employee.phone && (
                          <div className="flex items-center text-sm">
                            <Phone className="mr-2 h-4 w-4 text-gray-500" />
                            <span>{employee.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                          <span>Hired: {new Date(employee.hireDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <DollarSign className="mr-2 h-4 w-4 text-gray-500" />
                          <span>${employee.salary.toLocaleString()} / year</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">No employees found for this farm.</p>
                    <Button
                      className="mt-4 bg-green-600 hover:bg-green-700"
                      onClick={() => setShowAddEmployeeDialog(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add First Employee
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="assets" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Equipment */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Tractor className="h-5 w-5 mr-2" />
                      Equipment
                    </CardTitle>
                    <CardDescription>Farm machinery and equipment</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {farm.equipment?.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{item.name}</p>
                        </div>
                        <Badge
                          variant={item.status === "operational" ? "default" : "secondary"}
                          className={
                            item.status === "maintenance" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" : ""
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Equipment
                    </Button>
                  </CardContent>
                </Card>

                {/* Buildings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Warehouse className="h-5 w-5 mr-2" />
                      Buildings
                    </CardTitle>
                    <CardDescription>Farm structures and facilities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {farm.buildings?.map((building: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{building.name}</p>
                          <p className="text-sm text-gray-500">
                            {building.type} • {building.size}
                          </p>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Building
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="finances" className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Financial Management</h2>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Income
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Income Record</DialogTitle>
                        <DialogDescription>Record a new income transaction for {farm.name}</DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="income-description">Description*</Label>
                          <Input id="income-description" placeholder="e.g., Corn Sales" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="income-amount">Amount ($)*</Label>
                          <Input id="income-amount" type="number" placeholder="5000" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="income-date">Date*</Label>
                          <Input id="income-date" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="income-category">Category</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="crop-sales">Crop Sales</SelectItem>
                              <SelectItem value="livestock-sales">Livestock Sales</SelectItem>
                              <SelectItem value="equipment-rental">Equipment Rental</SelectItem>
                              <SelectItem value="subsidies">Government Subsidies</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-green-600 hover:bg-green-700">Add Income</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Expense
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Expense Record</DialogTitle>
                        <DialogDescription>Record a new expense transaction for {farm.name}</DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="expense-description">Description*</Label>
                          <Input id="expense-description" placeholder="e.g., Fertilizer Purchase" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="expense-amount">Amount ($)*</Label>
                          <Input id="expense-amount" type="number" placeholder="1200" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="expense-date">Date*</Label>
                          <Input id="expense-date" type="date" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="expense-category">Category</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="seeds">Seeds</SelectItem>
                              <SelectItem value="fertilizers">Fertilizers</SelectItem>
                              <SelectItem value="equipment">Equipment</SelectItem>
                              <SelectItem value="labor">Labor</SelectItem>
                              <SelectItem value="fuel">Fuel</SelectItem>
                              <SelectItem value="maintenance">Maintenance</SelectItem>
                              <SelectItem value="utilities">Utilities</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Cancel</Button>
                        <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                          Add Expense
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Financial Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Income</CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">$127,500</div>
                    <p className="text-xs text-muted-foreground">This year</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">$89,200</div>
                    <p className="text-xs text-muted-foreground">This year</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                    <DollarSign className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">$38,300</div>
                    <p className="text-xs text-muted-foreground">30% profit margin</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Transactions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600">Recent Income</CardTitle>
                    <CardDescription>Latest income transactions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { description: "Corn Sales - Q2", amount: 15000, date: "2024-06-15", category: "Crop Sales" },
                      { description: "Wheat Sales", amount: 8500, date: "2024-06-10", category: "Crop Sales" },
                      {
                        description: "Equipment Rental",
                        amount: 1200,
                        date: "2024-06-05",
                        category: "Equipment Rental",
                      },
                      { description: "Government Subsidy", amount: 3000, date: "2024-06-01", category: "Subsidies" },
                    ].map((income, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{income.description}</p>
                          <p className="text-xs text-gray-500">
                            {income.category} • {new Date(income.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">+${income.amount.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Recent Expenses</CardTitle>
                    <CardDescription>Latest expense transactions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { description: "Fertilizer Purchase", amount: 2500, date: "2024-06-14", category: "Fertilizers" },
                      { description: "Fuel Costs", amount: 800, date: "2024-06-12", category: "Fuel" },
                      {
                        description: "Equipment Maintenance",
                        amount: 1500,
                        date: "2024-06-08",
                        category: "Maintenance",
                      },
                      { description: "Labor Wages", amount: 4200, date: "2024-06-01", category: "Labor" },
                    ].map((expense, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{expense.description}</p>
                          <p className="text-xs text-gray-500">
                            {expense.category} • {new Date(expense.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-red-600">-${expense.amount.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
