import { runLLM } from '../../ai/llm'
import {
  dadJokeToolDefinition,
  generateImageToolDefinition,
  locationToolDefinition,
  redditToolDefinition,
  weatherToolDefinition,
} from '../../ai/tools'
import { createToolCallMessage, runEval } from '../evalTools'
import { ToolCallMatch } from '../scorers'

const allTools = [
  dadJokeToolDefinition,
  redditToolDefinition,
  weatherToolDefinition,
  locationToolDefinition,
  generateImageToolDefinition,
]

runEval('allTools', {
  task: (input) =>
    runLLM({
      messages: [{ role: 'user', content: input }],
      tools: allTools,
    }),
  data: [
    {
      input: 'make me laugh',
      expected: createToolCallMessage(dadJokeToolDefinition.name),
    },
    {
      input: 'give me a cute cat picture ',
      expected: createToolCallMessage(generateImageToolDefinition.name),
    },
    {
      input: 'what is a famous hatsune miku song?',
      expected: createToolCallMessage(redditToolDefinition.name),
    },
    {
      input: 'what is the weather like in Osaka lat: 0.9 long 0.44?',
      expected: createToolCallMessage(weatherToolDefinition.name),
    },
    {
      input: 'what is a famous location next to Mount Fuji',
      expected: createToolCallMessage(locationToolDefinition.name),
    },
  ],
  scorers: [ToolCallMatch],
})
