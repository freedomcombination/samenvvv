import { Box, HStack, StackProps } from '@chakra-ui/react'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { MdEvent } from 'react-icons/md'

import { timeLocale } from '@config'

interface PageTimeLabelProps {
  pageData: AnnouncementEntity | HashtagEntity
}

const formatLocale = (date: string, locale: CommonLocale) =>
  format(new Date(date), 'd LLL', {
    locale: timeLocale[locale],
  })

export const PageTimeLabel = ({
  pageData,
  ...rest
}: PageTimeLabelProps & StackProps): JSX.Element => {
  const { locale } = useRouter()
  const hashtag = pageData as HashtagEntity
  const announcement = pageData as AnnouncementEntity

  return (
    <HStack {...rest}>
      <MdEvent />
      <Box>
        {hashtag.attributes?.date &&
          formatLocale(hashtag.attributes.date, locale as CommonLocale)}
        {announcement.attributes?.date &&
          formatLocale(announcement.attributes.date, locale as CommonLocale)}
        {announcement.attributes?.date_end &&
          ` - ${formatLocale(
            announcement.attributes.date_end,
            locale as CommonLocale,
          )}`}
      </Box>
    </HStack>
  )
}
