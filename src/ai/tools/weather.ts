import { z } from 'zod'
import fetch from 'node-fetch'

export const getWeather = async (
  latitude: number = 26.2006,
  longitude: number = 92.9376
) => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
  )
  const data: any = await response.json()

  const result =
    String(data.current.temperature_2m) +
    '°C' +
    ' and ' +
    String(data.current.wind_speed_10m) +
    'm/s' +
    ' wind speed'

  return result
}

export const weatherTool = {
  name: 'get_weather',
  description: 'use this to get the weather',
  parameters: z.object({
    reasoning: z.string().describe('Why did you pick this tool?'),
  }),
}

z
