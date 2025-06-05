"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Camera,
  Upload,
  Scan,
  AlertTriangle,
  CheckCircle,
  Bug,
  Leaf,
  Droplets,
  Microscope,
  Brain,
  TrendingUp,
  Calendar,
  MapPin,
  Download,
  Share,
} from "lucide-react"
import { showToast } from "@/lib/toast-utils"

interface AnalysisResult {
  id: string
  image: string
  timestamp: string
  location: string
  cropType: string
  healthScore: number
  issues: {
    type: "disease" | "pest" | "nutrient" | "water"
    name: string
    confidence: number
    severity: "low" | "medium" | "high"
    description: string
    treatment: string[]
  }[]
  recommendations: string[]
  growthStage: string
  estimatedYield: string
}

export default function CropHealthPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([])
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Sample analysis results
  const sampleResults: AnalysisResult[] = [
    {
      id: "analysis-001",
      image: "/placeholder.svg?height=300&width=400",
      timestamp: new Date().toISOString(),
      location: "Field A - Section 3",
      cropType: "Corn",
      healthScore: 87,
      issues: [
        {
          type: "pest",
          name: "Corn Borer",
          confidence: 92,
          severity: "medium",
          description: "Early signs of corn borer infestation detected in leaf tissue",
          treatment: ["Apply Bt spray", "Monitor weekly", "Remove affected plants"],
        },
      ],
      recommendations: [
        "Apply biological pesticide within 48 hours",
        "Increase monitoring frequency to twice weekly",
        "Consider pheromone traps for early detection",
        "Maintain proper field sanitation",
      ],
      growthStage: "V8 - Eight Leaf Stage",
      estimatedYield: "185 bushels/acre",
    },
    {
      id: "analysis-002",
      image: "/placeholder.svg?height=300&width=400",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      location: "Greenhouse 1 - Row 5",
      cropType: "Tomatoes",
      healthScore: 94,
      issues: [],
      recommendations: [
        "Maintain current care routine",
        "Continue regular watering schedule",
        "Monitor for early blight as season progresses",
      ],
      growthStage: "Flowering Stage",
      estimatedYield: "28 tons/acre",
    },
  ]

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsAnalyzing(true)
    setSelectedImage(URL.createObjectURL(file))

    try {
      // Simulate AI analysis delay
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // In real implementation, this would call your AI service
      const newResult: AnalysisResult = {
        id: `analysis-${Date.now()}`,
        image: URL.createObjectURL(file),
        timestamp: new Date().toISOString(),
        location: "Field A - Section 1",
        cropType: "Corn",
        healthScore: Math.floor(Math.random() * 30) + 70,
        issues: Math.random() > 0.5 ? sampleResults[0].issues : [],
        recommendations: sampleResults[0].recommendations,
        growthStage: "V6 - Six Leaf Stage",
        estimatedYield: "180 bushels/acre",
      }

      setAnalysisResults([newResult, ...analysisResults])
      showToast.success("Crop analysis completed successfully!")
    } catch (error) {
      showToast.error("Analysis failed. Please try again.")
    } finally {
      setIsAnalyzing(false)
      setSelectedImage(null)
    }
  }

  const handleCameraCapture = () => {
    // In a real app, this would open camera interface
    showToast.info("Camera feature would open here in mobile app")
  }

  const getHealthColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getHealthBadge = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800"
    if (score >= 70) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "disease":
        return <Microscope className="h-4 w-4" />
      case "pest":
        return <Bug className="h-4 w-4" />
      case "nutrient":
        return <Leaf className="h-4 w-4" />
      case "water":
        return <Droplets className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
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
                  <Brain className="mr-3 h-6 w-6 text-green-600" />
                  AI Crop Health Monitor
                </h1>
                <p className="text-gray-600 mt-1">
                  Advanced computer vision for instant crop disease and pest detection
                </p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Scan className="h-4 w-4 mr-1" />
                AI-Powered Analysis
              </Badge>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Tabs defaultValue="analyze" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="analyze">Analyze Crops</TabsTrigger>
              <TabsTrigger value="results">Analysis History</TabsTrigger>
              <TabsTrigger value="insights">Health Insights</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="analyze" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upload Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Camera className="h-5 w-5 mr-2" />
                      Capture or Upload Image
                    </CardTitle>
                    <CardDescription>
                      Take a photo or upload an image of your crops for AI-powered health analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      {selectedImage ? (
                        <div className="space-y-4">
                          <img
                            src={selectedImage || "/placeholder.svg"}
                            alt="Selected crop"
                            className="max-w-full h-48 object-cover mx-auto rounded-lg"
                          />
                          {isAnalyzing && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-center space-x-2">
                                <Brain className="h-5 w-5 animate-pulse text-green-600" />
                                <span className="text-sm">AI analyzing image...</span>
                              </div>
                              <Progress value={66} className="w-full" />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <Camera className="h-8 w-8 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-lg font-medium">Upload crop image</p>
                            <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button onClick={() => fileInputRef.current?.click()} disabled={isAnalyzing} className="w-full">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </Button>
                      <Button onClick={handleCameraCapture} disabled={isAnalyzing} variant="outline" className="w-full">
                        <Camera className="mr-2 h-4 w-4" />
                        Take Photo
                      </Button>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    <div className="space-y-2">
                      <Label htmlFor="location">Location (Optional)</Label>
                      <Input id="location" placeholder="e.g., Field A - Section 3" />
                    </div>
                  </CardContent>
                </Card>

                {/* Analysis Tips */}
                <Card>
                  <CardHeader>
                    <CardTitle>Analysis Tips</CardTitle>
                    <CardDescription>Get the best results from AI analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Good Lighting</p>
                          <p className="text-sm text-gray-600">Take photos in natural daylight for best results</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Close-up Shots</p>
                          <p className="text-sm text-gray-600">Focus on leaves, stems, or affected areas</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Multiple Angles</p>
                          <p className="text-sm text-gray-600">Take several photos from different perspectives</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Include Context</p>
                          <p className="text-sm text-gray-600">Show surrounding plants for comparison</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">AI Capabilities</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Disease identification (95% accuracy)</li>
                        <li>• Pest detection and classification</li>
                        <li>• Nutrient deficiency analysis</li>
                        <li>• Growth stage assessment</li>
                        <li>• Yield prediction</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Analysis History</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                {[...sampleResults, ...analysisResults].map((result) => (
                  <Card key={result.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img
                            src={result.image || "/placeholder.svg"}
                            alt="Crop analysis"
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <CardTitle className="text-lg">{result.cropType} Analysis</CardTitle>
                            <CardDescription className="flex items-center space-x-4">
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {result.location}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(result.timestamp).toLocaleDateString()}
                              </span>
                            </CardDescription>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getHealthColor(result.healthScore)}`}>
                            {result.healthScore}%
                          </div>
                          <Badge className={getHealthBadge(result.healthScore)}>
                            {result.healthScore >= 90 ? "Excellent" : result.healthScore >= 70 ? "Good" : "Poor"}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Growth Information</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>Growth Stage:</span>
                              <span className="font-medium">{result.growthStage}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Estimated Yield:</span>
                              <span className="font-medium">{result.estimatedYield}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Health Score</h4>
                          <Progress value={result.healthScore} className="h-3" />
                          <p className="text-xs text-gray-500 mt-1">Overall plant health assessment</p>
                        </div>
                      </div>

                      {result.issues.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-2 flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-1 text-yellow-600" />
                            Detected Issues
                          </h4>
                          <div className="space-y-2">
                            {result.issues.map((issue, index) => (
                              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    {getIssueIcon(issue.type)}
                                    <span className="font-medium">{issue.name}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Badge className={getSeverityColor(issue.severity)}>{issue.severity}</Badge>
                                    <Badge variant="outline">{issue.confidence}% confidence</Badge>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-700 mb-2">{issue.description}</p>
                                <div>
                                  <p className="text-xs font-medium text-gray-600 mb-1">Recommended Treatment:</p>
                                  <ul className="text-xs text-gray-600 space-y-1">
                                    {issue.treatment.map((treatment, treatmentIndex) => (
                                      <li key={treatmentIndex} className="flex items-start">
                                        <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0" />
                                        {treatment}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="font-medium mb-2">AI Recommendations</h4>
                        <ul className="space-y-1">
                          {result.recommendations.map((rec, index) => (
                            <li key={index} className="flex items-start text-sm">
                              <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600">Healthy Crops</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">87%</div>
                    <p className="text-sm text-gray-600">Of analyzed crops are healthy</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm text-green-600">+5% from last week</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-yellow-600">Issues Detected</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">13</div>
                    <p className="text-sm text-gray-600">Across all fields this week</p>
                    <div className="text-sm text-gray-500 mt-2">8 pests, 3 diseases, 2 nutrient</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-blue-600">Early Detection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">92%</div>
                    <p className="text-sm text-gray-600">Issues caught early</p>
                    <div className="text-sm text-green-600 mt-2">Preventing 25% yield loss</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Common Issues This Season</CardTitle>
                  <CardDescription>Most frequently detected problems</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Corn Borer", type: "pest", frequency: 45, trend: "up" },
                      { name: "Nitrogen Deficiency", type: "nutrient", frequency: 32, trend: "stable" },
                      { name: "Early Blight", type: "disease", frequency: 28, trend: "down" },
                      { name: "Aphids", type: "pest", frequency: 23, trend: "up" },
                    ].map((issue, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getIssueIcon(issue.type)}
                          <div>
                            <p className="font-medium">{issue.name}</p>
                            <p className="text-sm text-gray-600 capitalize">{issue.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{issue.frequency}%</p>
                          <div className="flex items-center">
                            {issue.trend === "up" ? (
                              <TrendingUp className="h-3 w-3 text-red-500 mr-1" />
                            ) : issue.trend === "down" ? (
                              <TrendingUp className="h-3 w-3 text-green-500 mr-1 rotate-180" />
                            ) : (
                              <div className="w-3 h-3 bg-gray-400 rounded-full mr-1" />
                            )}
                            <span className="text-xs text-gray-500">{issue.trend}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generate Health Reports</CardTitle>
                  <CardDescription>Create detailed reports for stakeholders and compliance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button className="h-20 flex-col">
                      <Calendar className="h-6 w-6 mb-2" />
                      Weekly Health Report
                    </Button>
                    <Button className="h-20 flex-col" variant="outline">
                      <TrendingUp className="h-6 w-6 mb-2" />
                      Seasonal Analysis
                    </Button>
                    <Button className="h-20 flex-col" variant="outline">
                      <Bug className="h-6 w-6 mb-2" />
                      Pest Management Report
                    </Button>
                    <Button className="h-20 flex-col" variant="outline">
                      <Microscope className="h-6 w-6 mb-2" />
                      Disease Tracking Report
                    </Button>
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
