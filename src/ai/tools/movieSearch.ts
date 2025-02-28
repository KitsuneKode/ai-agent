import { z } from 'zod'
import type { ToolFn } from '../../types'
import { queryMovies } from '../../rag/query'

export const movieSearchToolDefinition = {
  name: 'movieSearch',
  parameters: z.object({
    query: z
      .string()
      .describe('The search query used to vector search on movies'),
    genre: z.string().optional().describe('Filter movies by genre'),
    director: z.string().optional().describe('Filter movies by director'),
  }),
  description:
    'Use this tool to search for movies or answer questions about them and their metadata including title, year, genre, director, actors, rating, and description.',
}

type Args = z.infer<typeof movieSearchToolDefinition.parameters>

export const movieSearch: ToolFn<Args, string> = async ({
  userMessage,
  toolArgs,
}) => {
  const { query, genre, director } = toolArgs

  const filters = {
    ...(genre && { genre }),
    ...(director && { director }),
  }

  let results
  try {
    results = await queryMovies({
      query,
      filters,
    })
  } catch (err) {
    console.error(err)
    return `Error: Could not quey the db to get movies`
  }

  const formattedResults = results.map((result) => {
    const { metadata, data } = result
    return { ...metadata, description: data }
  })
  return JSON.stringify(formattedResults)
}
