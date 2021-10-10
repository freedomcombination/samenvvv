import { useRouter } from 'next/router'

import { ChakraNextImage } from '@components'
import { useData } from '@hooks'

interface TweetProps {
  slug: Record<string, string[]>
}

const TweetView = ({ slug }: TweetProps): JSX.Element => {
  const { locale } = useRouter()
  const [, , currentSlug] = slug[locale as string]

  const { data } = useData<TweetType[]>('tweets', { slug: currentSlug, locale })

  const tweet = data?.[0]

  if (!tweet) return <div>Tweet not found</div>

  return (
    <div>
      <p>{tweet.tweet}</p>
      {tweet.image && <ChakraNextImage image={tweet.image} />}
    </div>
  )
}

export default TweetView
