import { FC } from 'react'

import {
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Navigate } from '@components'

interface HeaderNavItemProps {
  navItem: ChildMenuType | ParentMenuType
}

interface ChildMenuItemProps {
  item: ChildMenuType
}

interface ParentMenuItemProps {
  item: ParentMenuType
}

const ChildMenuItem: FC<ChildMenuItemProps> = ({ item }) => {
  const { asPath, locale } = useRouter()

  return (
    <Navigate
      href={item.link}
      fontWeight={600}
      p={2}
      color={
        item.link !== '/' && asPath.includes(item.link)
          ? 'primary.400'
          : 'gray.700'
      }
      _hover={{ color: 'primary.400' }}
    >
      {item[locale as StrapiLocale]}
    </Navigate>
  )
}

const ParentMenuItem: FC<ParentMenuItemProps> = ({ item }) => {
  return (
    <Popover trigger="hover" arrowSize={16}>
      <PopoverTrigger>
        <Link fontWeight={600} p={2}>
          {item.label}
        </Link>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Stack>
              {item.children.map(item => (
                <ChildMenuItem key={item.link} item={item} />
              ))}
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export const HeaderNavItem: FC<HeaderNavItemProps> = ({ navItem }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false })

  const parentLink = navItem as ParentMenuType
  const childLink = navItem as ChildMenuType
  const isParentLink = parentLink.children

  if (isParentLink) {
    if (isMobile)
      return (
        <>
          {parentLink.children.map(item => (
            <ChildMenuItem key={item.link} item={item} />
          ))}
        </>
      )
    return <ParentMenuItem item={parentLink} />
  }

  return <ChildMenuItem item={childLink} />
}
