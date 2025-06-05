"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  MapPin,
  Loader2,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  Sun,
  Bug,
  BarChart3,
  Calendar,
  Target,
} from "lucide-react"
import { showToast } from "@/lib/toast-utils"

interface PredictionResult {
  type: string
  title: string
  confidence: number
  description: string
  recommendations: string[]
  timeframe: string
  priority: "high" | "medium" | "low"
}

export default function AIInsightsPage() {
  const [location, setLocation] = useState("")
  const [farmType, setFarmType] = useState("")
  const [cropType, setCropType] = useState("")
  const [customQuery, setCustomQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [predictions, setPredictions] = useState<PredictionResult[]>([])
  const [selectedPrediction, setSelectedPrediction] = useState<string>("crop-yield")

  // Sample prediction results - in real app, these would come from Gemini AI
  const samplePredictions: Record<string, PredictionResult[]> = {
    "crop-yield": [
      {
        type: "yield",
        title: "Corn Yield Prediction",
        confidence: 87,
        description:
          "Based on current weather patterns, soil conditions, and historical data for Springfield, IL, corn yields are expected to be 15% above average this season.",
        recommendations: [
          "Maintain current irrigation schedule",
          "Apply nitrogen fertilizer in 2 weeks",
          "Monitor for corn borer activity",
          "Plan harvest for late August",
        ],
        timeframe: "Next 3 months",
        priority: "high",
      },
      {
        type: "yield",
        title: "Soybean Yield Forecast",
        confidence: 82,
        description:
          "Soybean yields are projected to be slightly below average due to recent dry conditions. Early intervention can improve outcomes.",
        recommendations: [
          "Increase irrigation frequency by 20%",
          "Consider drought-resistant varieties next season",
          "Apply potassium supplement",
          "Monitor soil moisture levels daily",
        ],
        timeframe: "Next 2 months",
        priority: "medium",
      },
    ],
    "weather-impact": [
      {
        type: "weather",
        title: "Drought Risk Assessment",
        confidence: 75,
        description:
          "Analysis of weather patterns indicates a 30% chance of drought conditions developing in the next 6 weeks for your region.",
        recommendations: [
          "Implement water conservation measures",
          "Install drip irrigation systems",
          "Consider drought-tolerant crop varieties",
          "Build water storage capacity",
        ],
        timeframe: "Next 6 weeks",
        priority: "high",
      },
      {
        type: "weather",
        title: "Frost Risk Prediction",
        confidence: 91,
        description:
          "Low probability of late frost this season. Planting can proceed as scheduled with minimal risk to early crops.",
        recommendations: [
          "Proceed with planned planting schedule",
          "Keep frost protection equipment ready",
          "Monitor nighttime temperature forecasts",
          "Consider early-maturing varieties",
        ],
        timeframe: "Next 4 weeks",
        priority: "low",
      },
    ],
    "pest-disease": [
      {
        type: "pest",
        title: "Corn Borer Activity Forecast",
        confidence: 79,
        description:
          "Weather conditions are favorable for increased corn borer activity. Peak infestation period expected in 2-3 weeks.",
        recommendations: [
          "Begin monitoring corn borer traps",
          "Prepare biological control agents",
          "Schedule scouting activities",
          "Consider targeted pesticide application",
        ],
        timeframe: "Next 3 weeks",
        priority: "high",
      },
      {
        type: "disease",
        title: "Fungal Disease Risk",
        confidence: 68,
        description:
          "High humidity and moderate temperatures create conditions favorable for fungal diseases in leafy crops.",
        recommendations: [
          "Improve air circulation in fields",
          "Apply preventive fungicide treatments",
          "Reduce overhead irrigation",
          "Monitor plants for early symptoms",
        ],
        timeframe: "Next 2 weeks",
        priority: "medium",
      },
    ],
    "market-trends": [
      {
        type: "market",
        title: "Corn Price Projection",
        confidence: 73,
        description:
          "Corn prices are expected to increase by 8-12% over the next quarter due to increased demand and reduced global supply.",
        recommendations: [
          "Consider holding current inventory",
          "Lock in forward contracts for premium prices",
          "Increase corn acreage next season",
          "Explore value-added processing options",
        ],
        timeframe: "Next 3 months",
        priority: "medium",
      },
      {
        type: "market",
        title: "Organic Premium Opportunity",
        confidence: 85,
        description:
          "Strong demand for organic produce in your region. Transitioning to organic farming could increase profit margins by 25-30%.",
        recommendations: [
          "Begin organic certification process",
          "Research organic farming practices",
          "Connect with organic buyers",
          "Calculate transition costs and timeline",
        ],
        timeframe: "Next 12 months",
        priority: "medium",
      },
    ],
  }

  const handleGeneratePredictions = async () => {
    if (!location) {
      showToast.error("Please enter your farm location")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real implementation, this would call the Gemini AI API
      // const response = await fetch('/api/gemini-predictions', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     location,
      //     farmType,
      //     cropType,
      //     predictionType: selectedPrediction,
      //     customQuery
      //   })
      // })

      // For now, use sample data
      const results = samplePredictions[selectedPrediction] || []
      setPredictions(results)

      showToast.success("AI predictions generated successfully!")
    } catch (error) {
      showToast.error("Failed to generate predictions. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCustomQuery = async () => {
    if (!customQuery.trim()) {
      showToast.error("Please enter your question")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real implementation, this would call the Gemini AI API for custom queries
      showToast.success("Custom analysis completed!")
    } catch (error) {
      showToast.error("Failed to process your question. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "yield":
        return <BarChart3 className="h-5 w-5 text-green-600" />
      case "weather":
        return <Sun className="h-5 w-5 text-blue-600" />
      case "pest":
        return <Bug className="h-5 w-5 text-red-600" />
      case "disease":
        return <AlertTriangle className="h-5 w-5 text-orange-600" />
      case "market":
        return <TrendingUp className="h-5 w-5 text-purple-600" />
      default:
        return <Lightbulb className="h-5 w-5 text-gray-600" />
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
                  <Brain className="mr-3 h-6 w-6 text-purple-600" />
                  AI Farm Insights
                </h1>
                <p className="text-gray-600 mt-1">
                  Get intelligent predictions and recommendations powered by Gemini AI
                </p>
              </div>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Powered by Gemini AI
              </Badge>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Panel */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Prediction Settings
                  </CardTitle>
                  <CardDescription>Configure your farm details for accurate AI predictions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Farm Location*</Label>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        id="location"
                        placeholder="e.g., Springfield, IL"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="farm-type">Farm Type</Label>
                    <Select value={farmType} onValueChange={setFarmType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select farm type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="crop">Crop Farm</SelectItem>
                        <SelectItem value="livestock">Livestock</SelectItem>
                        <SelectItem value="dairy">Dairy Farm</SelectItem>
                        <SelectItem value="orchard">Orchard</SelectItem>
                        <SelectItem value="mixed">Mixed Farm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="crop-type">Primary Crops</Label>
                    <Select value={cropType} onValueChange={setCropType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select primary crops" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="corn">Corn</SelectItem>
                        <SelectItem value="soybeans">Soybeans</SelectItem>
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="tomatoes">Tomatoes</SelectItem>
                        <SelectItem value="apples">Apples</SelectItem>
                        <SelectItem value="mixed">Mixed Crops</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prediction-type">Prediction Type</Label>
                    <Select value={selectedPrediction} onValueChange={setSelectedPrediction}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select prediction type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="crop-yield">Crop Yield Forecast</SelectItem>
                        <SelectItem value="weather-impact">Weather Impact Analysis</SelectItem>
                        <SelectItem value="pest-disease">Pest & Disease Risk</SelectItem>
                        <SelectItem value="market-trends">Market Trends</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleGeneratePredictions}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Predictions...
                      </>
                    ) : (
                      <>
                        <Brain className="mr-2 h-4 w-4" />
                        Generate AI Predictions
                      </>
                    )}
                  </Button>

                  <div className="pt-4 border-t">
                    <Label htmlFor="custom-query">Ask AI a Question</Label>
                    <Textarea
                      id="custom-query"
                      placeholder="e.g., What's the best time to plant corn in my area?"
                      value={customQuery}
                      onChange={(e) => setCustomQuery(e.target.value)}
                      className="mt-2"
                      rows={3}
                    />
                    <Button onClick={handleCustomQuery} variant="outline" className="w-full mt-2" disabled={isLoading}>
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Lightbulb className="mr-2 h-4 w-4" />
                      )}
                      Ask AI
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-2">
              {predictions.length > 0 ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">AI Predictions & Insights</h2>
                    <Badge variant="outline">
                      {predictions.length} prediction{predictions.length !== 1 ? "s" : ""} generated
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    {predictions.map((prediction, index) => (
                      <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {getTypeIcon(prediction.type)}
                              <CardTitle className="text-lg">{prediction.title}</CardTitle>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getPriorityColor(prediction.priority)}>
                                {prediction.priority} priority
                              </Badge>
                              <Badge variant="outline">{prediction.confidence}% confidence</Badge>
                            </div>
                          </div>
                          <CardDescription className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {prediction.timeframe}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-gray-700">{prediction.description}</p>

                          <div>
                            <h4 className="font-semibold mb-2 flex items-center">
                              <Lightbulb className="h-4 w-4 mr-1" />
                              AI Recommendations:
                            </h4>
                            <ul className="space-y-1">
                              {prediction.recommendations.map((rec, recIndex) => (
                                <li key={recIndex} className="flex items-start space-x-2">
                                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-sm text-gray-600">{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Confidence Level</span>
                              <span className="font-medium">{prediction.confidence}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                              <div
                                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${prediction.confidence}%` }}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <Card className="h-96 flex items-center justify-center">
                  <CardContent className="text-center">
                    <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">Ready to Generate AI Insights</h3>
                    <p className="text-gray-500 mb-4">
                      Enter your farm location and select a prediction type to get started with AI-powered farming
                      insights.
                    </p>
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <BarChart3 className="h-6 w-6 text-green-600 mx-auto mb-1" />
                        <p className="text-xs text-gray-600">Yield Forecasts</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <Sun className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                        <p className="text-xs text-gray-600">Weather Analysis</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <Bug className="h-6 w-6 text-red-600 mx-auto mb-1" />
                        <p className="text-xs text-gray-600">Pest Predictions</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                        <p className="text-xs text-gray-600">Market Trends</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
