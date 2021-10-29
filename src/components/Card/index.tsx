/* eslint-disable import/no-duplicates */
import {
  Badge,
  Box,
  ChakraProps,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
// import { format } from 'date-fns'
// import { enIN as en, nl, tr } from 'date-fns/locale'
// import { useRouter } from 'next/router'
import { MdEvent } from 'react-icons/md'
import removeMarkdown from 'remove-markdown'

import { ChakraNextImage, Navigate } from '@components'

// const timeLocale: Record<string, Locale> = { en, nl, tr }

interface CardProps extends ChakraProps {
  item: ISubpage | IHashtag | ICompetition
  isSimple: boolean
}

export const Card = (props: CardProps): JSX.Element => {
  const { item, isSimple, ...rest } = props
  // const { locale } = useRouter()

  return (
    <Navigate href={`/${item.page?.slug}/${item.slug}`}>
      <Box
        pos="relative"
        boxShadow={isSimple ? 'none' : 'sm'}
        borderRadius="lg"
        overflow="hidden"
        backgroundColor="white"
        userSelect="none"
        transition="all 0.3s ease-in-out"
        {...rest}
      >
        {item.image && <ChakraNextImage h={150} image={item.image} />}
        {!isSimple && item.page?.type && (
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

          <Text noOfLines={3} fontSize="1rem" mt={2}>
            {removeMarkdown(item.content)}
          </Text>
          {!isSimple && (
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
        </VStack>
      </Box>
    </Navigate>
  )
}
