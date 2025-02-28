import { JSONFilePreset } from 'lowdb/node'
import { v4 as uuidv4 } from 'uuid'
import type { AIMessage } from '../types'
import { summarizeMessages } from './llm'

export type MessageWithMetadata = AIMessage & {
  id: string
  createdAt: string
}

type Data = {
  messages: MessageWithMetadata[]
  summary: string
}

export const addMetadata = (message: AIMessage): MessageWithMetadata => {
  return {
    id: uuidv4(),
    ...message,
    createdAt: new Date().toISOString(),
  }
}

export const removeMetadata = (message: MessageWithMetadata): AIMessage => {
  const { id, createdAt, ...rest } = message
  return rest
}

const defaultData: Data = {
  messages: [],
  summary: '',
}

export const getDb = async () => {
  const db = await JSONFilePreset<Data>('db.json', defaultData)
  return db
}

export const addMessages = async (messages: AIMessage[]) => {
  const db = await getDb()
  db.data.messages.push(...messages.map(addMetadata))

  if (db.data.messages.length >= 15) {
    const oldestMessages = db.data.messages.slice(0, 12).map(removeMetadata)
    const summary = await summarizeMessages(oldestMessages)
    db.data.summary = summary
  }

  await db.write()
}

export const getMessages = async (): Promise<AIMessage[]> => {
  const db = await getDb()
  const messages = db.data.messages.map(removeMetadata)

  const lastEight = messages.slice(-8)

  if (lastEight[0]?.role === 'tool') {
    const ninthMessage = messages[messages.length - 9]

    if (ninthMessage) {
      return [ninthMessage, ...lastEight]
    }
  }

  return lastEight
}

export const saveToolResponse = async (
  toolCallId: string,
  toolCallResponse: string
) => {
  return await addMessages([
    {
      role: 'tool',
      content: toolCallResponse,
      tool_call_id: toolCallId,
    },
  ])
}

export const getSummary = async (): Promise<string> => {
  const db = await getDb()
  return db.data.summary
}
