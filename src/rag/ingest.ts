import 'dotenv/config'
import { Index as UpstashIndex } from '@upstash/vector'
import { parse } from 'csv-parse/sync'
import fs from 'fs'
import path from 'path'
import ora from 'ora'

const index = new UpstashIndex()

const indexMovieData = async () => {
  const spinner = ora('Reading movie data/..').start()
  const csvPath = path.join(process.cwd(), 'src/rag/imdb_movie_dataset.csv')
  const csvData = fs.readFileSync(csvPath, 'utf-8')
  const records = parse(csvData, {
    skip_empty_lines: true,
    columns: true,
  })

  spinner.text = 'Starting Movie Indexing...'
  for (const record of records) {
    spinner.text = `Indexing movie ${record.Title}...`

    const text = `${record.Title}. ${record.Genre}. 
    ${record.Description}.`

    try {
      index.upsert({
        id: record.Title,
        data: text,
        metadata: {
          title: record.Title,
          year: Number(record.Year),
          genre: record.Genre,
          actors: record.Actors,
          rating: Number(record.Rating),
          votes: Number(record.Votes),
          revenue: Number(record.Revenue),
          metascore: Number(record.Metascore),
        },
      })
    } catch (err) {
      spinner.fail(`Error indexing movie ${record.Title}`)
      console.error(err)
    }
  }
  spinner.succeed(`All movies indexed!`)
}

indexMovieData()
