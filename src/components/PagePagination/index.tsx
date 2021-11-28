import { useMemo } from 'react'

import { Box, HStack, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import { Navigate } from '@components'

interface PagePaginationProps {
  subpage: ISubpage
}

export const PagePagination = ({
  subpage,
}: PagePaginationProps): JSX.Element => {
  const { t } = useTranslation()

  const [prevPage, nextPage] = useMemo(() => {
    const currentIndex = subpage.page?.subpages?.findIndex(
      s => s.slug === subpage.slug,
    )

    if (currentIndex == undefined) return [null, null]

    const prev = subpage.page?.subpages?.[currentIndex - 1]
    const next = subpage.page?.subpages?.[currentIndex + 1]

    return [prev, next]
  }, [subpage])

  return (
    <Stack justify="space-between" direction={{ base: 'column', lg: 'row' }}>
      {prevPage && (
        <Navigate mr="auto" href={`/${subpage.page?.slug}/${prevPage?.slug}`}>
          <HStack
            transition="all 0.3s ease-in-out"
            borderWidth={1}
            borderColor="transparent"
            _hover={{ borderColor: 'primary.400', color: 'primary.400' }}
            rounded="lg"
            p={4}
          >
            <Box fontSize="xl" as={FaChevronLeft} />
            <Box>
              <Text fontSize="xs">
                {t`prev`} {t(subpage.type)}
              </Text>
              <Text maxW="300px" isTruncated>
                {prevPage?.title}
              </Text>
            </Box>
          </HStack>
        </Navigate>
      )}
      {nextPage && (
        <Navigate ml="auto" href={`/${subpage.page?.slug}/${nextPage?.slug}`}>
          <HStack
            transition="all 0.3s ease-in-out"
            borderWidth={1}
            borderColor="transparent"
            _hover={{ borderColor: 'primary.400', color: 'primary.400' }}
            rounded="lg"
            p={4}
            justify="end"
          >
            <Box>
              <Text fontSize="xs">
                {t`next`} {t(subpage.type)}
              </Text>
              <Text maxW="300px" isTruncated>
                {nextPage?.title}
              </Text>
            </Box>
            <Box fontSize="xl" as={FaChevronRight} />
          </HStack>
        </Navigate>
      )}
    </Stack>
  )
}
