import { createToolCallMessage, runEval } from '../evalTools'
import { runLLM } from '../../ai/llm'
import { redditToolDefinition } from '../../ai/tools/reddit'
import { ToolCallMatch } from '../scorers'

runEval('reddit', {
  task: (input) =>
    runLLM({
      messages: [{ role: 'user', content: input }],
      tools: [redditToolDefinition],
    }),
  data: [
    {
      input: 'find me the most upvoted Japanese song post in reddit',
      expected: createToolCallMessage(redditToolDefinition.name),
    },
    {
      input: 'find me the cat',
      expected: createToolCallMessage(redditToolDefinition.name),
    },
    {
      input: 'find me cute cat photos',
      expected: createToolCallMessage(redditToolDefinition.name),
    },
  ],
  scorers: [ToolCallMatch],
})
