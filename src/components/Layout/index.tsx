import React, { ReactNode } from 'react'

import { Box, Flex } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

import { Footer, Header } from '@components'
import { useScroll } from '@hooks'

interface LayoutProps {
  children: ReactNode
  seo?: {
    title: string
    description: string
    url: string
    image: string
    width: number
    height: number
    type: string
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
      {seo && (
        <NextSeo
          title={seo.title}
          description={seo.description}
          openGraph={{
            url: seo.url,
            title: seo.title,
            site_name: 'SamenVVV',
            description: seo.description,
            locale: locale as string,
            type: 'website',
            images: [
              {
                url: seo.image,
                alt: seo.title,
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
