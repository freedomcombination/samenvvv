import { ReactNode } from 'react'

import {
  Badge,
  Box,
  ChakraProps,
  Divider,
  Heading,
  HStack,
  IconButton,
  Text,
  Tooltip,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
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

const CardWrapper = ({ children, link }: CardWrapperProps) =>
  link ? <Navigate href={link}>{children}</Navigate> : <>{children}</>
interface CardProps extends ChakraProps {
  isSimple?: boolean
  isSocial?: boolean
  item: ISubpage | ICompetition | IHashtag | IApplication | IHashtagPost
  hasLink?: boolean
}

export const Card = (props: CardProps): JSX.Element => {
  const { item, isSimple, isSocial, hasLink, ...rest } = props

  const buttonSize = useBreakpointValue({ base: 'lg', lg: 'md' })

  const link = useItemLink(item)
  const absoluteLink = useItemLink(item, true)

  const post = item as IHashtagPost
  const subpage = item as ISubpage
  const subpageOrApplication = item as ISubpage | IApplication

  const title = subpageOrApplication.title || ''
  const content = post.text || removeMarkdown(subpageOrApplication.content)
  const type = subpage.type

  return (
    <CardWrapper link={hasLink && !post.text ? link : null}>
      <Box
        role="group"
        pos="relative"
        boxShadow={isSimple ? 'none' : 'base'}
        borderRadius="lg"
        overflow="hidden"
        backgroundColor="white"
        userSelect="none"
        transition="all 0.3s ease-in-out"
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

        <VStack p={4} spacing={post.text ? 0 : 4} align="stretch">
          {!post.text && (
            <>
              {!isSimple && subpage.page && (
                <PageTimeLabel
                  color="gray.500"
                  fontSize="sm"
                  pageData={subpage}
                />
              )}
              {title && (
                <Tooltip label={title}>
                  <Heading as="h3" size="md" noOfLines={1} fontWeight="bold">
                    {title}
                  </Heading>
                </Tooltip>
              )}

              <Text noOfLines={2} mt={2}>
                {content}
              </Text>
            </>
          )}

          {isSocial && hasLink && (
            <>
              {!post.text && <Divider />}
              <HStack justify="space-between">
                <ShareButtons
                  title={title as string}
                  quote={content}
                  url={absoluteLink as string}
                  size={buttonSize}
                />
                <Navigate href={link as string}>
                  <IconButton
                    aria-label="read-more"
                    colorScheme="gray"
                    variant="ghost"
                    icon={<FaArrowRight />}
                    size={buttonSize}
                  />
                </Navigate>
              </HStack>
            </>
          )}
        </VStack>
      </Box>
    </CardWrapper>
  )
}
