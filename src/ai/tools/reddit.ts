import type { ToolFn } from '../../types'
import fetch from 'node-fetch'
import { z } from 'zod'

export const redditToolDefinition = {
  name: 'reddit',
  parameters: z.object({}),
  description: 'get the  latest reddit post on r/japanesemusic',
}

type Args = z.infer<typeof redditToolDefinition.parameters>

export const reddit: ToolFn<Args, string> = async ({ toolArgs }) => {
  const { data }: any = await fetch(
    'https://www.reddit.com/r/japanesemusic/.json'
  ).then((res) => res.json())

  const relevantInfo = data.children.map((child: any) => ({
    title: child.data.title,
    link: child.data.link,
    subreddit: child.data.subreddit_name_prefixed,
    author: child.data.author,
    upvotes: child.data.ups,
  }))

  return JSON.stringify(relevantInfo, null, 2)
}
