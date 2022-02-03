import React from 'react'

import { chakra, Text } from '@chakra-ui/react'

import { useCheckCharacterCount } from '@hooks'

export const PostCharCount = () => {
  const [totalCharCount, isCharacterCountExceeded] = useCheckCharacterCount()

  return (
    <Text
      color="gray.500"
      fontSize="sm"
      data-tour="step-character-limit"
      data-tour-mob="step-character-limit"
    >
      <chakra.span
        {...(isCharacterCountExceeded && {
          color: 'red.400',
          fontWeight: 600,
        })}
      >
        {totalCharCount}
      </chakra.span>
      /280
    </Text>
  )
}
