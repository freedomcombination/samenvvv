import {
  Box,
  Heading,
  VStack,
  Text,
  Button,
  ChakraProps,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { useTranslation } from 'next-i18next'

import { ChakraNextImage, Navigate } from '@components'
interface CardBoxProps extends ChakraProps {
  item: SubpageType
  href: string
}

export const CardBox = (props: CardBoxProps): JSX.Element => {
  const { item, href, ...rest } = props
  const { t } = useTranslation(['common'])

  return (
    <Box
      boxShadow="md"
      bg="white"
      borderRadius="md"
      key={item.id}
      align="stretch"
      {...rest}
    >
      {item.image && (
        <ChakraNextImage
          objectFit="cover"
          h="250px"
          w="full"
          image={item.image}
        />
      )}
      <VStack p={4} spacing={4} align="start">
        <Heading>{item.title}</Heading>
        <Text>
          {/* TODO: Localize time */}
          {item.start && format(new Date(item.start), 'dd LLLL yy iiii')}
        </Text>
        <Navigate as={Button} href={href} variant="normal">
          {t`read-more`}
        </Navigate>
      </VStack>
    </Box>
  )
}
