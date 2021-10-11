import { Box, Flex, Link } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import NextImage from 'next/image'

import { Container, HeaderNav, HeaderTop } from '@components'

interface HeaderProps {
  isScrolled?: boolean
  hasScroll?: boolean
}

export const Header = ({ isScrolled, hasScroll }: HeaderProps): JSX.Element => {
  return (
    <Box
      pos="sticky"
      zIndex="popover"
      top={0}
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
    >
      <Container>
        <Flex justify="space-between" align="center" pos="relative">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ ease: 'linear', repeat: Infinity, duration: 60 }}
          >
            <Link href="/">
              <NextImage
                width="92px"
                height="92px"
                objectFit="cover"
                src="/samenvvv-logo.svg"
                alt="samenvvv-logo"
              />
            </Link>
          </motion.div>
          <Box>
            <HeaderTop />
            <HeaderNav />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
