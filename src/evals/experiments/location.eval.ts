import { runLLM } from '../../ai/llm'
import { locationToolDefinition } from '../../ai/tools'
import { createToolCallMessage, runEval } from '../evalTools'
import { ToolCallMatch } from '../scorers'

runEval('location', {
  task: (input) =>
    runLLM({
      messages: [{ role: 'user', content: input }],
      tools: [locationToolDefinition],
    }),
  data: [
    {
      input: 'where is Assam',
      expected: createToolCallMessage(locationToolDefinition.name),
    },
    {
      input: 'What are the coordinates of Osaka',
      expected: createToolCallMessage(locationToolDefinition.name),
    },
    {
      input: 'what is near Mount Fuji',
      expected: createToolCallMessage(locationToolDefinition.name),
    },
  ],
  scorers: [ToolCallMatch],
})
