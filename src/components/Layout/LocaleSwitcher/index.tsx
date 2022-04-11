import { Button, ButtonGroup, HStack } from '@chakra-ui/react'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { NextSeoProps } from 'next-seo'
import { NextRouter, useRouter } from 'next/dist/client/router'
import { DehydratedState } from 'react-query'

export interface DynamicProps {
  locale: StrapiLocale
  slug: {
    en: (string | null)[]
    nl: (string | null)[]
    tr: (string | null)[]
  }
  isPage: {
    main: boolean
    sub: boolean
    child: boolean
  }
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  dehydratedState: DehydratedState
  pageData: Hashtag | Post | Record<string, unknown>
  _nextI18Next: any
  seo: NextSeoProps
  link: string
}

interface LocaleSwitcherProps {
  hasScroll?: boolean
  isScrolled?: boolean
}

interface RouterComponent {
  components: Record<
    string,
    {
      props: {
        pageProps: DynamicProps
      }
    }
  >
}

export const LocaleSwitcher = ({
  hasScroll,
  isScrolled,
}: LocaleSwitcherProps): JSX.Element => {
  const { locales, push, pathname, locale, asPath, components } =
    useRouter() as NextRouter & RouterComponent

  const slug = components?.[pathname]?.props?.pageProps?.slug as any

  // TODO: Redirect to localized path for static pages
  const handleChangeLanguage = async (locale: StrapiLocale) => {
    await push(pathname, slug?.[locale]?.join('/') || asPath, { locale })
  }

  return (
    <HStack py={1} justify="flex-end">
      <ButtonGroup isAttached d="flex" size="xs" alignItems="center">
        {(locales as StrapiLocale[]).map(code => {
          if (slug && (!slug?.[code] || !slug?.[code])) return null

          return (
            <Button
              key={code}
              size="sm"
              onClick={() => handleChangeLanguage(code)}
              colorScheme={
                !hasScroll
                  ? 'blackAlpha'
                  : isScrolled
                  ? 'blackAlpha'
                  : 'whiteAlpha'
              }
              variant={locale === code ? 'normal' : 'ghost'}
            >
              {code.toUpperCase()}
            </Button>
          )
        })}
      </ButtonGroup>
    </HStack>
  )
}
