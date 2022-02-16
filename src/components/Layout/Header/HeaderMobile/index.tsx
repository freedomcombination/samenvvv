import React from 'react'

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'
import { FaBars } from 'react-icons/fa'

import { LocaleSwitcher } from '../../LocaleSwitcher'
import { HeaderNav } from '../HeaderNav'

type HeaderMobileProps = {
  hasScroll?: boolean
  isScrolled?: boolean
}

export const HeaderMobile = (props: HeaderMobileProps): JSX.Element => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  const { hasScroll, isScrolled } = props

  return (
    <HStack display={{ base: 'flex', lg: 'none' }}>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <HeaderNav direction="column" />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <LocaleSwitcher hasScroll={hasScroll} isScrolled={isScrolled} />
      <IconButton
        variant="outline"
        colorScheme={
          !hasScroll ? 'blackAlpha' : isScrolled ? 'blackAlpha' : 'whiteAlpha'
        }
        onClick={onToggle}
        aria-label="menu"
        icon={<FaBars />}
      />
    </HStack>
  )
}
