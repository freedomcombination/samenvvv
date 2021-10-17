import {
  Button,
  ButtonGroup,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { NextRouter, useRouter } from 'next/dist/client/router'

interface HeaderTopProps {
  hasScroll?: boolean
  isScrolled?: boolean
}

export const HeaderTop = ({
  hasScroll,
  isScrolled,
}: HeaderTopProps): JSX.Element => {
  const { locales, push, pathname, locale, asPath, components } =
    useRouter() as NextRouter & { components: any }

  const slug = components?.[pathname]?.props?.pageProps?.slug

  const handleChangeLanguage = async (locale: string) => {
    await push(pathname, slug ? slug[locale].join('/') : asPath, { locale })
  }

  const size = useBreakpointValue({ base: 'md', lg: 'xs' })

  return (
    <HStack py={1} justify="flex-end">
      <ButtonGroup isAttached d="flex" size="xs" align="center">
        {(locales as string[]).map(code => (
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
        ))}
      </ButtonGroup>
    </HStack>
  )
}
