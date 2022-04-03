import { Box, HStack, StackProps } from '@chakra-ui/react'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { MdEvent } from 'react-icons/md'

import { timeLocale } from '@config'

interface PageTimeLabelProps {
  pageData: Announcement | Hashtag
}

const formatLocale = (date: string, locale: StrapiLocale) =>
  format(new Date(date), 'd LLL', {
    locale: timeLocale[locale],
  })

export const PageTimeLabel = ({
  pageData,
  ...rest
}: PageTimeLabelProps & StackProps): JSX.Element => {
  const { locale } = useRouter()
  const hashtag = pageData as Hashtag
  const announcement = pageData as Announcement

  return (
    <HStack {...rest}>
      <MdEvent />
      <Box>
        {hashtag.date && formatLocale(hashtag.date, locale as StrapiLocale)}
        {announcement.dateEnd &&
          ` - ${formatLocale(announcement.dateEnd, locale as StrapiLocale)}`}
      </Box>
    </HStack>
  )
}
