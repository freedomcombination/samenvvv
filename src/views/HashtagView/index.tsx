import { Box } from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Markdown } from '@components'
import { useData } from '@hooks'

interface HashtagProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

const HashtagView = ({ slug, source }: HashtagProps): JSX.Element => {
  const { locale } = useRouter()
  const [mainSlug, currentSlug] = slug[locale as string]

  const { data } = useData<HashtagType[]>('hashtags', {
    slug: currentSlug,
    locale,
  })

  const hashtag = data?.[0]

  if (!hashtag) return <Box>Page not found</Box>

  return (
    <div>
      <h1>{hashtag?.title}</h1>
      {source && <Markdown source={source} />}
      {hashtag?.posts?.map(post => (
        <Box key={post.id} p={4} boxShadow="lg">
          <Link href={`/${mainSlug}/${currentSlug}/${post.slug}`}>
            {post.text}
          </Link>
        </Box>
      ))}
    </div>
  )
}

export default HashtagView
