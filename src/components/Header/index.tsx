import { Box, Flex, Image, Link } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Headroom from 'react-headroom'

import { Container, HeaderMobile, HeaderNav, LocaleSwitcher } from '@components'

interface HeaderProps {
  isScrolled?: boolean
  hasScroll?: boolean
}

export const Header = ({ isScrolled, hasScroll }: HeaderProps): JSX.Element => {
  return (
    <Box as={Headroom} zIndex="fixed">
      <Flex
        bg={!hasScroll ? 'white' : isScrolled ? 'white' : 'transparent'}
        borderBottomWidth={!hasScroll ? 1 : isScrolled ? 1 : 0}
        borderBottomColor="blackAlpha.300"
        transition="all 0.3s ease-in-out"
        {...(!isScrolled &&
          hasScroll && {
            sx: {
              '.chakra-link': {
                color: 'white',
                _hover: {
                  color: 'primary.400',
                },
              },
            },
          })}
        align="center"
        h={{ base: '64px', lg: '100px' }}
      >
        <Container>
          <Flex justify="space-between" align="center" pos="relative">
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ ease: 'linear', repeat: Infinity, duration: 60 }}
            >
              <Link href="/">
                <Image
                  width={{ base: '64px', lg: '92px' }}
                  height={{ base: '64px', lg: '92px' }}
                  objectFit="cover"
                  src="/samenvvv-logo.svg"
                  alt="samenvvv-logo"
                />
              </Link>
            </motion.div>
            <Box display={{ base: 'none', lg: 'block' }}>
              <LocaleSwitcher hasScroll={hasScroll} isScrolled={isScrolled} />
              <HeaderNav />
            </Box>
            <HeaderMobile hasScroll={hasScroll} isScrolled={isScrolled} />
          </Flex>
        </Container>
      </Flex>
    </Box>
  )
}
