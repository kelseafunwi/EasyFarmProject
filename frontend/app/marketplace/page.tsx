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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  Plus,
  Search,
  Star,
  MapPin,
  Calendar,
  DollarSign,
  Package,
  Eye,
  Heart,
  MessageCircle,
  Users,
  Store,
  Leaf,
  Award,
} from "lucide-react"

interface MarketplaceItem {
  id: string
  title: string
  description: string
  price: number
  unit: string
  category: string
  seller: string
  sellerRating: number
  sellerAvatar?: string
  location: string
  distance: number
  quantity: number
  quality: string
  harvestDate: string
  organic: boolean
  images: string[]
  tags: string[]
  status: "available" | "sold" | "reserved"
}

interface Equipment {
  id: string
  name: string
  description: string
  price: number
  category: string
  condition: string
  seller: string
  sellerRating: number
  location: string
  distance: number
  yearMade: number
  hoursUsed?: number
  images: string[]
  status: "available" | "sold" | "reserved"
}

const mockProduce: MarketplaceItem[] = [
  {
    id: "1",
    title: "Fresh Organic Tomatoes",
    description:
      "Premium vine-ripened organic tomatoes. Perfect for restaurants and farmers markets. Grown without pesticides.",
    price: 4.5,
    unit: "per lb",
    category: "Vegetables",
    seller: "Green Valley Farm",
    sellerRating: 4.8,
    location: "Valley County",
    distance: 12,
    quantity: 500,
    quality: "Grade A",
    harvestDate: "2024-01-15",
    organic: true,
    images: ["/placeholder.svg?height=200&width=300"],
    tags: ["Organic", "Fresh", "Local"],
    status: "available",
  },
  {
    id: "2",
    title: "Sweet Corn - Bulk Sale",
    description: "Fresh sweet corn harvested this morning. Ideal for processing or direct sales. Non-GMO variety.",
    price: 0.75,
    unit: "per ear",
    category: "Vegetables",
    seller: "Sunshine Acres",
    sellerRating: 4.6,
    location: "Rural County",
    distance: 8,
    quantity: 2000,
    quality: "Grade A",
    harvestDate: "2024-01-16",
    organic: false,
    images: ["/placeholder.svg?height=200&width=300"],
    tags: ["Fresh", "Bulk", "Non-GMO"],
    status: "available",
  },
  {
    id: "3",
    title: "Premium Wheat - Feed Grade",
    description: "High-quality wheat suitable for livestock feed. Tested for moisture and protein content.",
    price: 8.25,
    unit: "per bushel",
    category: "Grains",
    seller: "Prairie Farms Co-op",
    sellerRating: 4.9,
    location: "Prairie County",
    distance: 25,
    quantity: 1000,
    quality: "Feed Grade",
    harvestDate: "2023-09-20",
    organic: false,
    images: ["/placeholder.svg?height=200&width=300"],
    tags: ["Feed", "Bulk", "Tested"],
    status: "available",
  },
]

const mockEquipment: Equipment[] = [
  {
    id: "1",
    name: "John Deere 6120M Tractor",
    description:
      "Well-maintained utility tractor with 4WD. Perfect for medium-sized operations. Recent service completed.",
    price: 85000,
    category: "Tractors",
    condition: "Good",
    seller: "Farm Equipment Direct",
    sellerRating: 4.7,
    location: "Equipment County",
    distance: 15,
    yearMade: 2018,
    hoursUsed: 2400,
    images: ["/placeholder.svg?height=200&width=300"],
    status: "available",
  },
  {
    id: "2",
    name: "Irrigation Sprinkler System",
    description: "Complete center pivot irrigation system. Covers 160 acres. Recently upgraded control panel.",
    price: 45000,
    category: "Irrigation",
    condition: "Excellent",
    seller: "IrriTech Solutions",
    sellerRating: 4.9,
    location: "Tech County",
    distance: 30,
    yearMade: 2020,
    images: ["/placeholder.svg?height=200&width=300"],
    status: "available",
  },
]

