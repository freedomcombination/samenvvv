import { useRouter } from 'next/router'

import { getItemLink } from '@utils'

export const useItemLink = (
  item:
    | AnnouncementEntity
    | CompetitionEntity
    | HashtagEntity
    | ApplicationEntity
    | HashtagPostEntity,
  isAbsolute?: boolean,
): string | null => {
  const { locale } = useRouter()

  return getItemLink(item, locale as CommonLocale, isAbsolute)
}
