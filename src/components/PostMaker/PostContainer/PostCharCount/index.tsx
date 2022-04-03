import React from 'react'

import { chakra, Text } from '@chakra-ui/react'

import { useAppSelector } from '@store'

export const PostCharCount = () => {
  const { count, isExceeded } = useAppSelector(state => state.post)

  return (
    <Text
      color="gray.500"
      fontSize="sm"
      data-tour="step-character-limit"
      data-tour-mob="step-character-limit"
    >
      <chakra.span
        {...(isExceeded && {
          color: 'red.400',
          fontWeight: 600,
        })}
      >
        {count}
      </chakra.span>
      /280
    </Text>
  )
}
