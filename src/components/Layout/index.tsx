import React, { ReactNode } from 'react'

import { Box, Flex } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

import { Footer, Header } from '@components'
import { useScroll } from '@hooks'

interface LayoutProps {
  children: ReactNode
  seo?: {
    metadata: IMetadata
    url: string
    image: string
  }
  scrollHeight?: number | null
}

export const Layout = ({
  children,
  seo,
  scrollHeight = null,
}: LayoutProps): JSX.Element | null => {
  const isScrolled = useScroll(scrollHeight)
  const { locale } = useRouter()

  return (
    <>
      {seo?.metadata && (
        <NextSeo
          title={seo.metadata.metaTitle}
          description={seo.metadata.metaDescription}
          openGraph={{
            url: seo.url,
            title: seo.metadata.metaTitle,
            site_name: 'SamenVVV',
            description: seo.metadata?.metaDescription,
            locale: locale as string,
            images: [
              {
                url: seo.image,
                alt: seo.metadata.metaTitle,
                width: 960,
                height: 540,
                type: 'image/jpeg',
              },
            ],
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
