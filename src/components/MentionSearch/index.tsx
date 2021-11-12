import { ChangeEvent } from 'react'

import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react'

import { setMentionSearchKey, useAppDispatch } from '@store'

export const MentionSearch = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const onSearchMention = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(setMentionSearchKey(e.target.value))

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
          onChange={onSearchMention}
          _focus={{ borderColor: 'gray.500', borderWidth: 2 }}
        />
      </FormControl>
    </Box>
  )
}
