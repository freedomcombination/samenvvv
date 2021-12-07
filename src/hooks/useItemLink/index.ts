import { useRouter } from 'next/router'

import { getItemLink } from '@utils'

export const useItemLink = (
  item: ISubpage | IApplication | IHashtagPost,
  urlType: 'absolute' | 'relative' = 'relative',
): string | null => {
  const { locale } = useRouter()

  return getItemLink(item, locale as string, urlType)
}
