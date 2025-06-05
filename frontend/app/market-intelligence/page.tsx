"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Globe,
  AlertTriangle,
  Target,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from "lucide-react"

interface MarketData {
  commodity: string
  currentPrice: number
  change: number
  changePercent: number
  volume: number
  high52Week: number
  low52Week: number
  forecast: "bullish" | "bearish" | "neutral"
  confidence: number
}

interface PriceAlert {
  id: string
  commodity: string
  type: "above" | "below"
  targetPrice: number
  currentPrice: number
  triggered: boolean
  createdAt: string
}

export default function MarketIntelligencePage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1M")
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([])

  useEffect(() => {
    // Initialize sample market data
    const sampleMarketData: MarketData[] = [
      {
        commodity: "Corn",
        currentPrice: 6.85,
        change: 0.12,
        changePercent: 1.78,
        volume: 245000,
        high52Week: 7.45,
        low52Week: 5.2,
        forecast: "bullish",
        confidence: 78,
      },
      {
        commodity: "Soybeans",
        currentPrice: 14.25,
        change: -0.08,
        changePercent: -0.56,
        volume: 180000,
        high52Week: 16.8,
        low52Week: 12.1,
        forecast: "neutral",
        confidence: 65,
      },
      {
        commodity: "Wheat",
        currentPrice: 8.9,
        change: 0.25,
        changePercent: 2.89,
        volume: 120000,
        high52Week: 10.2,
        low52Week: 7.8,
        forecast: "bullish",
        confidence: 82,
      },
      {
        commodity: "Cotton",
        currentPrice: 0.72,
        change: -0.02,
        changePercent: -2.7,
        volume: 95000,
        high52Week: 0.89,
        low52Week: 0.65,
        forecast: "bearish",
        confidence: 71,
      },
      {
        commodity: "Rice",
        currentPrice: 16.4,
        change: 0.35,
        changePercent: 2.18,
        volume: 75000,
        high52Week: 18.9,
        low52Week: 14.2,
        forecast: "bullish",
        confidence: 69,
      },
    ]

    const sampleAlerts: PriceAlert[] = [
      {
        id: "alert-001",
        commodity: "Corn",
        type: "above",
        targetPrice: 6.8,
        currentPrice: 6.85,
        triggered: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: "alert-002",
        commodity: "Soybeans",
        type: "below",
        targetPrice: 14.5,
        currentPrice: 14.25,
        triggered: true,
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
    ]

    setMarketData(sampleMarketData)
    setPriceAlerts(sampleAlerts)

    // Simulate real-time price updates
    const interval = setInterval(() => {
      setMarketData((prevData) =>
        prevData.map((item) => ({
          ...item,
          currentPrice: item.currentPrice + (Math.random() - 0.5) * 0.1,
          change: (Math.random() - 0.5) * 0.3,
          changePercent: (Math.random() - 0.5) * 3,
        })),
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const getForecastColor = (forecast: string) => {
    switch (forecast) {
      case "bullish":
        return "bg-green-100 text-green-800"
      case "bearish":
        return "bg-red-100 text-red-800"
      case "neutral":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getForecastIcon = (forecast: string) => {
    switch (forecast) {
      case "bullish":
        return <TrendingUp className="h-4 w-4" />
      case "bearish":
        return <TrendingDown className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const totalPortfolioValue = marketData.reduce((sum, item) => sum + item.currentPrice * 1000, 0)
  const totalChange = marketData.reduce((sum, item) => sum + item.change * 1000, 0)
  const totalChangePercent = (totalChange / (totalPortfolioValue - totalChange)) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:pl-64">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <BarChart3 className="mr-3 h-6 w-6 text-green-600" />
                  Market Intelligence Center
                </h1>
                <p className="text-gray-600 mt-1">AI-powered commodity pricing, market trends, and trading insights</p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  <Globe className="h-4 w-4 mr-1" />
                  Live Markets
                </Badge>
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1D">1D</SelectItem>
                    <SelectItem value="1W">1W</SelectItem>
                    <SelectItem value="1M">1M</SelectItem>
                    <SelectItem value="3M">3M</SelectItem>
                    <SelectItem value="1Y">1Y</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalPortfolioValue.toFixed(0)}</div>
                <div className="flex items-center text-xs">
                  {totalChange >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                  )}
                  <span className={totalChange >= 0 ? "text-green-600" : "text-red-600"}>
                    {totalChangePercent >= 0 ? "+" : ""}
                    {totalChangePercent.toFixed(2)}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{priceAlerts.filter((a) => a.triggered).length}</div>
                <p className="text-xs text-muted-foreground">Price targets hit</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Best Performer</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Wheat</div>
                <p className="text-xs text-green-600">+2.89% today</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Market Sentiment</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Bullish</div>
                <p className="text-xs text-muted-foreground">75% confidence</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="prices" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="prices">Live Prices</TabsTrigger>
              <TabsTrigger value="forecasts">AI Forecasts</TabsTrigger>
              <TabsTrigger value="alerts">Price Alerts</TabsTrigger>
              <TabsTrigger value="analysis">Market Analysis</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            </TabsList>

            <TabsContent value="prices" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {marketData.map((commodity) => (
                  <Card key={commodity.commodity} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{commodity.commodity}</CardTitle>
                        <Badge className={getForecastColor(commodity.forecast)}>
                          {getForecastIcon(commodity.forecast)}
                          <span className="ml-1 capitalize">{commodity.forecast}</span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Current Price */}
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-3xl font-bold">${commodity.currentPrice.toFixed(2)}</div>
                        <div className="flex items-center justify-center space-x-2 mt-1">
                          {commodity.change >= 0 ? (
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-600" />
                          )}
                          <span className={commodity.change >= 0 ? "text-green-600" : "text-red-600"}>
                            {commodity.change >= 0 ? "+" : ""}
                            {commodity.change.toFixed(2)} ({commodity.changePercent.toFixed(2)}%)
                          </span>
                        </div>
                      </div>

                      {/* Price Range */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>52W Range</span>
                          <span>
                            ${commodity.low52Week.toFixed(2)} - ${commodity.high52Week.toFixed(2)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${
                                ((commodity.currentPrice - commodity.low52Week) /
                                  (commodity.high52Week - commodity.low52Week)) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Additional Info */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Volume</p>
                          <p className="font-medium">{commodity.volume.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">AI Confidence</p>
                          <p className="font-medium">{commodity.confidence}%</p>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full">
                        <Target className="h-4 w-4 mr-2" />
                        Set Price Alert
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="forecasts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-yellow-600" />
                    AI-Powered Price Forecasts
                  </CardTitle>
                  <CardDescription>Machine learning predictions based on market data and trends</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {marketData.map((commodity) => (
                    <div key={commodity.commodity} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-lg">{commodity.commodity}</h3>
                        <Badge className={getForecastColor(commodity.forecast)}>
                          {commodity.confidence}% confidence
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded">
                          <p className="text-sm text-gray-600">1 Week</p>
                          <p className="font-bold text-lg">
                            ${(commodity.currentPrice * (1 + (Math.random() - 0.5) * 0.1)).toFixed(2)}
                          </p>
                          <p className="text-xs text-green-600">+2.3%</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded">
                          <p className="text-sm text-gray-600">1 Month</p>
                          <p className="font-bold text-lg">
                            ${(commodity.currentPrice * (1 + (Math.random() - 0.5) * 0.2)).toFixed(2)}
                          </p>
                          <p className="text-xs text-green-600">+5.7%</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded">
                          <p className="text-sm text-gray-600">3 Months</p>
                          <p className="font-bold text-lg">
                            ${(commodity.currentPrice * (1 + (Math.random() - 0.5) * 0.3)).toFixed(2)}
                          </p>
                          <p className="text-xs text-red-600">-1.2%</p>
                        </div>
                      </div>
                      <div className="mt-3 p-3 bg-blue-50 rounded">
                        <p className="text-sm text-blue-800">
                          <strong>AI Insight:</strong>{" "}
                          {commodity.forecast === "bullish"
                            ? "Strong demand and limited supply suggest continued price appreciation."
                            : commodity.forecast === "bearish"
                              ? "Market oversupply and weak demand indicate potential price decline."
                              : "Mixed signals suggest sideways price movement with moderate volatility."}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="alerts" className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Price Alerts</h2>
                <Button>
                  <Target className="mr-2 h-4 w-4" />
                  Create Alert
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600">Active Alerts</CardTitle>
                    <CardDescription>Triggered price notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {priceAlerts
                      .filter((alert) => alert.triggered)
                      .map((alert) => (
                        <div key={alert.id} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{alert.commodity}</p>
                              <p className="text-sm text-gray-600">
                                Price {alert.type} ${alert.targetPrice.toFixed(2)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">${alert.currentPrice.toFixed(2)}</p>
                              <Badge variant="outline" className="bg-green-100 text-green-800">
                                Triggered
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pending Alerts</CardTitle>
                    <CardDescription>Monitoring price targets</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { commodity: "Corn", type: "below", target: 6.5, current: 6.85 },
                      { commodity: "Cotton", type: "above", target: 0.75, current: 0.72 },
                      { commodity: "Rice", type: "above", target: 17.0, current: 16.4 },
                    ].map((alert, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{alert.commodity}</p>
                            <p className="text-sm text-gray-600">
                              Alert when {alert.type} ${alert.target.toFixed(2)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">${alert.current.toFixed(2)}</p>
                            <Badge variant="outline">Monitoring</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Market Sentiment Analysis</CardTitle>
                    <CardDescription>AI-powered sentiment from news and social media</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {marketData.slice(0, 3).map((commodity) => (
                        <div
                          key={commodity.commodity}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{commodity.commodity}</p>
                            <p className="text-sm text-gray-600">Market sentiment</p>
                          </div>
                          <div className="text-right">
                            <Badge className={getForecastColor(commodity.forecast)}>{commodity.forecast}</Badge>
                            <p className="text-xs text-gray-500 mt-1">{commodity.confidence}% confidence</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Supply & Demand Factors</CardTitle>
                    <CardDescription>Key market drivers and influences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { factor: "Weather Conditions", impact: "Positive", strength: "High" },
                        { factor: "Global Trade", impact: "Neutral", strength: "Medium" },
                        { factor: "Currency Exchange", impact: "Negative", strength: "Low" },
                        { factor: "Seasonal Demand", impact: "Positive", strength: "High" },
                      ].map((factor, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{factor.factor}</p>
                            <p className="text-sm text-gray-600">{factor.strength} impact</p>
                          </div>
                          <Badge
                            variant={
                              factor.impact === "Positive"
                                ? "default"
                                : factor.impact === "Negative"
                                  ? "destructive"
                                  : "secondary"
                            }
                            className={
                              factor.impact === "Positive"
                                ? "bg-green-100 text-green-800"
                                : factor.impact === "Negative"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {factor.impact}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Economic Indicators</CardTitle>
                  <CardDescription>Key economic factors affecting agricultural markets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">USD Index</p>
                      <p className="text-2xl font-bold">103.45</p>
                      <div className="flex items-center justify-center mt-1">
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-sm text-green-600">+0.8%</span>
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Oil Price</p>
                      <p className="text-2xl font-bold">$78.90</p>
                      <div className="flex items-center justify-center mt-1">
                        <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                        <span className="text-sm text-red-600">-1.2%</span>
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Interest Rate</p>
                      <p className="text-2xl font-bold">5.25%</p>
                      <div className="flex items-center justify-center mt-1">
                        <Activity className="h-4 w-4 text-gray-600 mr-1" />
                        <span className="text-sm text-gray-600">Stable</span>
                      </div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Inflation</p>
                      <p className="text-2xl font-bold">3.2%</p>
                      <div className="flex items-center justify-center mt-1">
                        <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-sm text-green-600">-0.3%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="opportunities" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-green-600" />
                    Trading Opportunities
                  </CardTitle>
                  <CardDescription>AI-identified opportunities based on market analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      type: "Buy Signal",
                      commodity: "Wheat",
                      reason: "Strong seasonal demand and weather concerns",
                      confidence: 85,
                      timeframe: "1-2 weeks",
                      potential: "+8-12%",
                    },
                    {
                      type: "Sell Signal",
                      commodity: "Cotton",
                      reason: "Oversupply and weak global demand",
                      confidence: 72,
                      timeframe: "2-4 weeks",
                      potential: "-5-8%",
                    },
                    {
                      type: "Hold",
                      commodity: "Corn",
                      reason: "Mixed signals, await clearer trend",
                      confidence: 68,
                      timeframe: "1 month",
                      potential: "±3%",
                    },
                  ].map((opportunity, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Badge
                            variant={
                              opportunity.type === "Buy Signal"
                                ? "default"
                                : opportunity.type === "Sell Signal"
                                  ? "destructive"
                                  : "secondary"
                            }
                            className={
                              opportunity.type === "Buy Signal"
                                ? "bg-green-100 text-green-800"
                                : opportunity.type === "Sell Signal"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {opportunity.type}
                          </Badge>
                          <h3 className="font-semibold text-lg">{opportunity.commodity}</h3>
                        </div>
                        <Badge variant="outline">{opportunity.confidence}% confidence</Badge>
                      </div>
                      <p className="text-gray-700 mb-3">{opportunity.reason}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Timeframe</p>
                          <p className="font-medium">{opportunity.timeframe}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Potential Return</p>
                          <p className="font-medium">{opportunity.potential}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Seasonal Patterns</CardTitle>
                  <CardDescription>Historical seasonal trends for strategic planning</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {marketData.slice(0, 3).map((commodity) => (
                      <div key={commodity.commodity} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{commodity.commodity}</h3>
                          <Badge variant="outline">Historical Pattern</Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Typically {commodity.forecast === "bullish" ? "strengthens" : "weakens"} during this period.
                          Average seasonal gain: {Math.floor(Math.random() * 15) + 5}%
                        </p>
                      </div>
                    ))}
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
