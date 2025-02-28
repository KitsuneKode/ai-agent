import { z } from 'zod'
import fetch from 'node-fetch'
import type { ToolFn } from '../../types'

export const weatherToolDefinition = {
  name: 'get_weather',
  parameters: z.object({
    reasoning: z.string().describe('Why did you pick this tool?'),
    latitude: z.number().describe('Latitude of the location'),
    longitude: z.number().describe('Longitude of the location'),
  }),
  description:
    'use this to get the weather details also describe whether it is sunny, rainy, cold, warm, etc. Explain or analyze the weather conditions in brief and also mention whether the weather is hot or cold of a location.',
}

type Args = z.infer<typeof weatherToolDefinition.parameters>

export const getWeather: ToolFn<Args, string> = async ({ toolArgs }) => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${toolArgs.latitude}&longitude=${toolArgs.longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
  )

  const data: any = await response.json()

  const currentWeather = data.current
  const hourlyWeather = data.hourly

  const result = `The current temperature is ${currentWeather.temperature_2m}°C with a wind speed of ${currentWeather.wind_speed_10m} km/h with elevation ${data.elevation}.\nThe hourly forecast indicates a temperature of ${hourlyWeather.temperature_2m}°C, a relative humidity of ${hourlyWeather.relative_humidity_2m}%, and a wind speed of ${hourlyWeather.wind_speed_10m} km/h at ${hourlyWeather.time}.`
  return result
}
