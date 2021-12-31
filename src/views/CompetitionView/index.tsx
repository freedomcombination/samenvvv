import { Box } from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { NextSeoProps } from 'next-seo'

import { Container, Hero, Layout, Markdown } from '@components'

interface CompetitionProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  pageData: ICompetition
  seo: NextSeoProps
  link: string
}

const CompetitionView = ({
  source,
  pageData,
  seo,
}: CompetitionProps): JSX.Element => {
  return (
    <Layout scrollHeight={100} seo={seo}>
      <Hero
        title={pageData.title}
        image={pageData.image}
        isFullHeight={false}
      />
      <Container>
        {source && (
          <Box
            my={4}
            fontSize="md"
            maxW="container.md"
            mx="auto"
            textAlign="center"
          >
            <Markdown source={source} />
          </Box>
        )}
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
