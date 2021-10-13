import { useRouter } from 'next/router'

import { ChakraNextImage } from '@components'
import { useData } from '@hooks'

interface HashtagPostProps {
  slug: Record<string, string[]>
}

const HashtagPostView = ({ slug }: HashtagPostProps): JSX.Element => {
  const { locale } = useRouter()
  const [, , currentSlug] = slug[locale as string]

  const { data } = useData<HashtagPostType[]>('hashtag-posts', {
    slug: currentSlug,
    locale,
  })

  const hashtagPost = data?.[0]

  if (!hashtagPost) return <div>HashtagPost not found</div>

  return (
    <div>
      <p>{hashtagPost.text}</p>
      {hashtagPost.image && <ChakraNextImage image={hashtagPost.image} />}
    </div>
  )
}

export default HashtagPostView
