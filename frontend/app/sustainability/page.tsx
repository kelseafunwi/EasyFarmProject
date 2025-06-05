"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Leaf,
  Droplets,
  Zap,
  Recycle,
  TreePine,
  Award,
  TrendingUp,
  TrendingDown,
  Target,
  CheckCircle,
  BarChart3,
  Calendar,
  Globe,
  Coins,
} from "lucide-react"

interface SustainabilityMetric {
  category: string
  current: number
  target: number
  unit: string
  trend: "up" | "down" | "stable"
  status: "excellent" | "good" | "needs_improvement"
  description: string
}

interface CarbonCredit {
  id: string
  type: string
  amount: number
  price: number
  status: "verified" | "pending" | "sold"
  date: string
  buyer?: string
}

export default function SustainabilityPage() {
  const [sustainabilityScore, setSustainabilityScore] = useState(78)
  const [metrics, setMetrics] = useState<SustainabilityMetric[]>([])
  const [carbonCredits, setCarbonCredits] = useState<CarbonCredit[]>([])

  useEffect(() => {
    const sampleMetrics: SustainabilityMetric[] = [
      {
        category: "Carbon Footprint",
        current: 2.3,
        target: 2.0,
        unit: "tons CO2/acre",
        trend: "down",
        status: "good",
        description: "15% reduction from last year through improved practices",
      },
      {
        category: "Water Usage",
        current: 18.5,
        target: 16.0,
        unit: "inches/season",
        trend: "down",
        status: "good",
        description: "Smart irrigation reducing water consumption",
      },
      {
        category: "Soil Health",
        current: 85,
        target: 90,
        unit: "health score",
        trend: "up",
        status: "good",
        description: "Cover crops and reduced tillage improving soil",
      },
      {
        category: "Biodiversity",
        current: 72,
        target: 80,
        unit: "diversity index",
        trend: "up",
        status: "needs_improvement",
        description: "Pollinator habitats and crop rotation helping",
      },
      {
        category: "Energy Efficiency",
        current: 92,
        target: 95,
        unit: "efficiency %",
        trend: "up",
        status: "excellent",
        description: "Solar panels and efficient equipment",
      },
      {
        category: "Waste Reduction",
        current: 88,
        target: 90,
        unit: "reduction %",
        trend: "stable",
        status: "good",
        description: "Composting and recycling programs active",
      },
    ]

    const sampleCredits: CarbonCredit[] = [
      {
        id: "cc-001",
        type: "Soil Carbon Sequestration",
        amount: 150,
        price: 45,
        status: "verified",
        date: "2024-06-01",
        buyer: "EcoTech Corp",
      },
      {
        id: "cc-002",
        type: "Renewable Energy",
        amount: 85,
        price: 38,
        status: "sold",
        date: "2024-05-15",
        buyer: "Green Energy Ltd",
      },
      {
        id: "cc-003",
        type: "Methane Reduction",
        amount: 120,
        price: 42,
        status: "pending",
        date: "2024-06-10",
      },
    ]

    setMetrics(sampleMetrics)
    setCarbonCredits(sampleCredits)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "needs_improvement":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <BarChart3 className="h-4 w-4 text-gray-600" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Carbon Footprint":
        return <Leaf className="h-5 w-5 text-green-600" />
      case "Water Usage":
        return <Droplets className="h-5 w-5 text-blue-600" />
      case "Soil Health":
        return <TreePine className="h-5 w-5 text-brown-600" />
      case "Biodiversity":
        return <Globe className="h-5 w-5 text-purple-600" />
      case "Energy Efficiency":
        return <Zap className="h-5 w-5 text-yellow-600" />
      case "Waste Reduction":
        return <Recycle className="h-5 w-5 text-gray-600" />
      default:
        return <Target className="h-5 w-5 text-gray-600" />
    }
  }

  const totalCarbonCredits = carbonCredits.reduce((sum, credit) => sum + credit.amount, 0)
  const totalRevenue = carbonCredits
    .filter((c) => c.status === "sold")
    .reduce((sum, credit) => sum + credit.amount * credit.price, 0)

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
                  Sustainability Tracker
                </h1>
                <p className="text-gray-600 mt-1">
                  Monitor environmental impact, carbon credits, and regenerative practices
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  <Award className="h-4 w-4 mr-1" />
                  Certified Sustainable
                </Badge>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">{sustainabilityScore}</p>
                  <p className="text-sm text-gray-500">Sustainability Score</p>
                </div>
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
                <CardTitle className="text-sm font-medium">Carbon Sequestered</CardTitle>
                <Leaf className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245 tons</div>
                <p className="text-xs text-green-600">+18% from last year</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Water Saved</CardTitle>
                <Droplets className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2M gal</div>
                <p className="text-xs text-blue-600">25% reduction</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Carbon Credits</CardTitle>
                <Coins className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCarbonCredits}</div>
                <p className="text-xs text-muted-foreground">tons CO2 equivalent</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Credit Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-green-600">This year</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="metrics" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="metrics">Sustainability Metrics</TabsTrigger>
              <TabsTrigger value="carbon">Carbon Credits</TabsTrigger>
              <TabsTrigger value="practices">Best Practices</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="metrics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {metrics.map((metric, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(metric.category)}
                          <CardTitle className="text-lg">{metric.category}</CardTitle>
                        </div>
                        <Badge className={getStatusColor(metric.status)}>{metric.status.replace("_", " ")}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Current vs Target */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>
                            Current: {metric.current} {metric.unit}
                          </span>
                          <span>
                            Target: {metric.target} {metric.unit}
                          </span>
                        </div>
                        <Progress value={Math.min(100, (metric.current / metric.target) * 100)} className="h-3" />
                      </div>

                      {/* Trend and Description */}
                      <div className="flex items-start space-x-2">
                        {getTrendIcon(metric.trend)}
                        <p className="text-sm text-gray-600">{metric.description}</p>
                      </div>

                      {/* Action Button */}
                      <Button variant="outline" size="sm" className="w-full">
                        <Target className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Sustainability Score Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Sustainability Score Breakdown</CardTitle>
                  <CardDescription>How your overall score is calculated</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {metrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getCategoryIcon(metric.category)}
                          <span className="font-medium">{metric.category}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress
                            value={Math.min(100, (metric.current / metric.target) * 100)}
                            className="w-24 h-2"
                          />
                          <span className="text-sm font-medium w-12">
                            {Math.round((metric.current / metric.target) * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="carbon" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Coins className="h-5 w-5 mr-2 text-yellow-600" />
                      Carbon Credit Portfolio
                    </CardTitle>
                    <CardDescription>Your verified carbon credits and trading history</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {carbonCredits.map((credit) => (
                      <div key={credit.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{credit.type}</h3>
                          <Badge
                            variant={
                              credit.status === "verified"
                                ? "default"
                                : credit.status === "sold"
                                  ? "secondary"
                                  : "outline"
                            }
                            className={
                              credit.status === "verified"
                                ? "bg-green-100 text-green-800"
                                : credit.status === "sold"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {credit.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Amount</p>
                            <p className="font-medium">{credit.amount} tons CO2</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Price</p>
                            <p className="font-medium">${credit.price}/ton</p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs text-gray-500">{new Date(credit.date).toLocaleDateString()}</span>
                          {credit.buyer && <span className="text-xs text-gray-600">Sold to: {credit.buyer}</span>}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Carbon Credit Marketplace</CardTitle>
                    <CardDescription>Current market prices and opportunities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <p className="text-sm text-gray-600">Current Market Price</p>
                        <p className="text-2xl font-bold text-green-600">$42/ton</p>
                        <div className="flex items-center justify-center mt-1">
                          <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                          <span className="text-sm text-green-600">+8% this month</span>
                        </div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-600">Your Average Price</p>
                        <p className="text-2xl font-bold text-blue-600">$41.67/ton</p>
                        <p className="text-sm text-blue-600">Above market average</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">Available Buyers</h4>
                      {[
                        { company: "EcoTech Corp", price: 45, demand: "High", rating: 4.8 },
                        { company: "Green Energy Ltd", price: 43, demand: "Medium", rating: 4.6 },
                        { company: "Carbon Solutions", price: 41, demand: "Low", rating: 4.9 },
                      ].map((buyer, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{buyer.company}</p>
                            <p className="text-sm text-gray-600">Rating: {buyer.rating}/5</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">${buyer.price}/ton</p>
                            <Badge
                              variant="outline"
                              className={
                                buyer.demand === "High"
                                  ? "bg-green-100 text-green-800"
                                  : buyer.demand === "Medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                              }
                            >
                              {buyer.demand} demand
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Coins className="mr-2 h-4 w-4" />
                      List Credits for Sale
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Carbon Sequestration Projects</CardTitle>
                  <CardDescription>Active projects generating carbon credits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        name: "Cover Crop Initiative",
                        type: "Soil Carbon",
                        area: "120 acres",
                        annual: "85 tons CO2",
                        status: "Active",
                      },
                      {
                        name: "Solar Panel Installation",
                        type: "Renewable Energy",
                        area: "5 MW capacity",
                        annual: "120 tons CO2",
                        status: "Active",
                      },
                      {
                        name: "Methane Capture System",
                        type: "Emission Reduction",
                        area: "Livestock facility",
                        annual: "95 tons CO2",
                        status: "Pending Verification",
                      },
                    ].map((project, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">{project.name}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Type:</span>
                            <span className="font-medium">{project.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Scale:</span>
                            <span className="font-medium">{project.area}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Annual Credits:</span>
                            <span className="font-medium">{project.annual}</span>
                          </div>
                        </div>
                        <Badge className="mt-3" variant={project.status === "Active" ? "default" : "secondary"}>
                          {project.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="practices" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Regenerative Agriculture Practices</CardTitle>
                  <CardDescription>Sustainable farming methods improving soil and environment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      practice: "Cover Cropping",
                      implementation: "95%",
                      impact: "High",
                      benefits: ["Soil health improvement", "Carbon sequestration", "Erosion prevention"],
                      status: "Implemented",
                    },
                    {
                      practice: "Reduced Tillage",
                      implementation: "80%",
                      impact: "High",
                      benefits: ["Soil structure preservation", "Fuel savings", "Carbon retention"],
                      status: "Expanding",
                    },
                    {
                      practice: "Crop Rotation",
                      implementation: "100%",
                      impact: "Medium",
                      benefits: ["Pest management", "Soil fertility", "Biodiversity"],
                      status: "Implemented",
                    },
                    {
                      practice: "Precision Agriculture",
                      implementation: "70%",
                      impact: "High",
                      benefits: ["Resource efficiency", "Reduced inputs", "Yield optimization"],
                      status: "In Progress",
                    },
                  ].map((practice, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-lg">{practice.practice}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant={practice.status === "Implemented" ? "default" : "secondary"}>
                            {practice.status}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={
                              practice.impact === "High"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {practice.impact} Impact
                          </Badge>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Implementation Progress</span>
                          <span>{practice.implementation}</span>
                        </div>
                        <Progress value={Number.parseInt(practice.implementation)} className="h-2" />
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Benefits:</p>
                        <div className="flex flex-wrap gap-2">
                          {practice.benefits.map((benefit, benefitIndex) => (
                            <Badge key={benefitIndex} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Biodiversity Conservation</CardTitle>
                  <CardDescription>Efforts to protect and enhance farm ecosystem diversity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Pollinator Habitats</h4>
                      <div className="space-y-3">
                        {[
                          { habitat: "Native Wildflower Strips", area: "15 acres", species: "25+" },
                          { habitat: "Bee Houses", area: "12 locations", species: "8+" },
                          { habitat: "Butterfly Gardens", area: "3 acres", species: "15+" },
                        ].map((habitat, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">{habitat.habitat}</p>
                              <p className="text-sm text-gray-600">{habitat.area}</p>
                            </div>
                            <Badge variant="outline">{habitat.species} species</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Wildlife Conservation</h4>
                      <div className="space-y-3">
                        {[
                          { initiative: "Bird Nesting Boxes", count: "45 boxes", impact: "High" },
                          { initiative: "Wetland Restoration", count: "8 acres", impact: "High" },
                          { initiative: "Hedgerow Planting", count: "2.5 miles", impact: "Medium" },
                        ].map((initiative, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">{initiative.initiative}</p>
                              <p className="text-sm text-gray-600">{initiative.count}</p>
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                initiative.impact === "High"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {initiative.impact}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-yellow-600" />
                    Sustainability Certifications
                  </CardTitle>
                  <CardDescription>Current certifications and compliance status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      name: "USDA Organic",
                      status: "Certified",
                      expires: "2025-08-15",
                      coverage: "60% of farm",
                      benefits: ["Premium pricing", "Market access", "Consumer trust"],
                    },
                    {
                      name: "Regenerative Organic Certified",
                      status: "In Progress",
                      expires: "N/A",
                      coverage: "40% of farm",
                      benefits: ["Highest premium", "Soil health recognition", "Carbon credits"],
                    },
                    {
                      name: "Rainforest Alliance",
                      status: "Certified",
                      expires: "2024-12-01",
                      coverage: "100% of farm",
                      benefits: ["Sustainability recognition", "Export opportunities", "Training access"],
                    },
                    {
                      name: "Carbon Trust Standard",
                      status: "Pending",
                      expires: "N/A",
                      coverage: "100% of farm",
                      benefits: ["Carbon footprint verification", "Reduction targets", "Market credibility"],
                    },
                  ].map((cert, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-lg">{cert.name}</h3>
                        <Badge
                          variant={
                            cert.status === "Certified"
                              ? "default"
                              : cert.status === "In Progress"
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            cert.status === "Certified"
                              ? "bg-green-100 text-green-800"
                              : cert.status === "In Progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {cert.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                        <div>
                          <p className="text-gray-500">Coverage</p>
                          <p className="font-medium">{cert.coverage}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Expires</p>
                          <p className="font-medium">
                            {cert.expires !== "N/A" ? new Date(cert.expires).toLocaleDateString() : "N/A"}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Benefits:</p>
                        <div className="flex flex-wrap gap-2">
                          {cert.benefits.map((benefit, benefitIndex) => (
                            <Badge key={benefitIndex} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compliance Dashboard</CardTitle>
                  <CardDescription>Regulatory compliance and audit status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Environmental Compliance</h4>
                      {[
                        { regulation: "Clean Water Act", status: "Compliant", lastAudit: "2024-03-15" },
                        { regulation: "Endangered Species Act", status: "Compliant", lastAudit: "2024-02-20" },
                        { regulation: "Pesticide Regulations", status: "Compliant", lastAudit: "2024-04-10" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{item.regulation}</p>
                            <p className="text-sm text-gray-600">
                              Last audit: {new Date(item.lastAudit).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {item.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Upcoming Audits</h4>
                      {[
                        { audit: "Organic Certification Renewal", date: "2024-07-15", type: "Annual" },
                        { audit: "Carbon Footprint Verification", date: "2024-08-20", type: "Quarterly" },
                        { audit: "Water Usage Assessment", date: "2024-09-10", type: "Bi-annual" },
                      ].map((audit, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <div>
                            <p className="font-medium">{audit.audit}</p>
                            <p className="text-sm text-gray-600">{audit.type} audit</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{new Date(audit.date).toLocaleDateString()}</p>
                            <Badge variant="outline">Scheduled</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sustainability Reports</CardTitle>
                  <CardDescription>Generate comprehensive sustainability and impact reports</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        title: "Annual Sustainability Report",
                        description: "Comprehensive yearly environmental impact assessment",
                        frequency: "Annual",
                        lastGenerated: "2024-01-15",
                      },
                      {
                        title: "Carbon Footprint Report",
                        description: "Detailed carbon emissions and sequestration analysis",
                        frequency: "Quarterly",
                        lastGenerated: "2024-04-01",
                      },
                      {
                        title: "Water Usage Report",
                        description: "Water consumption and conservation metrics",
                        frequency: "Monthly",
                        lastGenerated: "2024-06-01",
                      },
                      {
                        title: "Biodiversity Assessment",
                        description: "Wildlife and ecosystem health evaluation",
                        frequency: "Bi-annual",
                        lastGenerated: "2024-01-30",
                      },
                      {
                        title: "Soil Health Report",
                        description: "Soil quality and regenerative practice impact",
                        frequency: "Annual",
                        lastGenerated: "2024-03-15",
                      },
                      {
                        title: "Certification Compliance",
                        description: "Status of all sustainability certifications",
                        frequency: "Quarterly",
                        lastGenerated: "2024-04-15",
                      },
                    ].map((report, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">{report.title}</CardTitle>
                          <CardDescription className="text-sm">{report.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="text-sm">
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-500">Frequency:</span>
                              <span className="font-medium">{report.frequency}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Last Generated:</span>
                              <span className="font-medium">{new Date(report.lastGenerated).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <BarChart3 className="h-4 w-4 mr-1" />
                              Generate
                            </Button>
                            <Button size="sm" variant="outline">
                              <Calendar className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Impact Summary</CardTitle>
                  <CardDescription>Key sustainability achievements this year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Leaf className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <p className="text-2xl font-bold text-green-600">245 tons</p>
                      <p className="text-sm text-gray-600">CO2 Sequestered</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Droplets className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <p className="text-2xl font-bold text-blue-600">25%</p>
                      <p className="text-sm text-gray-600">Water Reduction</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                      <p className="text-2xl font-bold text-yellow-600">40%</p>
                      <p className="text-sm text-gray-600">Renewable Energy</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Globe className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                      <p className="text-2xl font-bold text-purple-600">15%</p>
                      <p className="text-sm text-gray-600">Biodiversity Increase</p>
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
