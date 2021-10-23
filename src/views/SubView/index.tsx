import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
} from '@chakra-ui/react'
/* eslint-disable import/no-duplicates */
import { format } from 'date-fns'
import { enIN as en, nl, tr } from 'date-fns/locale'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { useRouter } from 'next/router'
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { MdEvent } from 'react-icons/md'

import { ChakraNextImage, Markdown } from '@components'
import { useData } from '@hooks'

const timeLocale: Record<string, Locale> = { en, nl, tr }

interface SubViewProps {
  slug: Record<string, string[]>
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

const SubView = ({ slug, source }: SubViewProps): JSX.Element => {
  const { locale } = useRouter()
  const [, currentSlug] = slug[locale as string]

  const { data } = useData<SubpageType[]>('subpages', {
    slug: currentSlug,
    locale,
  })

  const subpage = data?.[0]

  if (!subpage) return <Box>Page not found</Box>

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={4} mt={10}>
      <GridItem colSpan={{ base: 5, md: 5, lg: 4 }}>
        <ChakraNextImage h="300px" image={subpage.image} />

        <Box d="flex" mt={4} alignItems="center">
          <MdEvent />
          <Box as="span" ml="2">
            {subpage.start &&
              format(new Date(subpage.start), 'd LLL', {
                locale: timeLocale[locale as string],
              })}{' '}
            -{' '}
            {subpage.end &&
              format(new Date(subpage.end), 'd LLL', {
                locale: timeLocale[locale as string],
              })}
          </Box>
        </Box>

        <Heading>{subpage.title}</Heading>
        {source && <Markdown source={source} />}

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
            aria-label="Whatsapp"
            borderRadius="none"
            icon={<FaWhatsapp />}
          />
        </Flex>
      </GridItem>

      <GridItem
        colSpan={{ base: 0, md: 0, lg: 1 }}
        display={{ base: 'none', md: 'none', lg: 'inherit' }}
      >
        <Flex direction="column" align="center">
          <Box
            w="15vw"
            h="25vh"
            border="3px solid"
            borderColor="blue.300"
            fontSize="2vmax"
            fontWeight="extrabold"
            color="blue.300"
            bg="blue.50"
          >
            Twitter
          </Box>
          <Box
            w="15vw"
            h="25vh"
            border="3px solid"
            borderColor="blue.300"
            fontSize="2vmax"
            fontWeight="extrabold"
            color="blue.300"
            bg="blue.50"
          >
            Facebook
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  )
}

export default SubView
