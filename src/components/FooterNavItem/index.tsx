import { Navigate } from '@components'

interface HeaderNavItemProps {
  navItem: { name: string; link: string }
}

export const FooterNavItem = (props: HeaderNavItemProps): JSX.Element => {
  const { navItem } = props

  return (
    <Navigate
      color="primary.400"
      bgClip="text"
      _hover={{
        color: 'primary.500',
      }}
      key={navItem.link}
      href={navItem.link}
    >
      {navItem.name}
    </Navigate>
  )
}
