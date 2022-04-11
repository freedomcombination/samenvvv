import { Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { FOOTER_MENU } from '@config'

import { ListHeader } from '..'
import { FooterNavItem } from '../FooterNavItem'

export const FooterNav = (): JSX.Element => {
  const { locale } = useRouter()
  const { t } = useTranslation()
  return (
    <>
      {FOOTER_MENU.map((item, i) => {
        return (
          <Stack
            align={{ base: 'center', sm: 'start' }}
            marginX={4}
            fontSize="lg"
            color={'primary.500'}
            key={i}
            py={4}
          >
            <ListHeader>{t(item[locale as StrapiLocale].label)}</ListHeader>
            {item[locale as StrapiLocale].children.map((item, i) => {
              return <FooterNavItem key={i} navItem={item} />
            })}
          </Stack>
        )
      })}
    </>
  )
}
