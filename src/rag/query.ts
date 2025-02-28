import 'dotenv/config'
import { Index as UpstashIndex } from '@upstash/vector'

const index = new UpstashIndex()

type MovieMetadata = {
  title?: string
  year?: string
  genre?: string
  director?: string
  actors?: string
  rating?: string
  votes?: string
  revenue?: string
  metascore?: string
}

export const queryMovies = async ({
  query,
  filters,
  topK = 5,
}: {
  query: string
  filters?: MovieMetadata
  topK?: number
}) => {
  return index.query({
    data: query,
    // filter: filters || undefined,
    topK,
    includeMetadata: true,
    includeData: true,
  })
}
