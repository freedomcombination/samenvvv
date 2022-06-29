import { Stack } from '@chakra-ui/react'

import { HEADER_MENU } from '@config'

import { HeaderNavItem } from '../HeaderNavItem'

interface HeaderNavProps {
  direction?: 'column' | 'row'
}

export const HeaderNav = ({
  direction = 'row',
}: HeaderNavProps): JSX.Element => {
  return (
    <Stack direction={direction}>
      {HEADER_MENU.map((item, i) => {
        return <HeaderNavItem key={i} navItem={item} />
      })}
    </Stack>
  )
}
