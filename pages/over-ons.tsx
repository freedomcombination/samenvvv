import React from 'react'

import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react' //Stack,
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FaArrowDown } from 'react-icons/fa'

import {
  AnimatedBox,
  ChakraNextImage,
  Container,
  Hero,
  Layout,
} from '@components' // MotionBox,

const OverOns = (): JSX.Element => {
  const { t } = useTranslation()
  return (
    <Layout scrollHeight={100}>
      <Hero
        isFullHeight={false}
        title={t('about-us.title')}
        image={`http://localhost:3000/images/about-us.jpeg`} //to do: this url must be vhange when product modul
      />
      <Container>
        <HStack mt="20vh" align="stretch" rounded="lg" overflow="hidden">
          <AnimatedBox directing="to-left" delay={5}>
            <VStack align="stretch" p={4}>
              <Heading as="h3" size="lg">
                {t('about-us.who-we-are.title')}
              </Heading>
              <Text>{t('about-us.who-we-are.description')}</Text>
            </VStack>
          </AnimatedBox>
          <AnimatedBox directing="to-right" delay={7}>
            <ChakraNextImage
              w="full"
              h="full"
              image="https://picsum.photos/seed/picsum/900"
            />
          </AnimatedBox>
        </HStack>

        <AnimatedBox
          animate={{ x: 0, y: 50 }}
          transition={{
            type: 'spring',
            damping: 2,
            stiffness: 50,
            repeat: Infinity,
          }}
        >
          <Box color="primary.400" mx="auto" as={FaArrowDown} boxSize={64} />
        </AnimatedBox>
        <HStack mt="20vh" align="stretch" rounded="lg" overflow="hidden">
          <AnimatedBox directing="to-right" delay={5}>
            <VStack align="stretch" p={4}>
              <Heading as="h3" size="lg">
                {t('about-us.our-vision.title')}
              </Heading>
              <Text>{t('about-us.our-vision.description')}</Text>
            </VStack>
          </AnimatedBox>
          <AnimatedBox directing="to-left" delay={7}>
            <ChakraNextImage
              w="full"
              h="full"
              image="https://picsum.photos/seed/picsum/900"
            />
          </AnimatedBox>
        </HStack>
        <AnimatedBox
          animate={{ x: 0, y: 50 }}
          transition={{
            type: 'spring',
            damping: 2,
            stiffness: 50,
            repeat: Infinity,
          }}
        >
          <Box color="primary.400" mx="auto" as={FaArrowDown} boxSize={64} />
        </AnimatedBox>
        <HStack mt="20vh" align="stretch" rounded="lg" overflow="hidden">
          <AnimatedBox directing="to-left" delay={5}>
            <VStack align="stretch" p={4}>
              <Heading as="h3" size="lg">
                {t('about-us.our-mission.title')}
              </Heading>
              <Text>{t('about-us.our-mission.description')}</Text>
            </VStack>
          </AnimatedBox>
          <AnimatedBox directing="to-right" delay={7}>
            <ChakraNextImage
              w="full"
              h="full"
              image="https://picsum.photos/seed/picsum/900"
            />
          </AnimatedBox>
        </HStack>
        <AnimatedBox
          animate={{ x: 0, y: 50 }}
          transition={{
            type: 'spring',
            damping: 2,
            stiffness: 50,
            repeat: Infinity,
          }}
        >
          <Box color="primary.400" mx="auto" as={FaArrowDown} boxSize={64} />
        </AnimatedBox>
        <HStack mt="20vh" align="stretch" rounded="lg" overflow="hidden">
          <AnimatedBox directing="to-right" delay={5}>
            <VStack align="stretch" p={4}>
              <Heading as="h3" size="lg">
                {t('about-us.our-aim.title')}
              </Heading>
              <Text>{t('about-us.our-aim.description')}</Text>
            </VStack>
          </AnimatedBox>
          <AnimatedBox directing="to-left" delay={7}>
            <ChakraNextImage
              w="full"
              h="full"
              image="https://picsum.photos/seed/picsum/900"
            />
          </AnimatedBox>
        </HStack>
      </Container>
    </Layout>
  )
}

export default OverOns
export const getStaticProps: GetStaticProps = async context => {
  const { locale } = context
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}
