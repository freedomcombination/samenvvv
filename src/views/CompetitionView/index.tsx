import { Box } from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

import { Container, Hero, Layout, Markdown } from '@components'

interface CompetitionProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  pageData: ICompetition
}

const CompetitionView = ({
  source,
  pageData,
}: CompetitionProps): JSX.Element => {
  return (
    <Layout scrollHeight={100}>
      <Hero
        title={pageData.title}
        image={pageData.image}
        isFullHeight={false}
      />
      <Container my={8}>
        {source && <Markdown source={source} />}
        {pageData?.applications?.map(application => (
          <Box key={application.id} p={4} boxShadow="lg">
            {application.title}
          </Box>
        ))}
      </Container>
    </Layout>
  )
}

export default CompetitionView
