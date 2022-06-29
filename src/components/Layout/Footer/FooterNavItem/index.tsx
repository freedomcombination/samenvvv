import { FC } from 'react'

import { useRouter } from 'next/router'

import { Navigate } from '@components'

interface FooterNavItemProps {
  navItem: ChildMenuType
}

export const FooterNavItem: FC<FooterNavItemProps> = ({ navItem }) => {
  const { locale } = useRouter()

  return (
    <Navigate
      color="primary.400"
      _hover={{
        color: 'primary.400',
      }}
      key={navItem.link}
      href={navItem.link}
    >
      {navItem[locale as StrapiLocale]}
    </Navigate>
  )
}
