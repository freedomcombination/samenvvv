import { Button, ButtonGroup, HStack } from '@chakra-ui/react'
import { NextRouter, useRouter } from 'next/dist/client/router'

export const HeaderTop = (): JSX.Element => {
  const { locales, push, pathname, locale, asPath, components } =
    useRouter() as NextRouter & { components: any }

  const slug = components?.[pathname]?.props?.pageProps?.slug

  const handleChangeLanguage = async (locale: string) => {
    await push(pathname, slug ? slug[locale].join('/') : asPath, { locale })
  }

  return (
    <HStack py={1} justify="flex-end">
      <ButtonGroup isAttached d="flex" size="xs" align="center">
        {(locales as string[]).map(code => (
          <Button
            key={code}
            variant={locale === code ? 'normal' : 'ghost'}
            onClick={() => handleChangeLanguage(code)}
          >
            {code.toUpperCase()}
          </Button>
        ))}
      </ButtonGroup>
    </HStack>
  )
}
