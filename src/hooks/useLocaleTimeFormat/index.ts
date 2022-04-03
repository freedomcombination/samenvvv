import * as dateFns from 'date-fns'
import { useRouter } from 'next/router'

import { timeLocale } from '@config'

export const useLocaleTimeFormat = (
  time: Date | string,
  format?: string,
): {
  formattedDate?: string
  timeZone?: string
  formattedDateDistance?: string
  date?: Date
} => {
  const { locale } = useRouter()

  if (!time || typeof window === 'undefined') return {}

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const date = new Date(
    (typeof time === 'string' ? new Date(time) : time).toLocaleString('en-US', {
      timeZone,
    }),
  )

  const differenceInHours = dateFns.differenceInHours(date, new Date())

  const formattedDateDistance = dateFns.formatDistanceToNowStrict(
    new Date(date),
    {
      locale: timeLocale[locale as StrapiLocale],
      unit: differenceInHours > 1 ? 'hour' : 'minute',
    },
  )

  const formattedDate = dateFns.format(date, format || 'dd MMMM yyyy', {
    locale: timeLocale[locale as StrapiLocale],
  })

  return { formattedDate, formattedDateDistance, date, timeZone }
}
