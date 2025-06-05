"use client"

import { useState, useEffect, useRef } from "react"
import { showToast } from "@/lib/toast-utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mic, MicOff, Volume2, VolumeX, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface VoiceCommand {
  id: string
  command: string
  response: string
  timestamp: string
  confidence: number
  action?: string
  status: "completed" | "pending" | "failed"
}

interface QuickCommand {
  phrase: string
  description: string
  category: string
  example: string
}

export default function VoiceAssistantPage() {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [currentCommand, setCurrentCommand] = useState("")
  const [commandHistory, setCommandHistory] = useState<VoiceCommand[]>([])
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [selectedVoice, setSelectedVoice] = useState("female")
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Initialize sample command history
    const sampleHistory: VoiceCommand[] = [
      {
        id: "cmd-001",
        command: "Show me the weather forecast for tomorrow",
        response: "Tomorrow's forecast shows partly cloudy skies with a high of 78°F and 20% chance of rain.",
        timestamp: new Date(Date.now() - 300000).toISOString(),
        confidence: 95,
        action: "weather_check",
        status: "completed",
      },
      {
        id: "cmd-002",
        command: "Start irrigation in field A",
        response: "Irrigation system activated in Field A. Estimated duration: 45 minutes.",
        timestamp: new Date(Date.now() - 600000).toISOString(),
        confidence: 98,
        action: "irrigation_start",
        status: "completed",
      },
      {
        id: "cmd-003",
        command: "Check soil moisture levels",
        response: "Current soil moisture: Field A - 65%, Field B - 58%, Field C - 72%. All within optimal range.",
        timestamp: new Date(Date.now() - 900000).toISOString(),
        confidence: 92,
        action: "sensor_check",
        status: "completed",
      },
    ]

    setCommandHistory(sampleHistory)

    // Initialize speech recognition if available
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = "en-US"

      recognitionRef.current.onstart = () => {
        setIsListening(true)
      }

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setCurrentCommand(transcript)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
        if (currentCommand.trim()) {
          processVoiceCommand(currentCommand)
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        setIsListening(false)
        showToast.error("Speech recognition error: " + event.error)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [currentCommand])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setCurrentCommand("")
      recognitionRef.current.start()
    } else {
      showToast.error("Speech recognition not supported in this browser")
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }

  const processVoiceCommand = async (command: string) => {
    const newCommand: VoiceCommand = {
      id: `cmd-${Date.now()}`,
      command: command,
      response: "",
      timestamp: new Date().toISOString(),
      confidence: Math.floor(Math.random() * 20) + 80,
      status: "pending",
    }

    setCommandHistory([newCommand, ...commandHistory])

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate response based on command
    let response = ""
    let action = ""

    if (command.toLowerCase().includes("weather")) {
      response = "Current weather is 75°F with partly cloudy skies. Tomorrow expects 78°F with 20% chance of rain."
      action = "weather_check"
    } else if (command.toLowerCase().includes("irrigation")) {
      response = "Irrigation system has been activated. Water flow rate is optimal at 2.5 gallons per minute."
      action = "irrigation_control"
    } else if (command.toLowerCase().includes("soil") || command.toLowerCase().includes("moisture")) {
      response = "Soil moisture levels: Field A - 65%, Field B - 58%, Field C - 72%. All within optimal range."
      action = "sensor_check"
    } else if (command.toLowerCase().includes("crop") || command.toLowerCase().includes("health")) {
      response =
        "Crop health analysis shows 92% of crops in excellent condition. 5% require attention in the northeast section."
      action = "crop_analysis"
    } else if (command.toLowerCase().includes("harvest")) {
      response = "Optimal harvest time for Field B is in 5 days based on current growth metrics and weather forecast."
      action = "harvest_planning"
    } else {
      response = "I'm sorry, I couldn't understand that command. Please try again."
      action = "unknown_command"
    }

    // Update command with response
    const updatedCommand = {
      ...newCommand,
      response: response,
      action: action,
      status: action === "unknown_command" ? "failed" : "completed",
    }

    setCommandHistory((prevHistory) => prevHistory.map((cmd) => (cmd.id === newCommand.id ? updatedCommand : cmd)))

    // Speak response if voice is enabled
    if (voiceEnabled) {
      speakResponse(response)
    }
  }

  const speakResponse = (text: string) => {
    if ("speechSynthesis" in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)

      // Set voice based on preference
      const voices = window.speechSynthesis.getVoices()
      const preferredVoice = voices.find((voice) =>
        selectedVoice === "female" ? voice.name.includes("Female") : voice.name.includes("Male"),
      )

      if (preferredVoice) {
        utterance.voice = preferredVoice
      }

      utterance.onend = () => {
        setIsSpeaking(false)
      }

      window.speechSynthesis.speak(utterance)
    }
  }

  const toggleVoiceOutput = () => {
    setVoiceEnabled(!voiceEnabled)
    showToast.success(`Voice output ${!voiceEnabled ? "enabled" : "disabled"}`)
  }

  const changeVoice = (value: string) => {
    setSelectedVoice(value)
    showToast.success(`Voice set to ${value}`)
  }

  const quickCommands: QuickCommand[] = [
    {
      phrase: "Check weather forecast",
      description: "Get current and upcoming weather information",
      category: "Weather",
      example: "What's the weather like today?",
    },
    {
      phrase: "Start irrigation",
      description: "Activate irrigation systems in specified fields",
      category: "Irrigation",
      example: "Start irrigation in Field A",
    },
    {
      phrase: "Check soil moisture",
      description: "Get soil moisture readings from sensors",
      category: "Sensors",
      example: "What are the soil moisture levels?",
    },
    {
      phrase: "Analyze crop health",
      description: "Get crop health status and recommendations",
      category: "Crops",
      example: "How healthy are my crops?",
    },
    {
      phrase: "Plan harvest",
      description: "Get optimal harvest timing recommendations",
      category: "Planning",
      example: "When should I harvest Field B?",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "pending":
        return <Clock className="h-5 w-5 text-amber-500" />
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Voice Assistant</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Voice Command Center</CardTitle>
              <CardDescription>Speak commands to control your farm operations</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-10">
              <div className="relative mb-8">
                <div
                  className={`w-32 h-32 rounded-full flex items-center justify-center transition-all ${isListening ? "bg-green-100 animate-pulse" : "bg-gray-100"}`}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`w-24 h-24 rounded-full ${isListening ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-200 hover:bg-gray-300"}`}
                    onClick={isListening ? stopListening : startListening}
                  >
                    {isListening ? <MicOff className="h-12 w-12" /> : <Mic className="h-12 w-12" />}
                  </Button>
                </div>
                {isListening && (
                  <div className="absolute -bottom-8 w-full text-center">
                    <p className="text-sm font-medium text-green-600">Listening...</p>
                  </div>
                )}
              </div>

              <div className="w-full max-w-md text-center">
                <p className="text-lg font-medium mb-2">{currentCommand || "Tap the microphone and speak a command"}</p>
                <p className="text-sm text-gray-500">
                  {isListening ? "I'm listening..." : 'Try saying: "Check weather forecast"'}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={toggleVoiceOutput} className="flex items-center space-x-2">
                  {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  <span>{voiceEnabled ? "Mute" : "Unmute"}</span>
                </Button>
                <div className="flex items-center space-x-2">
                  <Switch checked={voiceEnabled} onCheckedChange={toggleVoiceOutput} id="voice-toggle" />
                  <label htmlFor="voice-toggle" className="text-sm">
                    Voice Response
                  </label>
                </div>
              </div>
              <Select value={selectedVoice} onValueChange={changeVoice}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="female">Female Voice</SelectItem>
                  <SelectItem value="male">Male Voice</SelectItem>
                </SelectContent>
              </Select>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Command History</CardTitle>
              <CardDescription>Recent voice commands and responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commandHistory.length > 0 ? (
                  commandHistory.map((cmd) => (
                    <div key={cmd.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          {getStatusIcon(cmd.status)}
                          <span className="ml-2 font-medium">{cmd.command}</span>
                        </div>
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2">
                            {cmd.action?.replace("_", " ")}
                          </Badge>
                          <span className="text-xs text-gray-500">{formatTimestamp(cmd.timestamp)}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 ml-7">{cmd.response}</p>
                      <div className="flex justify-end mt-2">
                        <span className="text-xs text-gray-500">Confidence: {cmd.confidence}%</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">No command history yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Commands</CardTitle>
              <CardDescription>Popular voice commands you can use</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="weather">Weather</TabsTrigger>
                  <TabsTrigger value="farm">Farm</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="space-y-4">
                  {quickCommands.map((cmd, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <h4 className="font-medium">{cmd.phrase}</h4>
                      <p className="text-sm text-gray-600 mt-1">{cmd.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="outline">{cmd.category}</Badge>
                        <span className="text-xs text-gray-500 italic">"{cmd.example}"</span>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="weather" className="space-y-4">
                  {quickCommands
                    .filter((cmd) => cmd.category === "Weather")
                    .map((cmd, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <h4 className="font-medium">{cmd.phrase}</h4>
                        <p className="text-sm text-gray-600 mt-1">{cmd.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <Badge variant="outline">{cmd.category}</Badge>
                          <span className="text-xs text-gray-500 italic">"{cmd.example}"</span>
                        </div>
                      </div>
                    ))}
                </TabsContent>
                <TabsContent value="farm" className="space-y-4">
                  {quickCommands
                    .filter((cmd) => cmd.category !== "Weather")
                    .map((cmd, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <h4 className="font-medium">{cmd.phrase}</h4>
                        <p className="text-sm text-gray-600 mt-1">{cmd.description}</p>
                        <div className="flex justify-between items-center mt-2">
                          <Badge variant="outline">{cmd.category}</Badge>
                          <span className="text-xs text-gray-500 italic">"{cmd.example}"</span>
                        </div>
                      </div>
                    ))}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-gray-500">
                Voice commands work best in a quiet environment. Speak clearly and use natural language.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
