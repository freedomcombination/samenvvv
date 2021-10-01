import React, { ReactNode } from 'react'

import { Box, Flex } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'

import { Footer, Header } from '@components'
import { getImageUrl } from '@utils'

interface LayoutProps {
  children: ReactNode
  metadata?: MetadataType
}

export const Layout = ({
  children,
  metadata,
}: LayoutProps): JSX.Element | null => {
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
        <Header />
        <Box flex="1">{children}</Box>

        <Footer />
      </Flex>
    </>
  )
}
