// Utility functions for Gemini AI integration

export interface GeminiPredictionRequest {
  location: string
  farmType?: string
  cropType?: string
  predictionType: string
  customQuery?: string
}

export interface GeminiPredictionResponse {
  success: boolean
  predictions: any[]
  rawResponse?: string
  error?: string
}

export async function generatePredictions(request: GeminiPredictionRequest): Promise<GeminiPredictionResponse> {
  try {
    const response = await fetch("/api/gemini-predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error generating predictions:", error)
    return {
      success: false,
      predictions: [],
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

// Helper function to format location for better AI context
export function formatLocationForAI(location: string): string {
  // Add more context to location if needed
  return location.trim()
}

// Helper function to create farming-specific prompts
export function createFarmingPrompt(
  location: string,
  farmType: string,
  cropType: string,
  predictionType: string,
): string {
  const baseContext = `You are an expert agricultural AI assistant analyzing farming conditions for a ${farmType} farm located in ${location}.`

  const typeSpecificPrompts = {
    "crop-yield": `Predict crop yields for ${cropType} considering:
    - Current and historical weather patterns for ${location}
    - Soil conditions typical for the region
    - Seasonal factors and growing degree days
    - Local farming practices and technology adoption
    Provide specific yield estimates, confidence levels, and actionable recommendations.`,

    "weather-impact": `Analyze weather impact on farming operations considering:
    - Short-term and long-term weather forecasts for ${location}
    - Seasonal weather patterns and climate trends
    - Risk assessment for drought, frost, flooding, and extreme weather
    - Optimal timing for planting, harvesting, and field operations
    Provide specific recommendations for weather-related farming decisions.`,

    "pest-disease": `Predict pest and disease risks for ${cropType} considering:
    - Local pest populations and seasonal cycles in ${location}
    - Weather conditions that favor pest/disease development
    - Historical pest pressure data for the region
    - Integrated pest management strategies
    Provide specific prevention and treatment recommendations.`,

    "market-trends": `Analyze market trends and price predictions for ${cropType} considering:
    - Regional and national supply and demand factors
    - Seasonal price variations for ${location}
    - Economic indicators affecting agricultural markets
    - Transportation and storage considerations
    Provide specific marketing and selling recommendations.`,
  }

  return `${baseContext}\n\n${typeSpecificPrompts[predictionType] || "Provide general farming insights and recommendations."}`
}
