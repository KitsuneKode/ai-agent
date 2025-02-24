import type { AIMessage } from '../types.ts'
import { openAI } from './ai.ts'
import { zodFunction } from 'openai/helpers/zod'

export const runLLM = async ({
  messages,
  tools,
}: {
  messages: AIMessage[]
  tools: any[]
}) => {
  const formattedTools = tools.map(zodFunction)

  const response = await openAI.chat.completions.create({
    model: 'gemini-2.0-pro-exp-02-05',
    temperature: 0.1,
    messages,
    tools: formattedTools,
    tool_choice: 'auto',
    parallel_tool_calls: false,
  })

  return response.choices[0].message
}
