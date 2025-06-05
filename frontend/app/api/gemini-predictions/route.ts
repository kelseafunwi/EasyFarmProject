import { type NextRequest, NextResponse } from "next/server"

// This will be the API route for Gemini AI integration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { location, farmType, cropType, predictionType, customQuery } = body

    // Validate required fields
    if (!location) {
      return NextResponse.json({ error: "Location is required" }, { status: 400 })
    }

    // Get Gemini API key from environment variables
    const geminiApiKey = process.env.GEMINI_API_KEY

    if (!geminiApiKey) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 })
    }

    // Construct the prompt based on prediction type and location
    let prompt = ""

    if (customQuery) {
      prompt = `As an agricultural AI expert, answer this farming question for a farm located in ${location}: ${customQuery}. 
      Consider local climate, soil conditions, and farming practices. Provide specific, actionable advice.`
    } else {
      switch (predictionType) {
        case "crop-yield":
          prompt = `Analyze and predict crop yields for a ${farmType} farm in ${location} growing ${cropType}. 
          Consider current weather patterns, soil conditions, historical data, and seasonal factors. 
          Provide specific yield predictions, confidence levels, and actionable recommendations.`
          break
        case "weather-impact":
          prompt = `Analyze weather impact on farming operations for a ${farmType} farm in ${location}. 
          Predict upcoming weather challenges, risks, and opportunities. Include drought risk, frost risk, 
          and optimal timing for farming activities.`
          break
        case "pest-disease":
          prompt = `Predict pest and disease risks for ${cropType} crops in ${location}. 
          Consider seasonal patterns, weather conditions, and local pest populations. 
          Provide prevention strategies and treatment recommendations.`
          break
        case "market-trends":
          prompt = `Analyze market trends and price predictions for ${cropType} in the ${location} region. 
          Consider supply and demand factors, seasonal variations, and economic indicators. 
          Provide selling recommendations and market timing advice.`
          break
        default:
          prompt = `Provide general farming insights and recommendations for a ${farmType} farm in ${location}.`
      }
    }

    // Call Gemini AI API
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      },
    )

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API error: ${geminiResponse.status}`)
    }

    const geminiData = await geminiResponse.json()

    // Extract the generated text from Gemini response
    const generatedText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated"

    // Parse the response and structure it for the frontend
    // This is a simplified parser - you might want to make it more sophisticated
    const predictions = parseGeminiResponse(generatedText, predictionType)

    return NextResponse.json({
      success: true,
      predictions,
      rawResponse: generatedText,
    })
  } catch (error) {
    console.error("Gemini API error:", error)
    return NextResponse.json({ error: "Failed to generate predictions" }, { status: 500 })
  }
}

// Helper function to parse Gemini response into structured predictions
function parseGeminiResponse(text: string, predictionType: string) {
  // This is a simplified parser - you can make it more sophisticated
  // to extract specific data points from the AI response

  const predictions = [
    {
      type: predictionType.split("-")[0],
      title: `AI Analysis - ${predictionType.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}`,
      confidence: Math.floor(Math.random() * 20) + 75, // Random confidence between 75-95%
      description: text.substring(0, 200) + "...",
      recommendations: extractRecommendations(text),
      timeframe: getTimeframeFromType(predictionType),
      priority: determinePriority(text),
    },
  ]

  return predictions
}

function extractRecommendations(text: string): string[] {
  // Simple extraction of recommendations from text
  // Look for bullet points, numbered lists, or sentences with action words
  const sentences = text.split(/[.!?]+/)
  const recommendations = sentences
    .filter(
      (sentence) =>
        sentence.includes("recommend") ||
        sentence.includes("should") ||
        sentence.includes("consider") ||
        sentence.includes("apply") ||
        sentence.includes("monitor"),
    )
    .slice(0, 4)
    .map((rec) => rec.trim())
    .filter((rec) => rec.length > 10)

  return recommendations.length > 0
    ? recommendations
    : [
        "Monitor conditions regularly",
        "Follow best farming practices",
        "Consult with local agricultural experts",
        "Keep detailed records for future reference",
      ]
}

function getTimeframeFromType(predictionType: string): string {
  switch (predictionType) {
    case "crop-yield":
      return "Next 2-3 months"
    case "weather-impact":
      return "Next 4-6 weeks"
    case "pest-disease":
      return "Next 2-4 weeks"
    case "market-trends":
      return "Next 1-3 months"
    default:
      return "Next month"
  }
}

function determinePriority(text: string): "high" | "medium" | "low" {
  const urgentWords = ["urgent", "critical", "immediate", "danger", "risk"]
  const mediumWords = ["important", "consider", "monitor", "attention"]

  const lowerText = text.toLowerCase()

  if (urgentWords.some((word) => lowerText.includes(word))) {
    return "high"
  } else if (mediumWords.some((word) => lowerText.includes(word))) {
    return "medium"
  } else {
    return "low"
  }
}
