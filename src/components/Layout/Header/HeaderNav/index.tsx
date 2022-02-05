import { Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { HEADER_MENU } from '@config'

import { HeaderNavItem } from '../HeaderNavItem'

interface HeaderNavProps {
  direction?: 'column' | 'row'
}

export const HeaderNav = ({
  direction = 'row',
}: HeaderNavProps): JSX.Element => {
  const { locale } = useRouter()

  return (
    <Stack direction={direction}>
      {HEADER_MENU.map((item, i) => {
        return <HeaderNavItem key={i} navItem={item[locale as ILocale]} />
      })}
    </Stack>
  )
}
