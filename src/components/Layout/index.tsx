import React, { ReactNode } from 'react'

import { Box, Center, Flex, Spinner } from '@chakra-ui/react'
import { NextSeo, NextSeoProps } from 'next-seo'

import { Footer, Header } from '@components'
import { useScroll } from '@hooks'

interface LayoutProps {
  children: ReactNode
  seo?: NextSeoProps
  scrollHeight?: number | null
  isLoading?: boolean
}

export const Layout = ({
  children,
  seo,
  scrollHeight = null,
  isLoading = false,
}: LayoutProps): JSX.Element | null => {
  const isScrolled = useScroll(scrollHeight)

  return (
    <>
      {seo && <NextSeo {...seo} />}
      <Flex flexDir="column" minHeight="100vh">
        <Header isScrolled={isScrolled} hasScroll={!!scrollHeight} />
        {isLoading ? (
          <Center
            minH={
              scrollHeight
                ? 'calc(100vh - 300px)'
                : { base: 'calc(100vh - 64px)', lg: 'calc(100vh - 100px)' }
            }
          >
            <Spinner colorScheme="primary" />
          </Center>
        ) : (
          <Box
            minH={
              scrollHeight
                ? 'calc(100vh - 300px)'
                : { base: 'calc(100vh - 64px)', lg: 'calc(100vh - 100px)' }
            }
          >
            {children}
          </Box>
        )}
        <Footer />
      </Flex>
    </>
  )
}
