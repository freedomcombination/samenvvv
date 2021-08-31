import { Box } from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useData } from '@hooks'

const Markdown = dynamic(() => import('../../components/Markdown'))

interface HashtagsProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

export const MainHashtagsView = ({
  slug,
  source,
}: HashtagsProps): JSX.Element => {
  const { locale } = useRouter()
  const currentSlug = slug[locale!][0]

  const { data: page } = useData<PageType[]>('pages', {
    slug: currentSlug,
    locale,
  })

  return (
    <div>
      <h1>{page?.[0].title}</h1>
      <Markdown source={source} />
      {page?.[0].hashtags?.map(hashtag => (
        <Box key={hashtag.id} p={4} boxShadow="lg">
          <Link href={`/${currentSlug}/${hashtag.slug}`}>{hashtag.title}</Link>
        </Box>
      ))}
    </div>
  )
}
