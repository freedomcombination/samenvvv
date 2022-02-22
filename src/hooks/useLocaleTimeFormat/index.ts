import { format, formatDistanceToNowStrict } from 'date-fns'
import { useRouter } from 'next/router'

import { timeLocale } from '@config'

export const useLocaleTimeFormat = (
  time: Date | string,
  formatStr?: string,
): [string?, string?, Date?] => {
  const { locale } = useRouter()

  if (!time || typeof window === 'undefined') return []

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const date = new Date(
    (typeof time === 'string' ? new Date(time) : time).toLocaleString('en-US', {
      timeZone,
    }),
  )

  const distanceFormat = formatDistanceToNowStrict(new Date(date), {
    locale: timeLocale[locale as CommonLocale],
    unit: 'hour',
  })

  const formatString =
    format(date, formatStr || 'dd MMMM yyyy', {
      locale: timeLocale[locale as CommonLocale],
    }) +
    ' ' +
    timeZone

  return [formatString, distanceFormat, date]
}
