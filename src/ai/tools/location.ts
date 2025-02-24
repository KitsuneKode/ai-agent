import { z } from 'zod'
import type { ToolFn } from '../../types'
import fetch from 'node-fetch'

const apiKey = process.env.GEO_CODE_API_KEY!

export const locationToolDefinition = {
  name: 'location_coordinates',
  parameters: z.object({
    location: z
      .string()
      .describe(
        'Location name such as city, country, state, etc. Example: Tokyo, Japan, New York, USA, Mumbai, Assam, India. If city or country or state is not given try finding it out or ask the user to provide more details.'
      ),
    reasoning: z.string().describe('Why did you pick this tool?'),
  }),
  description: 'use this to get the coordinated of a location..',
}

type Args = z.infer<typeof locationToolDefinition.parameters>

export const getLocationCoordinates: ToolFn<Args, string> = async ({
  toolArgs,
}) => {
  const response = await fetch(
    `https://geocode.maps.co/search?q=${toolArgs.location}&api_key=${apiKey}&format=json`
  )

  const data: any = await response.json()

  const result = `Coordinated of ${toolArgs.location} are Latitude: ${data[0].lat} and Longitude: ${data[0].lon}`

  return result
}
