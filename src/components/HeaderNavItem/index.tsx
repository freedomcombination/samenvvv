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
import { ChildMenuType, MenuType, ParentMenuType } from '@config'

interface HeaderNavItemProps {
  navItem: MenuType
}

interface ChildMenuItemProps {
  item: ChildMenuType
}

interface ParentMenuItemProps {
  item: ParentMenuType
}

const ChildMenuItem = ({ item }: ChildMenuItemProps) => {
  const { asPath } = useRouter()
  const { link, label } = item

  return (
    <Navigate
      href={link}
      fontWeight="bold"
      p={2}
      color={link !== '/' && asPath.includes(link) ? 'primary.400' : 'gray.700'}
      _hover={{ color: 'primary.400' }}
    >
      {label}
    </Navigate>
  )
}

const ParentMenuItem = ({ item }: ParentMenuItemProps) => {
  return (
    <Popover trigger="hover" arrowSize={16}>
      <PopoverTrigger>
        <Link fontWeight="bold" p={2}>
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

export const HeaderNavItem = (props: HeaderNavItemProps): JSX.Element => {
  const { navItem } = props

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
