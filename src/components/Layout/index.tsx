import React, { ReactNode } from 'react'

import { Box, Flex } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'

import { Footer, Header } from '@components'
import { useScroll } from '@hooks'
import { getImageUrl } from '@utils'

interface LayoutProps {
  children: ReactNode
  metadata?: MetadataType
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
            // Only include OG image if we have it
            ...(metadata.image && {
              images: Object.values(metadata.image.formats).map(image => {
                return {
                  url: getImageUrl(image as ImageResponseType),
                  width: image.width,
                  height: image.height,
                }
              }),
            }),
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
