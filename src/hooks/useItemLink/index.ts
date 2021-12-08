import { useRouter } from 'next/router'

import { getItemLink } from '@utils'

export const useItemLink = (
  item: ISubpage | IApplication | IHashtagPost,
  isAbsolute?: boolean,
): string | null => {
  const { locale } = useRouter()

  return getItemLink(item, locale as string, isAbsolute)
}
