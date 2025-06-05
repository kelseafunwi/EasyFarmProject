"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Leaf, Plus, Search, MoreVertical, MapPin, Users, Trash, Edit, Eye } from "lucide-react"
import { showToast } from "@/lib/toast-utils"

// Sample farm data - in a real app, this would come from an API
const initialFarms = [
  {
    id: 1,
    name: "Green Valley Farm",
    location: "Springfield, IL",
    size: "250 acres",
    type: "Crop",
    employeeCount: 8,
    description: "A large crop farm specializing in corn and soybeans.",
    status: "active",
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
  },
]

export default function FarmsPage() {
  const router = useRouter()
  const [farms, setFarms] = useState(initialFarms)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newFarm, setNewFarm] = useState({
    name: "",
    location: "",
    size: "",
    type: "",
    description: "",
  })

  // Filter farms based on search term
  const filteredFarms = farms.filter(
    (farm) =>
      farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farm.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farm.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddFarm = () => {
    if (!newFarm.name || !newFarm.location || !newFarm.size || !newFarm.type) {
      showToast.error("Please fill in all required fields")
      return
    }

    const newFarmWithId = {
      ...newFarm,
      id: farms.length + 1,
      employeeCount: 0,
      status: "active",
    }

    setFarms([...farms, newFarmWithId])
    setNewFarm({
      name: "",
      location: "",
      size: "",
      type: "",
      description: "",
    })
    setShowAddDialog(false)
    showToast.success(`Farm "${newFarm.name}" has been added successfully`)
  }

  const handleDeleteFarm = (id: number, name: string) => {
    setFarms(farms.filter((farm) => farm.id !== id))
    showToast.success(`Farm "${name}" has been deleted successfully`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:pl-64">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Leaf className="mr-3 h-6 w-6 text-green-600" />
                  Farm Management
                </h1>
                <p className="text-gray-600 mt-1">Manage all your farms in one place</p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search farms..."
                    className="pl-8 w-full sm:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Farm
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Farm</DialogTitle>
                      <DialogDescription>Create a new farm in your management system</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="farm-name">Farm Name*</Label>
                        <Input
                          id="farm-name"
                          placeholder="e.g., Green Valley Farm"
                          value={newFarm.name}
                          onChange={(e) => setNewFarm({ ...newFarm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location*</Label>
                        <Input
                          id="location"
                          placeholder="e.g., Springfield, IL"
                          value={newFarm.location}
                          onChange={(e) => setNewFarm({ ...newFarm, location: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="size">Size*</Label>
                        <Input
                          id="size"
                          placeholder="e.g., 250 acres"
                          value={newFarm.size}
                          onChange={(e) => setNewFarm({ ...newFarm, size: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Farm Type*</Label>
                        <Input
                          id="type"
                          placeholder="e.g., Crop, Livestock, Dairy"
                          value={newFarm.type}
                          onChange={(e) => setNewFarm({ ...newFarm, type: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe the farm..."
                          value={newFarm.description}
                          onChange={(e) => setNewFarm({ ...newFarm, description: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-green-600 hover:bg-green-700" onClick={handleAddFarm}>
                        Create Farm
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFarms.length > 0 ? (
              filteredFarms.map((farm) => (
                <Card key={farm.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{farm.name}</CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/farms/${farm.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/farms/${farm.id}/edit`)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Farm
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteFarm(farm.id, farm.name)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete Farm
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription>{farm.type} Farm</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                        <span>{farm.location}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="mr-2 h-4 w-4 text-gray-500" />
                        <span>{farm.employeeCount} Employees</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{farm.size}</span>
                      <Badge variant={farm.status === "active" ? "default" : "secondary"}>
                        {farm.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </div>

                    <div className="pt-2">
                      <Button variant="outline" className="w-full" onClick={() => router.push(`/farms/${farm.id}`)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Farm Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No farms found matching your search criteria.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
