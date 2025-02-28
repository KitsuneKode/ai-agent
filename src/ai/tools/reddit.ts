import type { ToolFn } from '../../types'
import fetch from 'node-fetch'
import { z } from 'zod'

export const redditToolDefinition = {
  name: 'reddit',
  parameters: z.object({
    subreddit: z
      .string()
      .describe(
        'Get the subreddit name to find the information. One word or combination of words in one word that might be the subreddit name. Choose the most relevant subreddit name'
      ),
  }),
  description:
    'get the latest and all reddit post, photos. information.  forums, discussion from all subreddit. Use this to get information on music, anime, or other related things',
}

type Args = z.infer<typeof redditToolDefinition.parameters>

export const reddit: ToolFn<Args, string> = async ({ toolArgs }) => {
  const subreddit = toolArgs.subreddit
    ? `${encodeURIComponent(`r/${toolArgs.subreddit}/`)}`
    : ``
  const { data }: any = await fetch(
    `https://www.reddit.com/${subreddit}.json`
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
