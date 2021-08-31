import { Box } from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useData } from '@hooks'

const Markdown = dynamic(() => import('../../components/Markdown'))
interface MainViewProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

export const MainView = ({ slug, source }: MainViewProps): JSX.Element => {
  const { locale } = useRouter()
  const currentSlug = slug[locale as string][0]

  const { data: page } = useData<PageType[]>('pages', {
    slug: currentSlug,
    locale,
  })

  return (
    <div>
      <h1>{page?.[0].title}</h1>
      <Markdown source={source} />
      {page?.[0].subpages?.map(subpage => (
        <Box key={subpage.id} p={4} boxShadow="lg">
          <Link href={`/${currentSlug}/${subpage.slug}`}>{subpage.title}</Link>
        </Box>
      ))}
    </div>
  )
}
