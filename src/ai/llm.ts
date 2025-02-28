import { systemPrompt as defaultSystemPrompt } from './../systemPrompt'
import { zodFunction, zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'
import type { AIMessage } from '../types.ts'
import { openAI } from './ai.ts'
import { getSummary } from './memory.ts'
import { model } from './ai'

export const runLLM = async ({
  messages,
  tools = [],
  temperature = 0.1,
  systemPrompt,
}: {
  messages: AIMessage[]
  tools?: any[]
  temperature?: number
  systemPrompt?: string
}) => {
  const formattedTools = tools.map(zodFunction)
  const summary = await getSummary()
  const response = await openAI.chat.completions.create({
    model,
    temperature,
    messages: [
      {
        role: 'system',
        content: `${
          systemPrompt || defaultSystemPrompt
        }. Conversation so far : ${summary}`,
      },
      ...messages,
    ],
    ...(formattedTools.length > 0 && {
      tools: formattedTools,
      tool_choice: 'auto',
      parallel_tool_calls: true,
    }),
  })

  return response.choices[0].message
}

export const runApprovalCheck = async (userMessage: string) => {
  const response = await openAI.beta.chat.completions.parse({
    model,
    messages: [
      {
        role: 'system',
        content:
          'Determine if the user approved the image generation. If you are not sure, then it is not approved.',
      },
      { role: 'user', content: userMessage },
    ],
    temperature: 0.1,
    response_format: zodResponseFormat(
      z.object({
        approved: z
          .boolean()
          .describe('did the user approved this action or not?'),
      }),
      'approval'
    ),
  })

  return response.choices[0].message.parsed?.approved
}

export const summarizeMessages = async (messages: AIMessage[]) => {
  const response = await runLLM({
    messages,
    systemPrompt: `Your job is to summarize the key points of the conversation in a concise way that would be helpful as context for future interactions with an LLM. Make it like a play by play of the conversation.`,
    temperature: 0.3,
  })

  return response.content || ''
}
