import type { AIMessage } from '../types'
import { logMessage, showLoader } from '../ui'
import { runApprovalCheck, runLLM } from './llm'
import { addMessages, getMessages, saveToolResponse } from './memory'
import { runTool } from './toolRunner'
import { generateImageToolDefinition } from './tools'

const handleImageApprovalFlow = async (
  history: AIMessage[],
  userMessage: string
) => {
  const lastMessage: AIMessage | any = history.at(-1)
  const toolCall = lastMessage?.tool_calls?.[0]

  if (
    !toolCall ||
    toolCall.function.name !== generateImageToolDefinition.name
  ) {
    return false
  }

  const loader = showLoader('Processing tool...')
  const approved = await runApprovalCheck(userMessage)

  if (approved) {
    loader.update(`Approved & executing tool: ${toolCall.function.name}`)
    const toolCallResponse = await runTool(toolCall, userMessage)

    loader.update(`done: ${toolCall.function.name}`)
    await saveToolResponse(toolCall.id, toolCallResponse)
  } else {
    loader.update(`Approval Denied: ${toolCall.function.name}`)
    await saveToolResponse(
      toolCall.id,
      `User did not approved the permission to generate image this time.`
    )
  }
  loader.stop()

  return true
}

export const runAgent = async ({
  userMessage,
  tools,
}: {
  userMessage: string
  tools: any[]
}) => {
  const history = await getMessages()
  const approved = await handleImageApprovalFlow(history, userMessage)

  if (!approved) await addMessages([{ role: 'user', content: userMessage }])

  const loader = showLoader('Thinking...🤔🤔')

  while (true) {
    const history = await getMessages()
    const response = await runLLM({ messages: history, tools })

    await addMessages([response])

    if (response.content) {
      loader.stop()
      logMessage(response)
      return getMessages()
    }

    if (response.tool_calls) {
      const toolCall = response.tool_calls[0]
      logMessage(response)
      loader.update(`executing : ${toolCall.function.name}`)

      if (toolCall.function.name === generateImageToolDefinition.name) {
        loader.update(`Requesting user approval`)
        loader.stop()
        return getMessages()
      }

      const toolResponse = await runTool(toolCall, userMessage)
      await saveToolResponse(toolCall.id, toolResponse)

      loader.update(`done: ${toolCall.function.name}`)
    }
  }
}
