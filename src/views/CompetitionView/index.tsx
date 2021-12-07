import { Box } from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

import { Container, Hero, Layout, Markdown } from '@components'
import { useRouter } from 'next/router'

interface CompetitionProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  pageData: ICompetition
}

const CompetitionView = ({
  source,
  pageData,
}: CompetitionProps): JSX.Element => {
  const { locale } = useRouter()

  return (
    <Layout
      scrollHeight={100}
      seo={{
        title: pageData?.slug as string,
        description: pageData?.title.split('.')[0],
        image:
          `${process.env.NEXT_PUBLIC_ADMIN_URL}${pageData?.image?.url}` as string,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/${pageData?.page?.slug}/${pageData?.slug}`,
        width: pageData?.image?.width as number,
        height: pageData?.image?.height as number,
        type: pageData?.image?.mime as string,
      }}
    >
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
