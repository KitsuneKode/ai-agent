export * from './generateImage'
export * from './reddit'
export * from './dadJoke'
export * from './location'
export * from './weather'

import { generateImageToolDefinition } from './generateImage'
import { redditToolDefinition } from './reddit'
import { dadJokeToolDefinition } from './dadJoke'
import { locationToolDefinition } from './location'
import { weatherToolDefinition } from './weather'

export const tools = [
  generateImageToolDefinition,
  redditToolDefinition,
  dadJokeToolDefinition,
  locationToolDefinition,
  weatherToolDefinition,
]
