import { JSONFilePreset } from 'lowdb/node'
import { v4 as uuidv4 } from 'uuid'
import type { AIMessage } from '../types'

export type MessageWithMetadata = AIMessage & {
  id: string
  createdAt: string
}

type Data = {
  messages: MessageWithMetadata[]
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
}

export const getDb = async () => {
  const db = await JSONFilePreset<Data>('db.json', defaultData)
  return db
}

export const addMessages = async (messages: AIMessage[]) => {
  const db = await getDb()
  db.data.messages.push(...messages.map(addMetadata))
  await db.write()
}

export const getMessages = async (): Promise<AIMessage[]> => {
  const db = await getDb()
  return db.data.messages.map(removeMetadata)
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
