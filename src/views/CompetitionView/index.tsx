import { Box } from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useData } from '@hooks'

const Markdown = dynamic(() => import('../../components/Markdown'))

interface CompetitionProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

export const CompetitionView = ({
  slug,
  source,
}: CompetitionProps): JSX.Element => {
  const { locale } = useRouter()
  const [mainSlug, currentSlug] = slug[locale!]

  const { data } = useData<CompetitionType[]>('competitions', {
    slug: currentSlug,
    locale,
  })

  const competition = data?.[0]

  return (
    <div>
      <h1>{competition?.title}</h1>
      <Markdown source={source} />
      {competition?.applications?.map(application => (
        <Box key={application.id} p={4} boxShadow="lg">
          <Link href={`/${mainSlug}/${currentSlug}/${application.slug}`}>
            {application.title}
          </Link>
        </Box>
      ))}
    </div>
  )
}
