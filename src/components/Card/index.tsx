import { ReactNode } from 'react'

import {
  Badge,
  ChakraProps,
  Divider,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'

import {
  ChakraNextImage,
  Navigate,
  PageTimeLabel,
  ShareButtons,
} from '@components'
import { RouteKeys } from '@config'
import { useItemLink } from '@hooks'

interface CardWrapperProps {
  children: ReactNode
  link: string | null
}

interface CardProps extends ChakraProps {
  isSimple?: boolean
  isSocial?: boolean
  item: Hashtag | Post
  type: RouteKeys
  hasLink?: boolean
  hasDescription?: boolean
}

const CardWrapper = ({ children, link }: CardWrapperProps) =>
  link ? (
    <Navigate h="full" href={link}>
      {children}
    </Navigate>
  ) : (
    <>{children}</>
  )

export const Card = (props: CardProps): JSX.Element => {
  const {
    item,
    isSimple,
    isSocial,
    hasLink,
    hasDescription = true,
    type,
    ...rest
  } = props

  const buttonSize = useBreakpointValue({ base: 'lg', lg: 'md' })

  const link = useItemLink(item, type)
  const absoluteLink = useItemLink(item, type, true)

  const post = item as Post
  const subpage = item as Hashtag

  const title = subpage.title || ''
  const content = post.text || subpage.description

  const isPostWithSocial = post.text && isSocial

  return (
    <CardWrapper link={hasLink && !post.text ? link : null}>
      <Flex
        flexDir="column"
        role="group"
        pos="relative"
        boxShadow={isSimple ? 'none' : 'primary'}
        borderRadius="lg"
        overflow="hidden"
        backgroundColor="white"
        userSelect="none"
        transition="all 0.3s ease-in-out"
        h="full"
        {...rest}
      >
        <ChakraNextImage ratio="twitter" image={item.image?.url as string} />
        {type && !post.text && (
          <Badge
            pos="absolute"
            top={4}
            right={4}
            variant="solid"
            colorScheme="primary"
            size="lg"
          >
            {type}
          </Badge>
        )}

        {(isPostWithSocial || title) && (
          <Stack p={4} spacing={2} flex={1}>
            {!post.text && (
              <>
                {!isSimple && (
                  <PageTimeLabel
                    color="gray.500"
                    fontSize="sm"
                    pageData={subpage}
                  />
                )}
                {title && (
                  <Heading flex={1} as="h3" size="md">
                    {title}
                  </Heading>
                )}

                {hasDescription && (
                  <Text noOfLines={2} mt={2} fontSize="md">
                    {content}
                  </Text>
                )}
              </>
            )}

            {isSocial && (
              <>
                {!post.text && <Divider />}
                <HStack justify="space-between">
                  <ShareButtons
                    title={title as string}
                    quote={content}
                    url={absoluteLink as string}
                    size={buttonSize}
                  />
                </HStack>
              </>
            )}
          </Stack>
        )}
      </Flex>
    </CardWrapper>
  )
}
