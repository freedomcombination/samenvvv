import React from 'react'

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'
import { FaBars } from 'react-icons/fa'

import { HeaderNav, HeaderTop } from '@components'

type HeaderMobileProps = {
  hasScroll?: boolean
  isScrolled?: boolean
}

export const HeaderMobile = (props: HeaderMobileProps): JSX.Element => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  const { hasScroll, isScrolled } = props

  return (
    <>
      <IconButton
        display={{ base: 'flex', lg: 'none' }}
        variant="outline"
        colorScheme={
          !hasScroll ? 'blackAlpha' : isScrolled ? 'blackAlpha' : 'whiteAlpha'
        }
        onClick={onToggle}
        aria-label="menu"
        icon={<FaBars />}
      />
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <HeaderNav direction="column" />
          </DrawerBody>
          <DrawerFooter justifyContent="center">
            <HeaderTop />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
