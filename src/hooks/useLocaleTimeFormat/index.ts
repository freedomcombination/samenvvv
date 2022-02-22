import { format, formatDistance } from 'date-fns'
import { useRouter } from 'next/router'

import { timeLocale } from '@config'

export const useLocaleTimeFormat = (
  time: Date | string,
  formatStr?: string,
): [string, string?] => {
  const { locale } = useRouter()

  if (!time) return ['']

  const date = new Date(
    (typeof time === 'string' ? new Date(time) : time).toLocaleString('en-US', {
      timeZone: 'Europe/Amsterdam',
    }),
  )

  const distanceFormat = formatDistance(new Date(), new Date(date), {
    locale: timeLocale[locale as CommonLocale],
  })

  const formatString = format(date, formatStr || 'dd MMMM yyyy', {
    locale: timeLocale[locale as CommonLocale],
  })

  return [formatString, distanceFormat]
}
