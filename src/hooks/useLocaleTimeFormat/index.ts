import { format } from 'date-fns'
import { useRouter } from 'next/router'

import { timeLocale } from '@utils'

export const useLocaleTimeFormat = (
  time: Date | string,
  formatStr?: string,
): string => {
  const { locale } = useRouter()

  if (!time) return ''

  const date = typeof time === 'string' ? new Date(time) : time

  return format(date, formatStr || 'dd MMMM yyyy', {
    locale: timeLocale[locale as string],
  })
}
