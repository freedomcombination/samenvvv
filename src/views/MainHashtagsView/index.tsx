import { Box } from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Markdown } from '@components'
import { useData } from '@hooks'

interface MainHashtagsProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

const MainHashtagsView = ({ slug, source }: MainHashtagsProps): JSX.Element => {
  const { locale } = useRouter()
  const currentSlug = slug[locale as string][0]

  const { data: page } = useData<PageType[]>('pages', {
    slug: currentSlug,
    locale,
  })

  const hashtagsPage = page?.[0]

  if (!hashtagsPage) return <Box>Page not found</Box>

  return (
    <div>
      <h1>{hashtagsPage.title}</h1>
      {source && <Markdown source={source} />}
      {hashtagsPage.hashtags?.map(hashtag => (
        <Box key={hashtag.id} p={4} boxShadow="lg">
          <Link href={`/${currentSlug}/${hashtag.slug}`}>{hashtag.title}</Link>
        </Box>
      ))}
    </div>
  )
}

export default MainHashtagsView
