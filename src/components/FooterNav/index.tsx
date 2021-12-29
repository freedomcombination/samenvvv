import { Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { FooterNavItem } from '@components'
import { FOOTER_MENU, SOCIETY_MENU, SUPPORT_MENU } from '@utils'

import { ListHeader } from '../Footer'

const footerMenus = [
  { menu: SOCIETY_MENU, location: 'society' },
  { menu: FOOTER_MENU, location: 'footer_menu' },
  { menu: SUPPORT_MENU, location: 'support' },
]
export const FooterNav = (): JSX.Element => {
  const { locale } = useRouter()
  const { t } = useTranslation()
  return (
    <>
      {footerMenus.map((itm, s) => {
        return (
          <Stack
            marginX={4}
            border="1px"
            borderColor="gray.200"
            fontSize="lg"
            justifyContent={'center'}
            textAlign="center"
            rounded="lg"
            color={'teal.500'}
            key={s}
            py={4}
          >
            <ListHeader>{t(itm.location)}</ListHeader>
            {itm.menu.map((item, i) => {
              return <FooterNavItem key={i} navItem={item[locale as string]} />
            })}
          </Stack>
        )
      })}
    </>
  )
}
