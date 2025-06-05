"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { useToast } from "@/hooks/use-toast"
import {
  Package,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  TrendingUp,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Barcode,
  Calendar,
  MapPin,
} from "lucide-react"

interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  minThreshold: number
  maxThreshold: number
  cost: number
  supplier: string
  location: string
  expiryDate?: string
  batchNumber?: string
  status: "in-stock" | "low-stock" | "out-of-stock" | "expired"
  lastUpdated: string
}

const mockInventory: InventoryItem[] = [
  {
    id: "1",
    name: "Nitrogen Fertilizer",
    category: "Fertilizers",
    quantity: 150,
    unit: "kg",
    minThreshold: 50,
    maxThreshold: 500,
    cost: 2.5,
    supplier: "AgriSupply Co.",
    location: "Warehouse A - Section 1",
    expiryDate: "2025-06-15",
    batchNumber: "NF-2024-001",
    status: "in-stock",
    lastUpdated: "2024-01-15",
  },
  {
    id: "2",
    name: "Corn Seeds",
    category: "Seeds",
    quantity: 25,
    unit: "bags",
    minThreshold: 30,
    maxThreshold: 100,
    cost: 45.0,
    supplier: "Premium Seeds Ltd.",
    location: "Cold Storage - Bay 2",
    expiryDate: "2024-12-31",
    batchNumber: "CS-2024-045",
    status: "low-stock",
    lastUpdated: "2024-01-14",
  },
  {
    id: "3",
    name: "Pesticide Spray",
    category: "Pesticides",
    quantity: 0,
    unit: "liters",
    minThreshold: 20,
    maxThreshold: 200,
    cost: 15.75,
    supplier: "CropProtect Inc.",
    location: "Chemical Storage",
    expiryDate: "2024-08-30",
    batchNumber: "PS-2024-012",
    status: "out-of-stock",
    lastUpdated: "2024-01-10",
  },
  {
    id: "4",
    name: "Irrigation Pipes",
    category: "Equipment",
    quantity: 75,
    unit: "meters",
    minThreshold: 100,
    maxThreshold: 500,
    cost: 8.25,
    supplier: "IrriTech Solutions",
    location: "Equipment Yard",
    batchNumber: "IP-2024-089",
    status: "low-stock",
    lastUpdated: "2024-01-12",
  },
  {
    id: "5",
    name: "Organic Compost",
    category: "Fertilizers",
    quantity: 300,
    unit: "kg",
    minThreshold: 100,
    maxThreshold: 1000,
    cost: 1.2,
    supplier: "Green Earth Organics",
    location: "Warehouse B - Section 3",
    status: "in-stock",
    lastUpdated: "2024-01-16",
  },
]

const categories = ["All", "Fertilizers", "Seeds", "Pesticides", "Equipment", "Tools", "Fuel"]

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const { toast } = useToast()

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.batchNumber?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-stock":
        return "bg-green-100 text-green-800"
      case "low-stock":
        return "bg-yellow-100 text-yellow-800"
      case "out-of-stock":
        return "bg-red-100 text-red-800"
      case "expired":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "low-stock":
      case "out-of-stock":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return null
    }
  }

  const handleAddItem = () => {
    toast({
      title: "Item Added",
      description: "New inventory item has been added successfully.",
    })
    setIsAddDialogOpen(false)
  }

  const handleUpdateStock = (id: string, newQuantity: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQuantity,
              status: newQuantity === 0 ? "out-of-stock" : newQuantity <= item.minThreshold ? "low-stock" : "in-stock",
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : item,
      ),
    )
    toast({
      title: "Stock Updated",
      description: "Inventory quantity has been updated successfully.",
    })
  }

  const lowStockItems = inventory.filter((item) => item.status === "low-stock" || item.status === "out-of-stock")
  const totalValue = inventory.reduce((sum, item) => sum + item.quantity * item.cost, 0)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 lg:ml-64">
        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Inventory Management</h1>
                <p className="text-gray-600 mt-1">Track and manage your farm supplies and equipment</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Import
                </Button>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add New Inventory Item</DialogTitle>
                      <DialogDescription>Add a new item to your inventory system.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Item Name</Label>
                        <Input id="name" placeholder="Enter item name" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fertilizers">Fertilizers</SelectItem>
                            <SelectItem value="seeds">Seeds</SelectItem>
                            <SelectItem value="pesticides">Pesticides</SelectItem>
                            <SelectItem value="equipment">Equipment</SelectItem>
                            <SelectItem value="tools">Tools</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="grid gap-2">
                          <Label htmlFor="quantity">Quantity</Label>
                          <Input id="quantity" type="number" placeholder="0" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="unit">Unit</Label>
                          <Input id="unit" placeholder="kg, liters, etc." />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="supplier">Supplier</Label>
                        <Input id="supplier" placeholder="Supplier name" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="location">Storage Location</Label>
                        <Input id="location" placeholder="Warehouse, section, etc." />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddItem}>Add Item</Button>
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
                <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inventory.length}</div>
                <p className="text-xs text-muted-foreground">Across {categories.length - 1} categories</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Current inventory value</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{lowStockItems.length}</div>
                <p className="text-xs text-muted-foreground">Items need restocking</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
                <Filter className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{categories.length - 1}</div>
                <p className="text-xs text-muted-foreground">Active categories</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search items, suppliers, or batch numbers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Inventory Table */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory Items</CardTitle>
              <CardDescription>Manage your farm supplies and equipment inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Item</th>
                      <th className="text-left p-2 font-medium hidden md:table-cell">Category</th>
                      <th className="text-left p-2 font-medium">Quantity</th>
                      <th className="text-left p-2 font-medium hidden lg:table-cell">Status</th>
                      <th className="text-left p-2 font-medium hidden lg:table-cell">Location</th>
                      <th className="text-left p-2 font-medium hidden xl:table-cell">Supplier</th>
                      <th className="text-left p-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-gray-500 md:hidden">
                              {item.category} • {item.location}
                            </div>
                            {item.batchNumber && (
                              <div className="text-xs text-gray-400 flex items-center gap-1">
                                <Barcode className="h-3 w-3" />
                                {item.batchNumber}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-2 hidden md:table-cell">
                          <Badge variant="outline">{item.category}</Badge>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleUpdateStock(item.id, Number.parseInt(e.target.value) || 0)}
                              className="w-20 h-8"
                            />
                            <span className="text-sm text-gray-500">{item.unit}</span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Min: {item.minThreshold} {item.unit}
                          </div>
                        </td>
                        <td className="p-2 hidden lg:table-cell">
                          <Badge className={`${getStatusColor(item.status)} flex items-center gap-1 w-fit`}>
                            {getStatusIcon(item.status)}
                            {item.status.replace("-", " ")}
                          </Badge>
                        </td>
                        <td className="p-2 hidden lg:table-cell">
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            {item.location}
                          </div>
                        </td>
                        <td className="p-2 hidden xl:table-cell">
                          <div className="text-sm">{item.supplier}</div>
                          {item.expiryDate && (
                            <div className="text-xs text-gray-400 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Exp: {item.expiryDate}
                            </div>
                          )}
                        </td>
                        <td className="p-2">
                          <div className="flex items-center gap-1">
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
