import {
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react'

export const MentionListSkeleton = (): JSX.Element => {
  return (
    <>
      {new Array(5).fill(null).map((_, i) => (
        <HStack key={i}>
          <HStack flex="1" px={4} py={3}>
            <SkeletonCircle />
            <SkeletonText noOfLines={2} flex="1" />
            <Skeleton h={8} w={12} rounded="2xl" />
          </HStack>
          <Skeleton />
        </HStack>
      ))}
    </>
  )
}
