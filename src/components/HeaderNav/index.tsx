import { HStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { HeaderNavItem } from '@components'
import { HEADER_MENU } from '@utils'

export const HeaderNav = (): JSX.Element => {
  const { locale } = useRouter()

  return (
    <HStack>
      {HEADER_MENU.map((item, i) => {
        return <HeaderNavItem key={i} navItem={item[locale as string]} />
      })}
    </HStack>
  )
}
