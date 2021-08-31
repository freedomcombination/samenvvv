import { Box } from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useData } from '@hooks'

const Markdown = dynamic(() => import('../../components/Markdown'))
interface CompetitionsProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

export const MainCompetitionsView = ({
  slug,
  source,
}: CompetitionsProps): JSX.Element => {
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
      {page?.[0].competitions?.map(competition => (
        <Box key={competition.id} p={4} boxShadow="lg">
          <Link href={`/${currentSlug}/${competition.slug}`}>
            {competition.title}
          </Link>
        </Box>
      ))}
    </div>
  )
}
