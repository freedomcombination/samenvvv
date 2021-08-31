import { useRouter } from 'next/router'

import { ChakraNextImage } from '@components'
import { useData } from '@hooks'

interface TweetProps {
  slug: Record<string, string[]>
}

export const TweetView = ({ slug }: TweetProps): JSX.Element => {
  const { locale } = useRouter()
  const [, , currentSlug] = slug[locale!]

  const { data } = useData<TweetType[]>('tweets', { slug: currentSlug, locale })

  const tweet = data?.[0]

  if (!tweet) return <div>Not found</div>

  return (
    <div>
      <p>{tweet?.tweet}</p>
      <ChakraNextImage image={tweet.image} />
    </div>
  )
}
