import { runLLM } from '../../ai/llm'
import { weatherToolDefinition } from '../../ai/tools'
import { createToolCallMessage, runEval } from '../evalTools'
import { ToolCallMatch } from '../scorers'

runEval('weather', {
  task: (input) =>
    runLLM({
      messages: [{ role: 'user', content: input }],
      tools: [weatherToolDefinition],
    }),
  data: [
    {
      input: 'How windy is Osaka today',
      expected: createToolCallMessage(weatherToolDefinition.name),
    },
    {
      input: 'What is the coldest place today',
      expected: createToolCallMessage(weatherToolDefinition.name),
    },
    {
      input: 'what is the weather like in Mohali',
      expected: createToolCallMessage(weatherToolDefinition.name),
    },
  ],
  scorers: [ToolCallMatch],
})
