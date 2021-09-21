import { Box, Badge, Image } from '@chakra-ui/react'
import { MdEvent } from 'react-icons/md'

export const Card = ({ event }) => {
  return (
    <Box
      maxW="sm"
      boxShadow="lg"
      borderRadius="lg"
      overflow="hidden"
      backgroundColor="#fff"
      cursor="pointer"
      spacing={2}
    >
      <Box>
        <Image
          src={event.imageUrl}
          alt={event.imageAlt}
          width="100%"
          height="150px"
        />
      </Box>

      <Box p="4" display="flex" flexDirection="column" alignItems="flex-start">
        <Box mt={1}>
          <Badge
            borderRadius="sm"
            px={2}
            py={0.5}
            color="white"
            bgGradient="linear(to-tl, orange.300, orange.500)"
          >
            EVENT
          </Badge>
        </Box>

        <Box fontSize="1.5rem" mt={2} fontWeight="bold" lineHeight="tight">
          {event.title}
        </Box>

        <Box fontSize="1rem" mt={2}>
          {event.description}
        </Box>
        <Box d="flex" mt={4} alignItems="center">
          <MdEvent fontSize="1.50rem" />
          <Box as="span" ml="2" color="gray.600" fontSize="md">
            {event.date}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
