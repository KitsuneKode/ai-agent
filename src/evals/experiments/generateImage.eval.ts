import { runLLM } from '../../ai/llm'
import { generateImageToolDefinition } from '../../ai/tools'
import { createToolCallMessage, runEval } from '../evalTools'
import { ToolCallMatch } from '../scorers'

runEval('generateImage', {
  task: (input) =>
    runLLM({
      messages: [{ role: 'user', content: input }],
      tools: [generateImageToolDefinition],
    }),
  data: [
    {
      input: 'give me a cat photo',
      expected: createToolCallMessage(generateImageToolDefinition.name),
    },
    {
      input: 'give me a cute photograph',
      expected: createToolCallMessage(generateImageToolDefinition.name),
    },
    {
      input: 'get a photo of a boy',
      expected: createToolCallMessage(generateImageToolDefinition.name),
    },
    {
      input: 'take a photo of the bike',
      expected: createToolCallMessage(generateImageToolDefinition.name),
    },
  ],
  scorers: [ToolCallMatch],
})
