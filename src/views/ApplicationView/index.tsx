import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { useRouter } from 'next/router'

import { ChakraNextImage, Container, Layout, Markdown } from '@components'
import { useData } from '@hooks'

interface ApplicationProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

const ApplicationView = ({ slug, source }: ApplicationProps): JSX.Element => {
  const { locale } = useRouter()
  const [, , currentSlug] = slug[locale as string]

  const { data } = useData<ApplicationType[]>('applications', {
    slug: currentSlug,
    locale,
  })

  const application = data?.[0]

  if (!application) return <div>Page not found</div>

  return (
    <Layout>
      <Container>
        <h1>{application.title}</h1>
        {source && <Markdown source={source} />}
        {application.image && <ChakraNextImage image={application.image} />}
      </Container>
    </Layout>
  )
}

export default ApplicationView
