import { cache } from 'react'
import 'server-only'
import { setTimeout } from 'timers/promises'

const fetchData = cache(async (type: string) => {
  await setTimeout(1000);
  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/${type}.json`,
    {
      next: {
        revalidate: 10
      }
    }
  )
  if (res.status !== 200) {
    throw new Error(`Status ${res.status}`)
  }
  return res.json()
});

export default fetchData;
