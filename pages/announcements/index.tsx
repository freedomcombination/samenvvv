import { Box, Stack } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'

import { CardGroup, Container, Hero, Layout, Markdown } from '@components'
import { getAnnouncements } from '@lib'

interface AnnouncementsProps {
  announcements: Announcement[]
  seo: NextSeoProps
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

const Announcements = ({ announcements, seo, source }: AnnouncementsProps) => {
  return (
    <Layout scrollHeight={100} seo={seo}>
      <Hero isFullHeight={false} title={seo.title as string} />
      <Container>
        <Stack spacing={8} my={8}>
          {source && (
            <Box my={4} maxW="container.md" mx="auto" textAlign="center">
              <Markdown source={source} />
            </Box>
          )}
          <CardGroup items={announcements} type="announcement" hasLink />
        </Stack>
      </Container>
    </Layout>
  )
}

export default Announcements

export const getStaticProps: GetStaticProps = async context => {
  const locale = context.locale as StrapiLocale

  const response = await getAnnouncements(locale)

  const title = {
    en: 'Announcements',
    nl: 'Aankondigingen',
    tr: 'Duyurular',
  }

  const description = {
    en: '',
    nl: '',
    tr: '',
  }

  const content = {
    en: ``,
    nl: ``,
    tr: ``,
  }

  const seo: NextSeoProps = {
    title: title[locale],
    description: description[locale],
  }

  const source = await serialize(content[locale].trim())

  return {
    props: {
      announcements: response?.result || null,
      seo,
      source,
      ...(await serverSideTranslations(locale as StrapiLocale, ['common'])),
    },
  }
}
