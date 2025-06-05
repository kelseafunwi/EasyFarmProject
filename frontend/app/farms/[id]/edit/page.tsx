"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Leaf, ArrowLeft, Save } from "lucide-react"
import { showToast } from "@/lib/toast-utils"

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
  },
]

export default function EditFarmPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const farmId = Number.parseInt(params.id)
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    size: "",
    type: "",
    description: "",
    status: "",
    established: "",
    contactEmail: "",
    contactPhone: "",
  })

  useEffect(() => {
    // In a real app, this would be an API call
    const farmData = farmsData.find((f) => f.id === farmId)
    if (farmData) {
      setFormData({
        name: farmData.name,
        location: farmData.location,
        size: farmData.size,
        type: farmData.type,
        description: farmData.description,
        status: farmData.status,
        established: farmData.established,
        contactEmail: farmData.contactEmail,
        contactPhone: farmData.contactPhone,
      })
    } else {
      router.push("/farms")
      showToast.error("Farm not found")
    }
  }, [farmId, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.location || !formData.size || !formData.type) {
      showToast.error("Please fill in all required fields")
      return
    }

    // In a real app, this would be an API call to update the farm
    showToast.success(`Farm "${formData.name}" has been updated successfully`)
    router.push(`/farms/${farmId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:pl-64">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <Button variant="outline" size="sm" className="mr-4" onClick={() => router.push(`/farms/${farmId}`)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Farm
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Leaf className="mr-3 h-6 w-6 text-green-600" />
                    Edit Farm
                  </h1>
                  <p className="text-gray-600 mt-1">Update farm information</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Update the basic details of your farm</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Farm Name*</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g., Green Valley Farm"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Farm Type*</Label>
                      <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select farm type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Crop">Crop</SelectItem>
                          <SelectItem value="Livestock">Livestock</SelectItem>
                          <SelectItem value="Dairy">Dairy</SelectItem>
                          <SelectItem value="Orchard">Orchard</SelectItem>
                          <SelectItem value="Mixed">Mixed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location*</Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g., Springfield, IL"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="size">Size*</Label>
                      <Input
                        id="size"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        placeholder="e.g., 250 acres"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="established">Established Date</Label>
                      <Input
                        id="established"
                        name="established"
                        type="date"
                        value={formData.established}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe the farm..."
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Update contact details for the farm</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Email</Label>
                      <Input
                        id="contactEmail"
                        name="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        placeholder="e.g., info@farm.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Phone</Label>
                      <Input
                        id="contactPhone"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        placeholder="e.g., (555) 123-4567"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => router.push(`/farms/${farmId}`)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
