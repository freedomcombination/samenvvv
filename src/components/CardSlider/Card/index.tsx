import {
  Badge,
  Box,
  Button,
  ChakraProps,
  Image,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { MdEvent } from 'react-icons/md'

import { Navigate } from '@components'

interface CardProps extends ChakraProps {
  item: any
  href: string
}

export const Card = (props: CardProps): JSX.Element => {
  const { item, href, ...rest } = props
  const { t } = useTranslation(['common'])

  return (
    <Box
      maxW="sm"
      boxShadow="lg"
      borderRadius="lg"
      overflow="hidden"
      backgroundColor="#fff"
      cursor="pointer"
      spacing={2}
      _hover={{
        transform: 'scale(1.04)',
        transition: '0.2s ease-out',
      }}
      {...rest}
    >
      <Box>
        <Image
          src={item.imageUrl}
          alt={item.imageAlt}
          width="100%"
          height="150px"
        />
      </Box>

      <VStack p="4" spacing={4} align="start">
        <Box mt={1}>
          <Badge
            borderRadius="sm"
            px={2}
            py={0.5}
            color="white"
            bgGradient="linear(to-tl, orange.300, orange.500)"
          >
            {item.type}
          </Badge>
        </Box>

        <Box fontSize="1.5rem" mt={2} fontWeight="bold" lineHeight="tight">
          {item.title}
        </Box>

        <Box fontSize="1rem" mt={2}>
          {item.description}
        </Box>
        <Box d="flex" mt={4} alignItems="center">
          <MdEvent fontSize="1.50rem" />
          <Box as="span" ml="2" color="gray.600" fontSize="md">
            {item.date}
          </Box>
        </Box>
        <Navigate as={Button} href={href} variant="normal">
          {t`Read more`}
        </Navigate>
      </VStack>
    </Box>
  )
}
