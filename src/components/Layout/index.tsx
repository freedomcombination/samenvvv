import React, { ReactNode } from 'react'

import { Box, Flex } from '@chakra-ui/react'
import { NextSeo, NextSeoProps } from 'next-seo'

import { Footer, Header } from '@components'
import { useScroll } from '@hooks'

interface LayoutProps {
  children: ReactNode
  seo?: NextSeoProps
  scrollHeight?: number | null
}

export const Layout = ({
  children,
  seo,
  scrollHeight = null,
}: LayoutProps): JSX.Element | null => {
  const isScrolled = useScroll(scrollHeight)

  return (
    <>
      {seo && <NextSeo {...seo} />}
      <Flex flexDir="column" minHeight="100vh">
        <Header isScrolled={isScrolled} hasScroll={!!scrollHeight} />
        <Box
          minH={
            scrollHeight
              ? 'calc(100vh - 300px)'
              : { base: 'calc(100vh - 64px)', lg: 'calc(100vh - 100px)' }
          }
        >
          {children}
        </Box>
        <Footer />
      </Flex>
    </>
  )
}
