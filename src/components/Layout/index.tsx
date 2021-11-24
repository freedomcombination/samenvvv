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
              },
            ],
          }}
        />
      )}
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
