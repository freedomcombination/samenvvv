import {
  Box,
  Button,
  // Button,
  Center,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { useTranslation } from 'react-i18next'

import { Container, Layout, Navigate, PostMakerIcon } from '@components'
import { getHashtags } from '@lib'
import { getItemLink } from '@utils'

interface HomeProps {
  seo: NextSeoProps
  link: string
}

const Home = ({ seo, link }: HomeProps): JSX.Element => {
  const { t } = useTranslation(['common'])

  return (
    <Layout scrollHeight={100} seo={seo}>
      <Box pos="relative" bg="white" mt="-100px">
        <Center
          p={8}
          bgGradient="linear(to-b, primary.600, primary.300)"
          shadow="primary"
          rounded="sm"
          minH="100vh"
        >
          <Container>
            <Stack
              direction={{ base: 'column', lg: 'row' }}
              alignItems="center"
              spacing={4}
            >
              <Stack
                order={{ base: 2, lg: 1 }}
                color="white"
                spacing={8}
                alignItems={{ base: 'center', lg: 'start' }}
                flex={1}
                textAlign={{ base: 'center', lg: 'left' }}
              >
                <Heading
                  as="h3"
                  size="2xl"
                  color="white"
                >{t`home.post-maker.title`}</Heading>
                <Text
                  fontSize="xl"
                  fontWeight="semibold"
                >{t`home.post-maker.content`}</Text>
                <Navigate
                  size="lg"
                  as={Button}
                  href={link}
                  variant="outline"
                  colorScheme="primary"
                  color="white"
                  _hover={{ color: 'white', bg: 'blackAlpha.100' }}
                >
                  {t`home.post-maker.button`}
                </Navigate>
              </Stack>

              <PostMakerIcon
                order={{ base: 1, lg: 2 }}
                boxSize={{ base: 300, lg: 500 }}
              />
            </Stack>
          </Container>
        </Center>
      </Box>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const locale = context.locale as StrapiLocale

  const title: Record<string, string> = {
    en: 'Home',
    nl: 'Home',
    tr: 'Anasayfa',
  }

  const hashtags = await getHashtags(locale, '*', 1)
  const link = getItemLink(hashtags[0], locale, 'hashtag')

  const seo: NextSeoProps = {
    title: title[locale],
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      link,
      seo,
    },
    revalidate: 120,
  }
}

export default Home
