import { Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { HeaderNavItem } from '@components'
import { HEADER_MENU } from '@utils'

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
        return <HeaderNavItem key={i} navItem={item[locale as string]} />
      })}
    </Stack>
  )
}
