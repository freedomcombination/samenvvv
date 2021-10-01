import { useRouter } from 'next/router'

import { Navigate } from '@components'

interface HeaderNavItemProps {
  navItem: { name: string; link: string }
}

export const HeaderNavItem = (props: HeaderNavItemProps): JSX.Element => {
  const { navItem } = props
  const { asPath } = useRouter()

  return (
    <Navigate
      fontSize="1.125em"
      fontWeight="bold"
      pos="relative"
      color={
        navItem.link !== '/' && asPath.includes(navItem.link)
          ? 'primary.400'
          : 'gray.700'
      }
      p={2}
      _hover={{
        color: 'primary.400',
        _before: {
          w: 'full',
        },
      }}
      _before={{
        content: "''",
        transition: 'width 0.3s',
        bg: 'primary.400',
        w: navItem.link !== '/' && asPath.includes(navItem.link) ? 'full' : 0,
        h: 1,
        pos: 'absolute',
        bottom: 0,
        transform: 'translateX(-50%)',
        left: '50%',
      }}
      key={navItem.link}
      href={navItem.link}
    >
      {navItem.name}
    </Navigate>
  )
}
