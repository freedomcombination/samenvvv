import {
  Button,
  ButtonGroup,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { NextRouter, useRouter } from 'next/dist/client/router'

import { DynamicProps } from 'pages/[...slug]'

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

  const slug =
    (components?.[pathname]?.props?.pageProps?.pageData?.slugs as any) ||
    (components?.[pathname]?.props?.pageProps?.slug as any)

  // TODO: Redirect to localized path for static pages
  const handleChangeLanguage = async (locale: CommonLocale) => {
    await push(pathname, slug?.[locale]?.join('/') || asPath, { locale })
  }

  const size = useBreakpointValue({ base: 'sm', lg: 'xs' })

  return (
    <HStack py={1} justify="flex-end">
      <ButtonGroup isAttached d="flex" size="xs" alignItems="center">
        {(locales as CommonLocale[]).map(code => {
          if (slug && (!slug?.[code] || !slug?.[code]?.[0])) return null

          return (
            <Button
              key={code}
              size={size}
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
