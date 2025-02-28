import { runLLM } from '../../ai/llm'
import { dadJokeToolDefinition } from '../../ai/tools'
import { createToolCallMessage, runEval } from '../evalTools'
import { ToolCallMatch } from '../scorers'

runEval('dadJoke', {
  task: (input) =>
    runLLM({
      messages: [{ role: 'user', content: input }],
      tools: [dadJokeToolDefinition],
    }),
  data: [
    {
      input: 'hi',
      expected: createToolCallMessage(dadJokeToolDefinition.name),
    },
    {
      input: 'give me a dad joke',
      expected: createToolCallMessage(dadJokeToolDefinition.name),
    },
    {
      input: 'make me laugh',
      expected: createToolCallMessage(dadJokeToolDefinition.name),
    },
  ],
  scorers: [ToolCallMatch],
})
