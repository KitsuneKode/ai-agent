import { textToImage } from '@huggingface/inference'
import fs from 'fs'
import { z } from 'zod'
import type { ToolFn } from '../../types'
import fetch from 'node-fetch'
import { pathToFileURL } from 'bun'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const accessToken = process.env.HF_ACCESS_TOKEN!

// // Convert the blob to a buffer and save it
// const buffer = await response.arrayBuffer()
// fs.writeFileSync(path.join(__dirname, 'image.jpg'), Buffer.from(buffer))

export const generateImageToolDefinition = {
  name: 'generate_image',
  parameters: z.object({
    prompt: z
      .string()
      .describe(
        `prompt for the image. Be sure to consider the user's original message when making the prompt. If unsure, then ask the user to provide more details. Return the image in markdown format`
      ),
  }),
  description: 'generate an image',
}

type Args = z.infer<typeof generateImageToolDefinition.parameters>

export const generateImage: ToolFn<Args, string> = async ({
  toolArgs,
  userMessage,
}) => {
  //  Hugging Face version
  // const response = await textToImage(
  //   {
  //     model: 'black-forest-labs/FLUX.1-dev',
  //     provider: 'black-forest-labs',
  //     accessToken,
  //     inputs: 'cute cats',
  //     parameters: {
  //       height: 256,
  //       width: 256,
  //       num_inference_steps: 4,
  //       seed: 8817,
  //     },
  //   },
  //   { outputType: 'url' }
  // )

  const response = await textToImagePollinationAI({
    prompt: toolArgs.prompt,
  })

  return response.url
}

export const textToImagePollinationAI = async ({
  model = 'flux',
  prompt,
  height = 1024,
  width = 1024,
  seed = 8817,
}: {
  model?: 'flux' | 'turbo'
  prompt: string
  height?: number
  width?: number
  seed?: number
}) => {
  const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(
    prompt
  )}?width=${width}&height=${height}&seed=${seed}&model=${model}`

  await downloadImage(imageUrl)

  return { url: imageUrl }
}

export const downloadImage = async (imageUrl: string) => {
  const imageBuffer = await fetch(imageUrl).then((res) => res.arrayBuffer())

  const __dirname = pathToFileURL('.').pathname

  const imageName = `image${uuidv4()}.png`

  fs.writeFile(
    path.join(__dirname, `/images/${imageName}`),
    Buffer.from(imageBuffer),
    (err) => {
      if (err) console.error(err)
    }
  )
}
