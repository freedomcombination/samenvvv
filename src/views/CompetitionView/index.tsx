import { Box } from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Container, Layout, Markdown } from '@components'
import { useData } from '@hooks'

interface CompetitionProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

const CompetitionView = ({ slug, source }: CompetitionProps): JSX.Element => {
  const { locale } = useRouter()
  const [mainSlug, currentSlug] = slug[locale as string]

  const { data } = useData<CompetitionType[]>('competitions', {
    slug: currentSlug,
    locale,
  })

  const competition = data?.[0]

  if (!competition) return <Box>Page not found</Box>

  return (
    <Layout>
      <Container>
        <h1>{competition?.title}</h1>
        {source && <Markdown source={source} />}
        {competition?.applications?.map(application => (
          <Box key={application.id} p={4} boxShadow="lg">
            <Link href={`/${mainSlug}/${currentSlug}/${application.slug}`}>
              {application.title}
            </Link>
          </Box>
        ))}
      </Container>
    </Layout>
  )
}

export default CompetitionView
