import { useRouter } from 'next/router'

import { Navigate } from '@components'

interface HeaderNavItemProps {
  navItem: { name: string; link: string }
}

export const HeaderNavItem = (props: HeaderNavItemProps): JSX.Element => {
  const { navItem } = props
  const { pathname } = useRouter()

  return (
    <Navigate
      fontSize="1.125em"
      pos="relative"
      bgGradient={
        navItem.link !== '/' && pathname.includes(navItem.link)
          ? 'linear(to-r, primary.300,primary.500)'
          : 'linear(to-r, gray.700, gray.900)'
      }
      bgClip="text"
      p={2}
      _hover={{
        bgGradient: 'linear(to-r, primary.300,primary.500)',
        _before: {
          w: 'full',
        },
      }}
      _before={{
        content: "''",
        transition: 'width 0.3s',
        bgGradient: 'linear(to-r, primary.300,primary.500)',
        w: navItem.link !== '/' && pathname.includes(navItem.link) ? 'full' : 0,
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
