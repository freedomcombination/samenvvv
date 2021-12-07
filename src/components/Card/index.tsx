import { ReactNode } from 'react'

import {
  Badge,
  Box,
  ChakraProps,
  Divider,
  Heading,
  Text,
  Tooltip,
  VStack,
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

const CardWrapper = ({ children, link }: CardWrapperProps) =>
  link ? <Navigate href={link}>{children}</Navigate> : <>{children}</>
interface CardProps extends ChakraProps {
  isSimple?: boolean
  isSocial?: boolean
  item: ISubpage | IApplication | IHashtagPost
  hasLink?: boolean
}

export const Card = (props: CardProps): JSX.Element => {
  const { item, isSimple, isSocial, hasLink, ...rest } = props

  const link = useItemLink(item)
  const absoluteLink = useItemLink(item, true)

  const post = item as IHashtagPost
  const subpage = item as ISubpage
  const subpageOrApplication = item as ISubpage | IApplication

  const title = subpageOrApplication.title || ''
  const content = post.text || removeMarkdown(subpageOrApplication.content)
  const type = subpage.type

  return (
    <CardWrapper link={hasLink ? link : null}>
      <Box
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
        {type && (
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
        <VStack p={4} spacing={2} align="start">
          {!isSimple && subpage.page && (
            <PageTimeLabel color="gray.500" fontSize="sm" pageData={subpage} />
          )}
          {title && (
            <Tooltip label={title}>
              <Heading as="h3" size="md" noOfLines={1} fontWeight="bold">
                {title}
              </Heading>
            </Tooltip>
          )}

          <Text noOfLines={2} fontSize="1rem" mt={2}>
            {content}
          </Text>

          {isSocial && link && (
            <>
              <Divider />
              <ShareButtons
                title={title as string}
                quote={content}
                url={absoluteLink as string}
              />
            </>
          )}
        </VStack>
      </Box>
    </CardWrapper>
  )
}
