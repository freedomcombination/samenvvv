import { Box, HStack, StackProps } from '@chakra-ui/react'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { MdEvent } from 'react-icons/md'

import { timeLocale } from '@config'

interface PageTimeLabelProps {
  pageData: ISubpage | IHashtag
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
  const hashtag = pageData as IHashtag
  const subpage = pageData as ISubpage

  return (
    <HStack {...rest}>
      <MdEvent />
      <Box>
        {hashtag.date && formatLocale(hashtag.date, locale as CommonLocale)}
        {subpage.start && formatLocale(subpage.start, locale as CommonLocale)}
        {subpage.end &&
          ` - ${formatLocale(subpage.end, locale as CommonLocale)}`}
      </Box>
    </HStack>
  )
}
