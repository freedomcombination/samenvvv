import React, { ReactNode } from 'react'

import { Box, Flex } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'

import { CardSlider, Footer, Header, Items } from '@components'
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
        <Box bg="primary.400" flex="1">
          {children}
        </Box>
        <CardSlider heading="Recent News" items={Items} />
        <CardSlider heading="Upcoming Events" items={Items} />
        <Footer />
      </Flex>
    </>
  )
}
