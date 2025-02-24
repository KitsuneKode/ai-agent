import { systemPrompt } from '../systemPrompt.ts'
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
    model: 'gemini-1.5-flash',
    temperature: 0.1,
    messages: [{ role: 'system', content: systemPrompt }, ...messages],
    tools: formattedTools,
    tool_choice: 'auto',
    parallel_tool_calls: false,
  })

  return response.choices[0].message
}
