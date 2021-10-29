import React, { ReactNode } from 'react'

import { Box, Flex } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'

import { Footer, Header } from '@components'
import { useScroll } from '@hooks'

interface LayoutProps {
  children: ReactNode
  metadata?: IMetadata
  scrollHeight?: number | null
}

export const Layout = ({
  children,
  metadata,
  scrollHeight = null,
}: LayoutProps): JSX.Element | null => {
  const isScrolled = useScroll(scrollHeight)

  return (
    <>
      {metadata && (
        <NextSeo
          title={metadata.metaTitle}
          description={metadata.metaDescription}
          openGraph={{
            title: metadata.metaTitle,
            description: metadata?.metaDescription,
          }}
        />
      )}
      <Flex flexDir="column" minHeight="100vh">
        <Header isScrolled={isScrolled} hasScroll={!!scrollHeight} />
        <Box flex={1}>{children}</Box>
        <Footer />
      </Flex>
    </>
  )
}
