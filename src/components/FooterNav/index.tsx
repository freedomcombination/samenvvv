import { Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { FooterNavItem } from '@components'
import { FOOTER_MENU } from '@config'

import { ListHeader } from '../Footer'

export const FooterNav = (): JSX.Element => {
  const { locale } = useRouter()
  const { t } = useTranslation()
  return (
    <>
      {FOOTER_MENU.map((item, i) => {
        return (
          <Stack align={'flex-start'} key={i}>
            <ListHeader>{t(item[locale as ILocale].label)}</ListHeader>
            {item[locale as ILocale].children.map((childItem, i) => {
              return <FooterNavItem key={i} navItem={childItem} />
            })}
          </Stack>
        )
      })}
    </>
  )
}
