import { Box, Heading } from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { useData } from '@hooks'

const Markdown = dynamic(() => import('../../components/Markdown'))

interface SubViewProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

export const SubView = ({ slug, source }: SubViewProps): JSX.Element => {
  const { locale } = useRouter()
  const [, currentSlug] = slug[locale as string]

  const { data: subpage } = useData<SubpageType[]>('subpages', {
    slug: currentSlug,
    locale,
  })

  return (
    <Box>
      <Heading>{subpage?.[0].title}</Heading>
      <Markdown source={source} />
    </Box>
  )
}
