/* eslint-disable import/no-unresolved */
import { useRef } from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Hydrate } from 'react-query/hydration'

import theme from '@theme'

import SeoConfig from '../next-seo.config.json'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-fade'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<QueryClient>()

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={theme}>
          <DefaultSeo {...SeoConfig} />
          <Component {...pageProps} />
        </ChakraProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default appWithTranslation(MyApp)
