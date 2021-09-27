import { Box } from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { ChakraNextImage } from '@components'
import { useData } from '@hooks'

const Markdown = dynamic(() => import('../../components/Markdown'))

interface ApplicationProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

export const ApplicationView = ({
  slug,
  source,
}: ApplicationProps): JSX.Element => {
  const { locale } = useRouter()
  const [, , currentSlug] = slug[locale as string]

  const { data } = useData<ApplicationType[]>('applications', {
    slug: currentSlug,
    locale,
  })

  const application = data?.[0]

  if (!application) return <div>Not Found</div>

  return (
    <Box p={4} boxShadow="lg">
      <h1>{application.title}</h1>
      <Markdown source={source} />
      {application.image && <ChakraNextImage image={application.image} />}
    </Box>
  )
}
