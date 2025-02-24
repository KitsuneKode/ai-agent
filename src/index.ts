import 'dotenv/config'
import { runAgent } from './ai/agent.ts'
import { tools } from './ai/tools/index.ts'

const userMessage = process.argv[2]

if (!userMessage) {
  process.exit(1)
}

await runAgent({ userMessage, tools })
