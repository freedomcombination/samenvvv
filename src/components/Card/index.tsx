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
import removeMarkdown from 'remove-markdown'

import {
  ChakraNextImage,
  Navigate,
  PageTimeLabel,
  ShareButtons,
} from '@components'
import { useItemLink } from '@hooks'

interface CardWrapperProps {
  children: ReactNode
  link: string | null
}

interface CardProps extends ChakraProps {
  isSimple?: boolean
  isSocial?: boolean
  item:
    | AnnouncementEntity
    | CompetitionEntity
    | HashtagEntity
    | ApplicationEntity
    | HashtagPostEntity
  hasLink?: boolean
  hasDescription?: boolean
  type?: 'announcement' | 'application' | 'hashtag'
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

  const link = useItemLink(item)
  const absoluteLink = useItemLink(item, true)

  const post = item as HashtagPostEntity
  const announcement = item as AnnouncementEntity
  const announcementOrApplication = item as
    | AnnouncementEntity
    | ApplicationEntity

  const title = announcementOrApplication?.attributes?.title || ''
  const content =
    post?.attributes?.text ||
    removeMarkdown(announcementOrApplication?.attributes?.content || '')

  const isPostWithSocial = post?.attributes?.text && isSocial

  return (
    <CardWrapper link={hasLink && !post?.attributes?.text ? link : null}>
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
        {post?.attributes?.image?.data?.attributes && (
          <ChakraNextImage
            ratio="twitter"
            image={item.attributes?.image as UploadFileEntityResponse}
          />
        )}
        {type && !post?.attributes?.text && (
          <Badge
            pos="absolute"
            top={4}
            right={4}
            variant="solid"
            colorScheme="primary"
            size="lg"
          >
            type
          </Badge>
        )}

        {(isPostWithSocial || title) && (
          <Stack p={4} spacing={2} flex={1}>
            {!post.attributes?.text && (
              <>
                {!isSimple && (
                  <PageTimeLabel
                    color="gray.500"
                    fontSize="sm"
                    pageData={announcement}
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
                {!post?.attributes?.text && <Divider />}
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
