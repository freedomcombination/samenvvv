import React from 'react'

import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react'
/* eslint-disable import/no-duplicates */
import { format } from 'date-fns'
import { enIN as en, nl, tr } from 'date-fns/locale'
import { useTranslation } from 'next-i18next'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { useRouter } from 'next/router'
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { IoArrowBackSharp, IoArrowForwardOutline } from 'react-icons/io5'
import { MdEvent } from 'react-icons/md'

//CardGroup,
import {
  CardGroup,
  CardGroupRow,
  ChakraNextImage,
  Container,
  Layout,
  Markdown,
} from '@components'

//import { HashtagTimeline } from '../../components/HashtagTimeline'
//import twData from '../../data/twitter-data.json'

const timeLocale: Record<string, Locale> = { en, nl, tr }

interface SubViewProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  pageData: ISubpage
}

const SubView = ({ source, pageData }: SubViewProps): JSX.Element => {
  // console.log('source: ', source)
  // console.log('pageData: ', pageData)
  //console.log('tweetData: ', twData)
  const { t } = useTranslation()
  const { locale } = useRouter()
  return (
    <Layout>
      <Container>
        <Grid templateColumns="repeat(5, 1fr)" gap={4} mt={10}>
          <GridItem colSpan={{ base: 5, md: 5, lg: 4 }}>
            {pageData.image && (
              <ChakraNextImage h="300px" image={pageData.image} />
            )}
            <Box d="flex" mt={4} alignItems="center">
              <MdEvent />
              <Box as="span" ml="2">
                {pageData.start &&
                  format(new Date(pageData.start), 'd LLL', {
                    locale: timeLocale[locale as string],
                  })}{' '}
                -{' '}
                {pageData.end &&
                  format(new Date(pageData.end), 'd LLL', {
                    locale: timeLocale[locale as string],
                  })}
              </Box>
            </Box>
            <Heading>{pageData.title}</Heading>
            {source && <Markdown source={source} />}
            <HStack direction={'column'} justify={'space-between'} mt={'20px'}>
              <Button bg={'transparent'} as={IoArrowBackSharp}></Button>
              <Button bg={'transparent'} as={IoArrowForwardOutline}></Button>
            </HStack>
            <GridItem marginTop={'20px'} colSpan={{ base: 5, md: 5, lg: 4 }}>
              <CardGroup
                items={pageData?.page?.subpages as ISubpage[]}
                isSimple={true}
              />
            </GridItem>
            <Flex
              flexDirection="column"
              position="absolute"
              top={250}
              left={{ base: 'initial', md: 'initial', lg: 0 }}
              right={{ base: 0, md: 0, lg: 'initial' }}
            >
              <IconButton
                colorScheme="primary"
                aria-label="Twitter"
                borderRadius="none"
                icon={<FaTwitter />}
              />
              <IconButton
                colorScheme="primary"
                aria-label="Facebook"
                borderRadius="none"
                icon={<FaFacebook />}
              />
              <IconButton
                colorScheme="primary"
                aria-label="WhatsApp"
                borderRadius="none"
                icon={<FaWhatsapp />}
              />
            </Flex>
          </GridItem>

          <GridItem
            colSpan={{ base: 0, md: 0, lg: 1 }}
            display={{ base: 'none', md: 'none', lg: 'inherit' }}
          >
            <Flex
              direction="column"
              align="center"
              w="15vw"
              h="100%"
              border="3px solid"
              borderColor="primary.300"
              fontSize="2vmax"
              fontWeight="extrabold"
            >
              <VStack align="stretch" justify="stretch">
                <Text color="primary.500" ml={'10px'} fontSize="2rem">
                  {t('subpage.latest')} {pageData.page?.slug}
                  {
                    //pageData.page?.subpages.
                  }
                </Text>
                <Box
                  bg="white"
                  p={4}
                  borderColor="gray.500"
                  borderWidth={1}
                  rounded="lg"
                  h={450}
                  overflow="auto"
                >
                  {
                    //<HashtagTimeline />
                    //user={'@samenvvv'}
                  }
                  <CardGroupRow
                    items={pageData?.page?.subpages as ISubpage[]}
                    isSimple={true}
                  />
                </Box>
              </VStack>
              <VStack align="stretch" justify="stretch">
                <Text color="primary.500" ml={'10px'} fontSize="2rem">
                  {t('subpage.mostreaded')} {pageData.page?.slug}
                </Text>
                <Box
                  bg="white"
                  p={4}
                  borderColor="gray.500"
                  borderWidth={1}
                  rounded="lg"
                  h={450}
                  overflow="auto"
                >
                  <CardGroupRow
                    items={pageData?.page?.subpages as ISubpage[]}
                    isSimple={true}
                  />
                </Box>
              </VStack>
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </Layout>
  )
}

export default SubView
