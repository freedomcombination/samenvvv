import { Box, Text, VStack } from '@chakra-ui/react'

export const TweetWidget = (): JSX.Element => {
  return (
    <VStack align="stretch" justify="stretch">
      <Text color="gray.500" fontSize="sm">
        Latest Tweets
      </Text>
      <Box
        bg="white"
        p={4}
        borderColor="gray.500"
        borderWidth={1}
        rounded="lg"
      ></Box>
    </VStack>
  )
}
