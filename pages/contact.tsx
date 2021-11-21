import {
  Box,
  Button,
  Heading,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md' //MdOutlineEmail

import { ContactForm, Container, Layout, SocialButtons } from '@components'

const Contact = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <Layout>
      <Box
        minH="inherit"
        background="url(/images/bg-wave.svg) no-repeat bottom"
      >
        <Container minH="inherit" maxW="container.xl">
          <Stack
            justify="center"
            align="center"
            spacing={8}
            direction={{ base: 'column', lg: 'row' }}
            minH="inherit"
          >
            <VStack
              bg="gray.700"
              borderRadius="lg"
              p={{ base: 8, lg: 16 }}
              w={{ base: 'full', lg: '500px' }}
              textAlign="center"
              justify="center"
              spacing={{ base: 8, lg: 16 }}
            >
              <Box>
                <Heading>{t('contact.title')}</Heading>
                <Text mt={{ sm: 3, md: 3, lg: 5 }} color="primary.50">
                  {t('contact.fill-form')}
                </Text>
              </Box>
              <VStack alignItems="flex-start" color="primary.50">
                <Button
                  as={Link}
                  borderWidth={2}
                  borderColor="transparent"
                  variant="ghost"
                  _hover={{ borderColor: 'primary.400' }}
                  leftIcon={
                    <Box as={MdPhone} color="primary.400" size="20px" />
                  }
                  href="telto:+31685221308"
                >
                  +31-6 85221308
                </Button>
                <Button
                  as={Link}
                  borderWidth={2}
                  borderColor="transparent"
                  variant="ghost"
                  _hover={{ borderColor: 'primary.400' }}
                  leftIcon={
                    <Box as={MdEmail} color="primary.400" size="20px" />
                  }
                  href="mailto:info@samenvvv.nl"
                >
                  info@samenvvv.nl
                </Button>
                <Button
                  borderWidth={2}
                  borderColor="transparent"
                  variant="ghost"
                  _hover={{ borderColor: 'primary.400' }}
                  leftIcon={
                    <Box as={MdLocationOn} color="primary.400" size="20px" />
                  }
                  href="https://www.google.com/maps/place/Rotterdam/"
                >
                  Rotterdam, Netherland
                </Button>
              </VStack>

              <SocialButtons />
            </VStack>
            <Box
              w={{ base: 'full', lg: '500px' }}
              bg="white"
              borderRadius="lg"
              p={{ base: 8, lg: 16 }}
              shadow="2xl"
            >
              <ContactForm />
            </Box>
          </Stack>
        </Container>
      </Box>
    </Layout>
  )
}
export default Contact
export const getStaticProps: GetStaticProps = async context => {
  const { locale } = context
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}