const categories = ["All", "Vegetables", "Fruits", "Grains", "Livestock", "Seeds", "Equipment"]
const conditions = ["All", "New", "Excellent", "Good", "Fair"]

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("produce")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedCondition, setSelectedCondition] = useState("All")
  const [isListingDialogOpen, setIsListingDialogOpen] = useState(false)
  const { toast } = useToast()

  const filteredProduce = mockProduce.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.seller.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const filteredEquipment = mockEquipment.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.seller.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesCondition = selectedCondition === "All" || item.condition === selectedCondition
    return matchesSearch && matchesCategory && matchesCondition
  })

  const handleCreateListing = () => {
    toast({
      title: "Listing Created",
      description: "Your marketplace listing has been created successfully.",
    })
    setIsListingDialogOpen(false)
  }

  const handleContactSeller = (sellerName: string) => {
    toast({
      title: "Message Sent",
      description: `Your inquiry has been sent to ${sellerName}.`,
    })
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 lg:ml-64">
        <div className="p-4 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Farm Marketplace</h1>
                <p className="text-gray-600 mt-1">Buy and sell agricultural products and equipment</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Watchlist
                </Button>
                <Dialog open={isListingDialogOpen} onOpenChange={setIsListingDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Create Listing
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Listing</DialogTitle>
                      <DialogDescription>
                        List your products or equipment for sale in the marketplace.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="listing-title">Title</Label>
                        <Input id="listing-title" placeholder="Enter listing title" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="listing-description">Description</Label>
                        <Textarea id="listing-description" placeholder="Describe your item" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="grid gap-2">
                          <Label htmlFor="price">Price</Label>
                          <Input id="price" type="number" placeholder="0.00" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="unit">Unit</Label>
                          <Input id="unit" placeholder="per lb, each, etc." />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="vegetables">Vegetables</SelectItem>
                            <SelectItem value="fruits">Fruits</SelectItem>
                            <SelectItem value="grains">Grains</SelectItem>
                            <SelectItem value="livestock">Livestock</SelectItem>
                            <SelectItem value="equipment">Equipment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="quantity">Quantity Available</Label>
                        <Input id="quantity" type="number" placeholder="100" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="City, County" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsListingDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateListing}>Create Listing</Button>
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
                <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                <Store className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231</div>
                <p className="text-xs text-muted-foreground">This month's revenue</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Buyers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">573</div>
                <p className="text-xs text-muted-foreground">Registered this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8</div>
                <p className="text-xs text-muted-foreground">Seller satisfaction</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products, equipment, or sellers..."
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
              {activeTab === "equipment" && (
                <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="produce">Fresh Produce</TabsTrigger>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
            </TabsList>

            <TabsContent value="produce" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProduce.map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={item.images[0] || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      {item.organic && (
                        <Badge className="absolute top-2 left-2 bg-green-600">
                          <Leaf className="h-3 w-3 mr-1" />
                          Organic
                        </Badge>
                      )}
                      <Button variant="ghost" size="sm" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">${item.price}</div>
                          <div className="text-sm text-gray-500">{item.unit}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={item.sellerAvatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">
                              {item.seller
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{item.seller}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{item.sellerRating}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{item.distance} miles</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Package className="h-4 w-4" />
                          <span>
                            {item.quantity} {item.unit.split(" ")[1] || "units"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Harvested {new Date(item.harvestDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4" />
                          <span>{item.quality}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1" onClick={() => handleContactSeller(item.seller)}>
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Contact Seller
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="equipment" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredEquipment.map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow">
                    <div className="flex flex-col lg:flex-row">
                      <div className="relative lg:w-1/3">
                        <img
                          src={item.images[0] || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-48 lg:h-full object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-t-none"
                        />
                        <Badge
                          className={`absolute top-2 left-2 ${
                            item.condition === "Excellent"
                              ? "bg-green-600"
                              : item.condition === "Good"
                                ? "bg-blue-600"
                                : item.condition === "Fair"
                                  ? "bg-yellow-600"
                                  : "bg-gray-600"
                          }`}
                        >
                          {item.condition}
                        </Badge>
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold">{item.name}</h3>
                            <p className="text-gray-600">{item.category}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">${item.price.toLocaleString()}</div>
                            <Button variant="ghost" size="sm">
                              <Heart className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4">{item.description}</p>

                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div>
                            <span className="font-medium">Year:</span> {item.yearMade}
                          </div>
                          {item.hoursUsed && (
                            <div>
                              <span className="font-medium">Hours:</span> {item.hoursUsed.toLocaleString()}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{item.distance} miles away</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{item.sellerRating} rating</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-sm">
                                {item.seller
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{item.seller}</div>
                              <div className="text-sm text-gray-500">{item.location}</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1" onClick={() => handleContactSeller(item.seller)}>
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Contact Seller
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
