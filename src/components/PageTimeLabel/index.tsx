import { Box, HStack, StackProps } from '@chakra-ui/react'
/* eslint-disable import/no-duplicates */
import { format } from 'date-fns'
import { enIN as en, nl, tr } from 'date-fns/locale'
import { useRouter } from 'next/router'
import { MdEvent } from 'react-icons/md'

const timeLocale: Record<string, Locale> = { en, nl, tr }

interface PageTimeLabelProps {
  pageData: ISubpage
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

  return (
    <HStack {...rest}>
      <MdEvent />
      <Box>
        {pageData.start && formatLocale(pageData.start, locale as string)}
        {pageData.end && `- ${formatLocale(pageData.end, locale as string)}`}
      </Box>
    </HStack>
  )
}
