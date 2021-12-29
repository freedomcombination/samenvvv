import { ReactNode } from 'react'

import { Box, Flex, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import NextImage from 'next/image'
import { useTranslation } from 'react-i18next'

import { Container } from '@components'

import { FooterNav } from '../FooterNav'
import { SocialButtons } from '../SocialButtons'

export const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

export const Footer = (): JSX.Element => {
  const { t } = useTranslation()
  return (
    <Box bg={'gray.700'} color={'primary.600'}>
      <Container as={Stack}>
        <SimpleGrid columns={{ sm: 2, md: 4 }} spacing={8} py={10}>
          <Stack spacing={6}>
            <Box>
              <Flex
                direction="column"
                justify="space-between"
                align="center"
                pos="relative"
                md="10px"
              >
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    ease: 'linear',
                    repeat: Infinity,
                    duration: 60,
                  }}
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
                <Text
                  color={'white'}
                  justifyContent={'center'}
                  paddingLeft={6}
                  mx={2}
                  my={2}
                >
                  {' '}
                  {t('footer_about')}{' '}
                </Text>{' '}
                <SocialButtons />
              </Flex>
            </Box>
          </Stack>
          <FooterNav />
        </SimpleGrid>
        <Flex
          justify="space-between"
          borderTopWidth="5px"
          borderTopColor="whiteAlpha.500"
          py={10}
          m=""
        >
          <Text fontSize={'sm'}>
            &copy; {new Date().getFullYear()}
            {t('copyright')}
          </Text>
        </Flex>
      </Container>
    </Box>
  )
}
