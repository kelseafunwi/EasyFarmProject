"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  MapPin,
} from "lucide-react"

export default function WeatherPage() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Sample weather data - in a real app, this would come from a weather API
  const currentWeather = {
    location: "Springfield, IL",
    temperature: 24,
    feelsLike: 27,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    windDirection: "NW",
    pressure: 1013,
    visibility: 10,
    uvIndex: 6,
    dewPoint: 18,
    sunrise: "06:15",
    sunset: "19:45",
  }

  const hourlyForecast = [
    { time: "12:00", temp: 24, condition: "sunny", precipitation: 0 },
    { time: "13:00", temp: 26, condition: "sunny", precipitation: 0 },
    { time: "14:00", temp: 28, condition: "partly-cloudy", precipitation: 5 },
    { time: "15:00", temp: 29, condition: "partly-cloudy", precipitation: 10 },
    { time: "16:00", temp: 27, condition: "cloudy", precipitation: 20 },
    { time: "17:00", temp: 25, condition: "rainy", precipitation: 60 },
    { time: "18:00", temp: 23, condition: "rainy", precipitation: 80 },
    { time: "19:00", temp: 22, condition: "cloudy", precipitation: 30 },
  ]

  const weeklyForecast = [
    { day: "Today", high: 29, low: 18, condition: "partly-cloudy", precipitation: 20 },
    { day: "Tomorrow", high: 25, low: 16, condition: "rainy", precipitation: 80 },
    { day: "Wednesday", high: 22, low: 14, condition: "rainy", precipitation: 90 },
    { day: "Thursday", high: 26, low: 15, condition: "cloudy", precipitation: 40 },
    { day: "Friday", high: 28, low: 17, condition: "sunny", precipitation: 10 },
    { day: "Saturday", high: 30, low: 19, condition: "sunny", precipitation: 5 },
    { day: "Sunday", high: 32, low: 21, condition: "partly-cloudy", precipitation: 15 },
  ]

  const weatherAlerts = [
    {
      type: "warning",
      title: "Heavy Rain Expected",
      description: "Heavy rainfall expected tomorrow afternoon. Consider postponing outdoor activities.",
      time: "Tomorrow 2:00 PM - 6:00 PM",
    },
    {
      type: "info",
      title: "Optimal Planting Conditions",
      description: "Weather conditions will be ideal for planting this weekend.",
      time: "This Weekend",
    },
  ]

  const farmingInsights = [
    {
      title: "Irrigation Recommendation",
      description: "With upcoming rain, reduce irrigation by 40% for the next 3 days.",
      priority: "medium",
    },
    {
      title: "Harvest Window",
      description: "Clear weather Friday-Sunday provides excellent harvest conditions.",
      priority: "high",
    },
    {
      title: "Pest Alert",
      description: "High humidity may increase pest activity. Monitor crops closely.",
      priority: "medium",
    },
    {
      title: "Soil Conditions",
      description: "Recent rainfall has improved soil moisture levels by 25%.",
      priority: "low",
    },
  ]

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-6 w-6 text-yellow-500" />
      case "partly-cloudy":
        return <Cloud className="h-6 w-6 text-gray-500" />
      case "cloudy":
        return <Cloud className="h-6 w-6 text-gray-600" />
      case "rainy":
        return <CloudRain className="h-6 w-6 text-blue-500" />
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />
    }
  }

  const getConditionText = (condition: string) => {
    switch (condition) {
      case "sunny":
        return "Sunny"
      case "partly-cloudy":
        return "Partly Cloudy"
      case "cloudy":
        return "Cloudy"
      case "rainy":
        return "Rainy"
      default:
        return "Clear"
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
                  <Cloud className="mr-3 h-6 w-6 text-blue-600" />
                  Weather Center
                </h1>
                <p className="text-gray-600 mt-1 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {currentWeather.location} • {currentTime.toLocaleTimeString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">{currentWeather.temperature}°C</p>
                <p className="text-sm text-gray-500">{currentWeather.condition}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="current">Current Weather</TabsTrigger>
              <TabsTrigger value="forecast">Forecast</TabsTrigger>
              <TabsTrigger value="alerts">Alerts & Insights</TabsTrigger>
              <TabsTrigger value="historical">Historical Data</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-6">
              {/* Current Weather Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Thermometer className="h-5 w-5 mr-2" />
                      Current Conditions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                          {getWeatherIcon("partly-cloudy")}
                        </div>
                        <div>
                          <p className="text-4xl font-bold">{currentWeather.temperature}°C</p>
                          <p className="text-gray-600">Feels like {currentWeather.feelsLike}°C</p>
                          <p className="text-sm text-gray-500">{currentWeather.condition}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <Droplets className="h-4 w-4 text-blue-500" />
                          <span className="text-sm text-gray-600">Humidity</span>
                        </div>
                        <p className="text-lg font-semibold">{currentWeather.humidity}%</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <Wind className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Wind</span>
                        </div>
                        <p className="text-lg font-semibold">
                          {currentWeather.windSpeed} km/h {currentWeather.windDirection}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <Gauge className="h-4 w-4 text-purple-500" />
                          <span className="text-sm text-gray-600">Pressure</span>
                        </div>
                        <p className="text-lg font-semibold">{currentWeather.pressure} hPa</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <Eye className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-600">Visibility</span>
                        </div>
                        <p className="text-lg font-semibold">{currentWeather.visibility} km</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sun & Moon</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Sunrise className="h-5 w-5 text-orange-500" />
                        <span className="text-sm">Sunrise</span>
                      </div>
                      <span className="font-semibold">{currentWeather.sunrise}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Sunset className="h-5 w-5 text-orange-600" />
                        <span className="text-sm">Sunset</span>
                      </div>
                      <span className="font-semibold">{currentWeather.sunset}</span>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">UV Index</span>
                        <Badge variant={currentWeather.uvIndex > 7 ? "destructive" : "default"}>
                          {currentWeather.uvIndex}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Dew Point</span>
                        <span className="font-semibold">{currentWeather.dewPoint}°C</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Hourly Forecast */}
              <Card>
                <CardHeader>
                  <CardTitle>Hourly Forecast</CardTitle>
                  <CardDescription>Weather conditions for the next 8 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                    {hourlyForecast.map((hour, index) => (
                      <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">{hour.time}</p>
                        <div className="flex justify-center mb-2">{getWeatherIcon(hour.condition)}</div>
                        <p className="font-semibold mb-1">{hour.temp}°</p>
                        <div className="flex items-center justify-center space-x-1">
                          <Droplets className="h-3 w-3 text-blue-500" />
                          <span className="text-xs">{hour.precipitation}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="forecast" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>7-Day Forecast</CardTitle>
                  <CardDescription>Extended weather outlook for farm planning</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyForecast.map((day, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 text-sm font-medium">{day.day}</div>
                          <div className="flex items-center space-x-2">
                            {getWeatherIcon(day.condition)}
                            <span className="text-sm">{getConditionText(day.condition)}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2">
                            <Droplets className="h-4 w-4 text-blue-500" />
                            <span className="text-sm">{day.precipitation}%</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">{day.low}°</span>
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-400 to-red-400"
                                style={{ width: `${((day.high - day.low) / 20) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold">{day.high}°</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              {/* Weather Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                    Weather Alerts
                  </CardTitle>
                  <CardDescription>Important weather notifications for your farm</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {weatherAlerts.map((alert, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-l-4 ${
                        alert.type === "warning" ? "bg-orange-50 border-orange-400" : "bg-blue-50 border-blue-400"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{alert.title}</h3>
                        <Badge variant={alert.type === "warning" ? "destructive" : "default"}>{alert.type}</Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{alert.description}</p>
                      <p className="text-xs text-gray-500">{alert.time}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Farming Insights */}
              <Card>
                <CardHeader>
                  <CardTitle>Farming Insights</CardTitle>
                  <CardDescription>Weather-based recommendations for your farm operations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {farmingInsights.map((insight, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          insight.priority === "high"
                            ? "bg-red-500"
                            : insight.priority === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{insight.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                      </div>
                      <Badge
                        variant={
                          insight.priority === "high"
                            ? "destructive"
                            : insight.priority === "medium"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {insight.priority}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="historical" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Temperature Trends</CardTitle>
                    <CardDescription>Average temperatures over the past 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Average High</span>
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-red-500" />
                          <span className="font-semibold">28°C</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Average Low</span>
                        <div className="flex items-center space-x-2">
                          <TrendingDown className="h-4 w-4 text-blue-500" />
                          <span className="font-semibold">16°C</span>
                        </div>
                      </div>
                      <div className="pt-4 border-t">
                        <p className="text-sm text-gray-600">
                          Temperatures have been 2°C above average for this time of year.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Precipitation Summary</CardTitle>
                    <CardDescription>Rainfall data for the past 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Total Rainfall</span>
                        <span className="font-semibold">45mm</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Rainy Days</span>
                        <span className="font-semibold">8 days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">vs. Average</span>
                        <Badge variant="secondary">-15mm</Badge>
                      </div>
                      <div className="pt-4 border-t">
                        <p className="text-sm text-gray-600">
                          Rainfall has been below average. Consider supplemental irrigation.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Comparison</CardTitle>
                  <CardDescription>Weather patterns compared to historical averages</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Temperature</p>
                      <p className="text-2xl font-bold text-red-500">+2°C</p>
                      <p className="text-xs text-gray-500">Above average</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Rainfall</p>
                      <p className="text-2xl font-bold text-blue-500">-15mm</p>
                      <p className="text-xs text-gray-500">Below average</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Humidity</p>
                      <p className="text-2xl font-bold text-green-500">Normal</p>
                      <p className="text-xs text-gray-500">Within range</p>
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
