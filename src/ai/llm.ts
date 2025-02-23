import { genAI } from './ai.ts'

export const runLLM = async ({ userMessage }: { userMessage: string }) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  //   const result = await model.generateContent({
  //     contents: [{ role: 'user', parts: [{ text: userMessage }] }],
  //     generationConfig: { temperature: 0.1, maxOutputTokens: 1000 },
  //   })
  //   console.log(result.response)
  //   return result.response.text()

  const chat = model.startChat({
    history: [
      {
        role: 'user',
        parts: [{ text: 'Hi, My name is Jacob' }],
      },
      {
        role: 'model',
        parts: [{ text: 'Hello, Great to meet you, Jacob' }],
      },
    ],
  })

  const result = await chat.sendMessage(userMessage)

  return result.response.text()
}
