import { Box } from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Markdown } from '@components'
import { useData } from '@hooks'

interface CompetitionsProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

const MainCompetitionsView = ({
  slug,
  source,
}: CompetitionsProps): JSX.Element => {
  const { locale } = useRouter()
  const currentSlug = slug[locale as string][0]

  const { data } = useData<PageType[]>('pages', {
    slug: currentSlug,
    locale,
  })

  const competitionsPage = data?.[0]

  if (!competitionsPage) return <Box>Page not found</Box>

  return (
    <div>
      <h1>{competitionsPage.title}</h1>
      {source && <Markdown source={source} />}
      {competitionsPage.competitions?.map(competition => (
        <Box key={competition.id} p={4} boxShadow="lg">
          <Link href={`/${currentSlug}/${competition.slug}`}>
            {competition.title}
          </Link>
        </Box>
      ))}
    </div>
  )
}

export default MainCompetitionsView
