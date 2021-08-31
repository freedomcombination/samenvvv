import { Box } from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useData } from '@hooks'

const Markdown = dynamic(() => import('../../components/Markdown'))

interface HashtagProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

export const HashtagView = ({ slug, source }: HashtagProps): JSX.Element => {
  const { locale } = useRouter()
  const [mainSlug, currentSlug] = slug[locale!]

  const { data } = useData<HashtagType[]>('hashtags', {
    slug: currentSlug,
    locale,
  })

  const hashtag = data?.[0]

  return (
    <div>
      <h1>{hashtag?.title}</h1>
      {Markdown.name && <Markdown source={source} />}
      {hashtag?.tweets?.map(tweet => (
        <Box key={tweet.id} p={4} boxShadow="lg">
          <Link href={`/${mainSlug}/${currentSlug}/${tweet.slug}`}>
            {tweet.tweet}
          </Link>
        </Box>
      ))}
    </div>
  )
}
