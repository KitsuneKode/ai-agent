export * from './dadJoke'
export * from './generateImage'
export * from './location'
export * from './movieSearch'
export * from './reddit'
export * from './weather'

import { dadJokeToolDefinition } from './dadJoke'
import { generateImageToolDefinition } from './generateImage'
import { locationToolDefinition } from './location'
import { movieSearchToolDefinition } from './movieSearch'
import { redditToolDefinition } from './reddit'
import { weatherToolDefinition } from './weather'

export const tools = [
  generateImageToolDefinition,
  redditToolDefinition,
  dadJokeToolDefinition,
  locationToolDefinition,
  weatherToolDefinition,
  movieSearchToolDefinition,
]
