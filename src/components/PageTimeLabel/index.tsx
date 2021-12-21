import { Box, HStack, StackProps } from '@chakra-ui/react'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import { MdEvent } from 'react-icons/md'

import { timeLocale } from '@utils'

interface PageTimeLabelProps {
  pageData: ISubpage | IHashtag
}

const formatLocale = (date: string, locale: string) =>
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
        {hashtag.date && formatLocale(hashtag.date, locale as string)}
        {subpage.start && formatLocale(subpage.start, locale as string)}
        {subpage.end && ` - ${formatLocale(subpage.end, locale as string)}`}
      </Box>
    </HStack>
  )
}
