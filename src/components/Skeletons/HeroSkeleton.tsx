import React from 'react'

import { Skeleton, SkeletonText, Stack } from '@chakra-ui/react'

export const HeroSkeleton = () => {
  return (
    <Stack w="full" spacing={8}>
      <Stack>
        <Skeleton
          startColor="whiteAlpha.500"
          endColor="whiteAlpha.200"
          noOfLines={1}
          h={4}
        />
        <Skeleton
          startColor="whiteAlpha.500"
          endColor="whiteAlpha.200"
          noOfLines={1}
          h={4}
          maxW={350}
        />
      </Stack>
      <SkeletonText
        startColor="whiteAlpha.500"
        endColor="whiteAlpha.200"
        noOfLines={5}
      />
      <Skeleton
        startColor="whiteAlpha.500"
        endColor="whiteAlpha.200"
        noOfLines={1}
        maxW={150}
        h={10}
      />
    </Stack>
  )
}
