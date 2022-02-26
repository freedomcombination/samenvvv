import React from 'react'

import { Box, Heading, Text, VStack } from '@chakra-ui/react' //Stack,
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import {
  AnimatedBox,
  ChakraNextImage,
  Container,
  Hero,
  Layout,
} from '@components'

import aboutUsData from '../src/data/about-us.json'

interface AboutUsBlockProps {
  directing: 'to-up' | 'to-down' | 'to-left' | 'to-right'
  image: string
  title: string
  text: string
}

const AboutUsBlock = (props: AboutUsBlockProps): JSX.Element => {
  const { directing = 'to-right', image, title, text } = props
  return (
    <VStack maxW="lg" align="stretch" overflow="hidden">
      <AnimatedBox directing={directing} delay={7}>
        {image && <ChakraNextImage h={250} image={image} />}
      </AnimatedBox>
      <AnimatedBox directing="to-left" delay={5}>
        <VStack align="stretch" p={4}>
          <Heading as="h3" size="lg">
            {title}
          </Heading>
          <Text>{text}</Text>
        </VStack>
      </AnimatedBox>
    </VStack>
  )
}

interface AboutUsProps {
  title: string
  content: {
    title: string
    description: string
    image: string
  }[]
  seo: NextSeoProps
}

const AboutUs = ({ title, content, seo }: AboutUsProps): JSX.Element => {
  return (
    <Layout scrollHeight={100} seo={seo}>
      <Hero
        isFullHeight={false}
        title={title}
        image={`${process.env.NEXT_PUBLIC_SITE_URL}/images/about-us.jpeg`} //to do: this url must be vhange when product modul
      />
      <Container>
        <VStack
          my={8}
          spacing={8}
          align="stretch"
          maxW="container.md"
          mx="auto"
        >
          {content.map(({ title, description, image }, i) => (
            <Box key={i} alignSelf={i % 2 === 0 ? 'start' : 'end'}>
              <AboutUsBlock
                title={title}
                text={description}
                image={image}
                directing={i % 2 === 0 ? 'to-right' : 'to-left'}
              />
            </Box>
          ))}
        </VStack>
      </Container>
    </Layout>
  )
}

export default AboutUs
export const getStaticProps: GetStaticProps = async context => {
  const { locale } = context

  const pageData = aboutUsData[locale as 'nl' | 'en' | 'tr']

  const seo: NextSeoProps = {
    title: pageData.title,
  }

  return {
    props: {
      ...(await serverSideTranslations(locale as CommonLocale, ['common'])),
      title: pageData.title,
      content: pageData.content,
      seo,
    },
  }
}
