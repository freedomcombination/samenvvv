import { Box, Flex, Link } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import NextImage from 'next/image'

import { Container, HeaderTop, HeaderNav } from '@components'

export const Header = (): JSX.Element => {
  return (
    <Box
      pos="sticky"
      zIndex="popover"
      top={0}
      bg={'white'}
      borderBottomWidth={1}
      borderBottomColor="blackAlpha.300"
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
