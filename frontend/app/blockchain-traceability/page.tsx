"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  QrCode,
  Package,
  Truck,
  Store,
  User,
  CheckCircle,
  Clock,
  MapPin,
  Leaf,
  Award,
  Search,
  Download,
  Share,
  Eye,
} from "lucide-react"
import { showToast } from "@/lib/toast-utils"

interface TraceabilityRecord {
  id: string
  blockHash: string
  timestamp: string
  stage: "planting" | "growing" | "harvesting" | "processing" | "packaging" | "shipping" | "retail"
  location: string
  actor: string
  data: Record<string, any>
  verified: boolean
}

interface Product {
  id: string
  name: string
  variety: string
  batchNumber: string
  qrCode: string
  currentStage: string
  origin: string
  harvestDate: string
  certifications: string[]
  records: TraceabilityRecord[]
}

export default function BlockchainTraceabilityPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Initialize sample data
    const sampleProducts: Product[] = [
      {
        id: "prod-001",
        name: "Organic Corn",
        variety: "Sweet Corn",
        batchNumber: "BC2024-001",
        qrCode: "QR-CORN-001",
        currentStage: "retail",
        origin: "Green Valley Farm, Springfield, IL",
        harvestDate: "2024-06-15",
        certifications: ["USDA Organic", "Non-GMO", "Fair Trade"],
        records: [
          {
            id: "rec-001",
            blockHash: "0x1a2b3c4d5e6f7890abcdef1234567890",
            timestamp: "2024-04-15T08:00:00Z",
            stage: "planting",
            location: "Field A, Green Valley Farm",
            actor: "John Smith - Farm Manager",
            data: {
              seedVariety: "Sweet Corn Hybrid",
              plantingDensity: "30,000 plants/acre",
              soilTemp: "18°C",
              weather: "Sunny, 22°C",
            },
            verified: true,
          },
          {
            id: "rec-002",
            blockHash: "0x2b3c4d5e6f7890abcdef1234567890ab",
            timestamp: "2024-05-20T14:30:00Z",
            stage: "growing",
            location: "Field A, Green Valley Farm",
            actor: "Maria Garcia - Field Supervisor",
            data: {
              fertilizer: "Organic Compost",
              irrigation: "Drip irrigation - 2 inches",
              pestControl: "Beneficial insects released",
              growthStage: "V8 - Eight leaf stage",
            },
            verified: true,
          },
          {
            id: "rec-003",
            blockHash: "0x3c4d5e6f7890abcdef1234567890abcd",
            timestamp: "2024-06-15T06:00:00Z",
            stage: "harvesting",
            location: "Field A, Green Valley Farm",
            actor: "David Wilson - Equipment Operator",
            data: {
              harvestMethod: "Mechanical harvester",
              moisture: "18%",
              yield: "185 bushels/acre",
              quality: "Grade A",
            },
            verified: true,
          },
          {
            id: "rec-004",
            blockHash: "0x4d5e6f7890abcdef1234567890abcdef",
            timestamp: "2024-06-16T10:15:00Z",
            stage: "processing",
            location: "Farm Processing Facility",
            actor: "Sarah Johnson - Quality Control",
            data: {
              cleaning: "Mechanical cleaning completed",
              sorting: "Size and quality sorting",
              testing: "Pesticide residue: None detected",
              packaging: "Food-grade containers",
            },
            verified: true,
          },
          {
            id: "rec-005",
            blockHash: "0x5e6f7890abcdef1234567890abcdef12",
            timestamp: "2024-06-17T14:45:00Z",
            stage: "shipping",
            location: "Distribution Center, Chicago, IL",
            actor: "FreshTrans Logistics",
            data: {
              temperature: "2-4°C maintained",
              humidity: "85-90%",
              transitTime: "8 hours",
              vehicle: "Refrigerated truck #RT-456",
            },
            verified: true,
          },
          {
            id: "rec-006",
            blockHash: "0x6f7890abcdef1234567890abcdef1234",
            timestamp: "2024-06-18T09:30:00Z",
            stage: "retail",
            location: "FreshMart Store #123",
            actor: "FreshMart Quality Team",
            data: {
              receivedCondition: "Excellent",
              storageTemp: "2°C",
              shelfLife: "7 days remaining",
              pricePerPound: "$3.99",
            },
            verified: true,
          },
        ],
      },
      {
        id: "prod-002",
        name: "Heritage Tomatoes",
        variety: "Heirloom Beefsteak",
        batchNumber: "BT2024-002",
        qrCode: "QR-TOMATO-002",
        currentStage: "shipping",
        origin: "Sunset Ranch, Austin, TX",
        harvestDate: "2024-06-20",
        certifications: ["USDA Organic", "Heirloom Variety"],
        records: [
          {
            id: "rec-007",
            blockHash: "0x7890abcdef1234567890abcdef123456",
            timestamp: "2024-03-01T09:00:00Z",
            stage: "planting",
            location: "Greenhouse 2, Sunset Ranch",
            actor: "Michael Brown - Ranch Manager",
            data: {
              seedSource: "Heritage Seed Company",
              plantingMethod: "Transplant from seedlings",
              spacing: "18 inches apart",
              soilPrep: "Organic compost amendment",
            },
            verified: true,
          },
        ],
      },
    ]

    setProducts(sampleProducts)
    setSelectedProduct(sampleProducts[0])
  }, [])

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case "planting":
        return <Leaf className="h-4 w-4 text-green-600" />
      case "growing":
        return <Leaf className="h-4 w-4 text-green-500" />
      case "harvesting":
        return <Package className="h-4 w-4 text-yellow-600" />
      case "processing":
        return <Package className="h-4 w-4 text-blue-600" />
      case "packaging":
        return <Package className="h-4 w-4 text-purple-600" />
      case "shipping":
        return <Truck className="h-4 w-4 text-orange-600" />
      case "retail":
        return <Store className="h-4 w-4 text-red-600" />
      default:
        return <CheckCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "planting":
        return "bg-green-100 text-green-800"
      case "growing":
        return "bg-green-100 text-green-800"
      case "harvesting":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "packaging":
        return "bg-purple-100 text-purple-800"
      case "shipping":
        return "bg-orange-100 text-orange-800"
      case "retail":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleProductSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      const found = products.find(
        (p) =>
          p.batchNumber.toLowerCase().includes(query.toLowerCase()) ||
          p.qrCode.toLowerCase().includes(query.toLowerCase()) ||
          p.name.toLowerCase().includes(query.toLowerCase()),
      )
      if (found) {
        setSelectedProduct(found)
        showToast.success("Product found in blockchain!")
      } else {
        showToast.error("Product not found in blockchain records")
      }
    }
  }

  const generateQRCode = (product: Product) => {
    // In a real app, this would generate an actual QR code
    showToast.success(`QR Code generated for ${product.name}`)
  }

  const verifiedRecords = selectedProduct?.records.filter((r) => r.verified).length || 0
  const totalRecords = selectedProduct?.records.length || 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:pl-64">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Shield className="mr-3 h-6 w-6 text-blue-600" />
                  Blockchain Traceability
                </h1>
                <p className="text-gray-600 mt-1">
                  Complete farm-to-table transparency with immutable blockchain records
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  <Shield className="h-4 w-4 mr-1" />
                  Blockchain Verified
                </Badge>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <QrCode className="mr-2 h-4 w-4" />
                  Generate QR Code
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Search Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2" />
                Product Lookup
              </CardTitle>
              <CardDescription>Search by batch number, QR code, or product name</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Label htmlFor="search">Search Products</Label>
                  <Input
                    id="search"
                    placeholder="Enter batch number, QR code, or product name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleProductSearch(searchQuery)}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={() => handleProductSearch(searchQuery)}>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="traceability" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="traceability">Product Journey</TabsTrigger>
              <TabsTrigger value="verification">Blockchain Verification</TabsTrigger>
              <TabsTrigger value="certificates">Certifications</TabsTrigger>
              <TabsTrigger value="consumer">Consumer View</TabsTrigger>
            </TabsList>

            <TabsContent value="traceability" className="space-y-6">
              {selectedProduct && (
                <>
                  {/* Product Overview */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">{selectedProduct.name}</CardTitle>
                          <CardDescription>
                            {selectedProduct.variety} • Batch: {selectedProduct.batchNumber}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge className={getStageColor(selectedProduct.currentStage)}>
                            {getStageIcon(selectedProduct.currentStage)}
                            <span className="ml-1 capitalize">{selectedProduct.currentStage}</span>
                          </Badge>
                          <Button variant="outline" onClick={() => generateQRCode(selectedProduct)}>
                            <QrCode className="h-4 w-4 mr-2" />
                            QR Code
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <p className="text-sm text-gray-500">Origin</p>
                          <p className="font-medium">{selectedProduct.origin}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Harvest Date</p>
                          <p className="font-medium">{new Date(selectedProduct.harvestDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Blockchain Records</p>
                          <p className="font-medium">
                            {verifiedRecords}/{totalRecords} verified
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-500 mb-2">Certifications</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.certifications.map((cert, index) => (
                            <Badge key={index} variant="outline" className="bg-green-50 text-green-700">
                              <Award className="h-3 w-3 mr-1" />
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Journey Timeline */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Journey</CardTitle>
                      <CardDescription>Complete traceability from farm to consumer</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {selectedProduct.records.map((record, index) => (
                          <div key={record.id} className="relative">
                            {index < selectedProduct.records.length - 1 && (
                              <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200" />
                            )}
                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                                {getStageIcon(record.stage)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="font-semibold capitalize">{record.stage}</h3>
                                  <div className="flex items-center space-x-2">
                                    {record.verified && (
                                      <Badge className="bg-green-100 text-green-800">
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Verified
                                      </Badge>
                                    )}
                                    <span className="text-sm text-gray-500">
                                      {new Date(record.timestamp).toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                  <div className="flex items-center text-sm text-gray-600">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {record.location}
                                  </div>
                                  <div className="flex items-center text-sm text-gray-600">
                                    <User className="h-4 w-4 mr-1" />
                                    {record.actor}
                                  </div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                    {Object.entries(record.data).map(([key, value]) => (
                                      <div key={key} className="flex justify-between">
                                        <span className="text-gray-600 capitalize">
                                          {key.replace(/([A-Z])/g, " $1").trim()}:
                                        </span>
                                        <span className="font-medium">{value}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div className="mt-2 text-xs text-gray-500 font-mono">
                                  Block Hash: {record.blockHash}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>

            <TabsContent value="verification" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-blue-600" />
                    Blockchain Verification
                  </CardTitle>
                  <CardDescription>Cryptographic proof of data integrity and authenticity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedProduct?.records.map((record, index) => (
                    <div key={record.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {getStageIcon(record.stage)}
                          <h3 className="font-semibold capitalize">{record.stage} Record</h3>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <span className="text-gray-500">Block Hash:</span>
                            <p className="font-mono text-xs break-all">{record.blockHash}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Timestamp:</span>
                            <p className="font-medium">{new Date(record.timestamp).toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <span className="text-gray-500">Recorded By:</span>
                            <p className="font-medium">{record.actor}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">Location:</span>
                            <p className="font-medium">{record.location}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View on Blockchain
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download Certificate
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Blockchain Network Status</CardTitle>
                  <CardDescription>Real-time blockchain network information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <p className="text-2xl font-bold text-green-600">99.9%</p>
                      <p className="text-sm text-gray-600">Network Uptime</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <p className="text-2xl font-bold text-blue-600">2.3s</p>
                      <p className="text-sm text-gray-600">Avg Block Time</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Package className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                      <p className="text-2xl font-bold text-purple-600">15,847</p>
                      <p className="text-sm text-gray-600">Total Records</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certificates" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-yellow-600" />
                    Digital Certificates
                  </CardTitle>
                  <CardDescription>Blockchain-verified certifications and compliance documents</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedProduct?.certifications.map((cert, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Award className="h-5 w-5 text-yellow-600" />
                          <h3 className="font-semibold">{cert}</h3>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Valid
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Issued:</span>
                          <p className="font-medium">January 15, 2024</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Expires:</span>
                          <p className="font-medium">January 15, 2025</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Issuer:</span>
                          <p className="font-medium">USDA Certification Body</p>
                        </div>
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View Certificate
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download PDF
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compliance Verification</CardTitle>
                  <CardDescription>Regulatory compliance status and audit trail</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        regulation: "FDA Food Safety Modernization Act",
                        status: "Compliant",
                        lastAudit: "2024-03-15",
                        nextAudit: "2024-09-15",
                      },
                      {
                        regulation: "USDA Organic Standards",
                        status: "Compliant",
                        lastAudit: "2024-01-20",
                        nextAudit: "2025-01-20",
                      },
                      {
                        regulation: "Good Agricultural Practices (GAP)",
                        status: "Compliant",
                        lastAudit: "2024-02-10",
                        nextAudit: "2024-08-10",
                      },
                    ].map((compliance, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{compliance.regulation}</p>
                          <p className="text-sm text-gray-600">
                            Last audit: {new Date(compliance.lastAudit).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-800 mb-1">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {compliance.status}
                          </Badge>
                          <p className="text-xs text-gray-500">
                            Next: {new Date(compliance.nextAudit).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="consumer" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Consumer Transparency Portal</CardTitle>
                  <CardDescription>What customers see when they scan your QR code</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="max-w-md mx-auto bg-white border-2 border-gray-200 rounded-lg p-6 shadow-lg">
                    <div className="text-center mb-6">
                      <div className="w-24 h-24 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <QrCode className="h-12 w-12 text-gray-400" />
                      </div>
                      <h2 className="text-xl font-bold">{selectedProduct?.name}</h2>
                      <p className="text-gray-600">{selectedProduct?.variety}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Origin:</span>
                        <span className="font-medium text-sm">{selectedProduct?.origin}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Harvest Date:</span>
                        <span className="font-medium text-sm">
                          {selectedProduct && new Date(selectedProduct.harvestDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Batch Number:</span>
                        <span className="font-medium text-sm">{selectedProduct?.batchNumber}</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-medium mb-3">Certifications</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct?.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-medium mb-3">Journey Highlights</h3>
                      <div className="space-y-2">
                        {selectedProduct?.records.slice(0, 3).map((record, index) => (
                          <div key={record.id} className="flex items-center space-x-2 text-sm">
                            {getStageIcon(record.stage)}
                            <span className="capitalize">{record.stage}</span>
                            <span className="text-gray-500">{new Date(record.timestamp).toLocaleDateString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full mt-6" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Full Journey
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Consumer Engagement Metrics</CardTitle>
                  <CardDescription>How customers interact with your transparency data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <QrCode className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <p className="text-2xl font-bold text-blue-600">1,247</p>
                      <p className="text-sm text-gray-600">QR Code Scans</p>
                      <p className="text-xs text-green-600 mt-1">+23% this month</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Eye className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <p className="text-2xl font-bold text-green-600">892</p>
                      <p className="text-sm text-gray-600">Full Journey Views</p>
                      <p className="text-xs text-green-600 mt-1">71% engagement rate</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Share className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                      <p className="text-2xl font-bold text-purple-600">156</p>
                      <p className="text-sm text-gray-600">Social Shares</p>
                      <p className="text-xs text-green-600 mt-1">+45% this month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
