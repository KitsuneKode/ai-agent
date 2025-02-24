import type OpenAI from 'openai'
import {
  dadJoke,
  dadJokeToolDefinition,
  generateImage,
  generateImageToolDefinition,
  getLocationCoordinates,
  getWeather,
  locationToolDefinition,
  reddit,
  redditToolDefinition,
  weatherToolDefinition,
} from './tools'

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
  }

  switch (toolCall.function.name) {
    case generateImageToolDefinition.name:
      return generateImage(input)

    case dadJokeToolDefinition.name:
      return dadJoke(input)

    case redditToolDefinition.name:
      return reddit(input)

    case locationToolDefinition.name:
      return getLocationCoordinates(input)

    case weatherToolDefinition.name:
      return getWeather(input)

    default:
      return `Never run this tool: ${toolCall.function.name} or else you will be in trouble`
  }
}
