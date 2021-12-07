import { ReactNode } from 'react'

/* eslint-disable import/no-duplicates */
import {
  Badge,
  Box,
  ChakraProps,
  Divider,
  Heading,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import removeMarkdown from 'remove-markdown'

import {
  ChakraNextImage,
  Navigate,
  PageTimeLabel,
  ShareButtons,
} from '@components'
import { getItemLink, truncateText } from '@utils'
// const timeLocale: Record<string, Locale> = { en, nl, tr }
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
  const { locale } = useRouter()

  const link = getItemLink(item, locale as string)

  const post = item as IHashtagPost
  const subpage = item as ISubpage
  const subpageOrApplication = item as ISubpage | IApplication

  const title = subpageOrApplication.title || post.hashtag?.title
  const content = post.text || removeMarkdown(subpageOrApplication.content)
  const type = subpage.page?.type || null

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
        <ChakraNextImage h={150} image={item.image?.url as string} />

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
        <VStack p="4" spacing={4} align="start">
          {title && (
            <Heading as="h3" size="md" noOfLines={1} fontWeight="bold">
              {title}
            </Heading>
          )}
          <Text noOfLines={2} fontSize="1rem" mt={2}>
            {content}
          </Text>
          <Divider />
          <Wrap justify="space-between" fontSize="sm" w="full">
            {!isSimple && subpage.page && <PageTimeLabel pageData={subpage} />}
            {isSocial && link && (
              <ShareButtons
                title={
                  title +
                  '\n' +
                  truncateText(content, 250 - (title?.length || 0))
                }
                url={process.env.NEXT_PUBLIC_SITE_URL + link}
              />
            )}
          </Wrap>
        </VStack>
      </Box>
    </CardWrapper>
  )
}
