import { Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { FooterNavItem } from '@components'
import { FOOTER_MENU, SOCIETY_MENU, SUPPORT_MENU } from '@utils'

import { ListHeader } from '../Footer'

export const FooterNav = (): JSX.Element => {
  const { locale } = useRouter()
  const { t } = useTranslation()
  return (
    <>
      <Stack direction="column" align={'flex-start'}>
        <ListHeader>{t('society')}</ListHeader>
        {SOCIETY_MENU.map((item, i) => {
          return <FooterNavItem key={i} navItem={item[locale as string]} />
        })}
      </Stack>
      <Stack direction="column" align={'flex-start'}>
        <ListHeader>{t('footer_menu')}</ListHeader>
        {FOOTER_MENU.map((item, i) => {
          return <FooterNavItem key={i} navItem={item[locale as string]} />
        })}
      </Stack>
      <Stack align={'flex-start'}>
        <ListHeader>{t('support')}</ListHeader>
        {SUPPORT_MENU.map((item, i) => {
          return <FooterNavItem key={i} navItem={item[locale as string]} />
        })}
      </Stack>
    </>
  )
}
