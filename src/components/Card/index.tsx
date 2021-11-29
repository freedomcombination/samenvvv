/* eslint-disable import/no-duplicates */
import {
  Badge,
  Box,
  ChakraProps,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
// import { format } from 'date-fns'
// import { enIN as en, nl, tr } from 'date-fns/locale'
// import { useRouter } from 'next/router'
import { BsHeartFill } from 'react-icons/bs'
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { MdEvent } from 'react-icons/md'
import removeMarkdown from 'remove-markdown'

import { CardIcon, ChakraNextImage, Navigate } from '@components'

// const timeLocale: Record<string, Locale> = { en, nl, tr }

interface CardProps extends ChakraProps {
  isSimple?: boolean
  isSocial?: boolean
  item: ISubpage
}
// if isSimple true - isSocial true/false OK görünmemeli
// if isSimple false - isSocial false görünmeli
// if isSimple false - isSocial true görünmemeli ezmeli
export const Card = (props: CardProps): JSX.Element => {
  const { item, isSimple, isSocial, ...rest } = props
  // const { locale } = useRouter()

  return (
    <Navigate href={`/${item.page?.slug}/${item.slug}`}>
      <Box
        pos="relative"
        boxShadow={isSimple ? 'none' : 'base'}
        borderRadius="lg"
        overflow="hidden"
        backgroundColor="white"
        userSelect="none"
        transition="all 0.3s ease-in-out"
        {...rest}
      >
        <ChakraNextImage h={150} image={item.image?.url as string} />
        {!isSimple && !isSocial && item.page && (
          <Badge
            pos="absolute"
            top={4}
            right={4}
            variant="solid"
            colorScheme="primary"
            size="lg"
          >
            {item.page.type}
          </Badge>
        )}
        <VStack p="4" spacing={4} align="start">
          <Heading as="h3" size="md" noOfLines={1} fontWeight="bold">
            {item.title}
          </Heading>

          <Text noOfLines={2} fontSize="1rem" mt={2}>
            {removeMarkdown(item.content)}
          </Text>
          {!isSimple && !isSocial && (
            <Box d="flex" mt={4} alignItems="center">
              <MdEvent />
              {/* TODO: Should be fixed with variants */}
              {/* <Box as="span" ml="2">
                {item.start &&
                  format(new Date(item.start), 'd LLL', {
                    locale: timeLocale[locale as string],
                  })}{' '}
                -{' '}
                {item.end &&
                  format(new Date(item.end), 'd LLL', {
                    locale: timeLocale[locale as string],
                  })}
              </Box> */}
            </Box>
          )}
          {isSocial && (
            <Box
              d="flex"
              mt={4}
              alignItems="center"
              justifyContent="space-between"
              w="100%"
              fontSize="2xl"
            >
              <HStack spacing="1rem">
                <CardIcon icon={<FaFacebook />} iconColor="steelblue" />
                <CardIcon icon={<FaTwitter />} iconColor="cornflowerblue" />
                <CardIcon icon={<FaWhatsapp />} iconColor="palegreen" />
              </HStack>
              <CardIcon
                icon={<BsHeartFill />}
                iconColor="primary.400"
                innerText="400"
                iconSize="4xl"
              />
            </Box>
          )}
        </VStack>
      </Box>
    </Navigate>
  )
}
