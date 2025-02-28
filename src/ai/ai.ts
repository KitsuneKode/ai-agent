import OpenAI from 'openai'

export const openAI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY!,
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
})

export const model = 'gemini-1.5-pro'
