import { Box, Skeleton, SkeletonText, VStack } from '@chakra-ui/react'

export const CardSkeleton = () => {
  return (
    <Box borderRadius="lg" boxShadow="sm" overflow="hidden">
      <Skeleton h={150} />
      <VStack align="stretch" spacing={6} p={6}>
        <SkeletonText w={150} noOfLines={1} />
        <SkeletonText noOfLines={3} mt={4} />
        <SkeletonText w={100} noOfLines={1} />
      </VStack>
    </Box>
  )
}
