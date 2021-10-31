import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react'

export const MentionSearch = (): JSX.Element => {
  return (
    <Box>
      <FormControl>
        <FormLabel color="gray.500" fontSize="sm" htmlFor="name">
          First name
        </FormLabel>
        <Input
          bg="white"
          borderColor="gray.500"
          id="name"
          placeholder="Search..."
          _focus={{ borderColor: 'gray.500', borderWidth: 2 }}
        />
      </FormControl>
    </Box>
  )
}
