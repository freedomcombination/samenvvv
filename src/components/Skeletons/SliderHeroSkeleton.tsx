import { Skeleton, SkeletonText, Stack, VStack } from '@chakra-ui/react'

export const SliderHeroSkeleton = () => {
  return (
    <Stack
      align={'center'}
      spacing={{ base: 8, md: 10 }}
      direction={{ base: 'column', md: 'row' }}
    >
      <VStack flex={1} spacing={{ base: 5, md: 10 }} align="stretch" p={4}>
        <SkeletonText w={50} noOfLines={1} mt={4} />
        <SkeletonText w={150} noOfLines={1} mt={4} />
        <SkeletonText noOfLines={3} mt={4} />
        <SkeletonText w={100} noOfLines={1} mt={4} />
      </VStack>
      <Skeleton flex={1} h={300} rounded={'2xl'} />
    </Stack>
  )
}
