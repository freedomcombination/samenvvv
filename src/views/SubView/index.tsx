import { Box, Heading } from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { useRouter } from 'next/router'

import { Markdown } from '@components'
import { useData } from '@hooks'

interface SubViewProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

const SubView = ({ slug, source }: SubViewProps): JSX.Element => {
  const { locale } = useRouter()
  const [, currentSlug] = slug[locale as string]

  const { data } = useData<SubpageType[]>('subpages', {
    slug: currentSlug,
    locale,
  })

  const subpage = data?.[0]

  if (!subpage) return <Box>Page not found</Box>

  return (
    <Box>
      <Heading>{subpage.title}</Heading>
      {source && <Markdown source={source} />}
    </Box>
  )
}

export default SubView
