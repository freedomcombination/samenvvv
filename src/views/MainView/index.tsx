import { Box } from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

import { useRouter } from 'next/router'
import { CardGroup } from '@components'
import { Markdown } from '@components'
import { useData } from '@hooks'

interface MainViewProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

const MainView = ({ slug, source }: MainViewProps): JSX.Element => {
  const { locale } = useRouter()
  const currentSlug = slug[locale as string][0]

  const { data } = useData<PageType[]>('pages', {
    slug: currentSlug,
    locale,
  })

  const page = data?.[0]

  if (!page) return <Box>Page not found</Box>

  return (
    <div>
      <h1>{page.title}</h1>
      {source && <Markdown source={source} />}
      {<CardGroup items={page?.subpages!} isSimple={true} />}
    </div>
  )
}

export default MainView
