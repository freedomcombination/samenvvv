import { Navigate } from '@components'

interface FooterNavItemProps {
  navItem: ChildMenuType
}

export const FooterNavItem = (props: FooterNavItemProps): JSX.Element => {
  const { navItem } = props

  return (
    <Navigate
      color="primary.400"
      _hover={{
        color: 'primary.400',
      }}
      key={navItem.link}
      href={navItem.link}
    >
      {navItem.label}
    </Navigate>
  )
}
