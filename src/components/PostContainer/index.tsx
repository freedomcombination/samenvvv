import { ChangeEvent, useCallback, useEffect, useMemo, useRef } from 'react'

import {
  AspectRatio,
  Box,
  Button,
  chakra,
  Flex,
  HStack,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useBoolean,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { FaRandom, FaTwitter } from 'react-icons/fa'

import { ChakraNextImage, Navigate } from '@components'
import { useHashtagQuery } from '@lib'
import {
  checkCharacterCount,
  removeMention,
  removeTrend,
  setPostContent,
  useAppDispatch,
  useAppSelector,
} from '@store'

export const PostContainer = (): JSX.Element => {
  const { push, locale, query } = useRouter()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [editable, setEditable] = useBoolean(false)
  const { data: hashtag } = useHashtagQuery(
    locale as string,
    query?.slug?.[1] as string,
  )

  const contentRef = useRef<HTMLTextAreaElement | null>(null)

  const {
    postContent,
    mentions,
    trends,
    isCharacterCountExceeded,
    totalCharCount,
  } = useAppSelector(state => state.postShare)
  const activePost = useMemo(
    () => hashtag?.posts?.find(p => p.slug === query?.slug?.[2]),
    [query, hashtag?.posts],
  )

  const redirectToRandomPost = useCallback(() => {
    if (!hashtag?.posts) return

    const randomPostIndex = Math.floor(
      Math.random() * (hashtag.posts.length || 0),
    )

    const randomPost = hashtag.posts[randomPostIndex]

    push(`/${hashtag?.page?.slug}/${hashtag?.slug}/${randomPost?.slug}`)
  }, [hashtag, push])

  const onRemoveMention = (mention: string) => {
    dispatch(removeMention(mention))
    dispatch(checkCharacterCount())
  }
  const onRemoveTrend = (trend: string) => {
    dispatch(removeTrend(trend))
    dispatch(checkCharacterCount())
  }

  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch(setPostContent(e.target.value))
    dispatch(checkCharacterCount())
  }

  useEffect(() => {
    if (activePost) {
      dispatch(setPostContent(activePost.text))
      dispatch(checkCharacterCount(activePost.text))
    } else {
      redirectToRandomPost()
    }
  }, [activePost, dispatch, redirectToRandomPost])

  useEffect(() => {
    if (editable) {
      contentRef.current?.focus()
      contentRef.current?.select()
    }
  }, [editable])

  return (
    <HStack
      p={4}
      rounded="lg"
      bg="orange.50"
      borderWidth={1}
      align="stretch"
      borderColor="gray.500"
      spacing={4}
      flex={1}
    >
      <VStack align="stretch" flex="1">
        <Flex justify="space-between">
          <Text
            color="gray.500"
            fontSize="sm"
          >{t`post-share.content-label`}</Text>
          <Text color="gray.500" fontSize="sm">
            <chakra.span
              {...(isCharacterCountExceeded && {
                color: 'red.400',
                fontWeight: 'bold',
              })}
            >
              {totalCharCount}
            </chakra.span>
            /280
          </Text>
        </Flex>
        <VStack
          p={4}
          rounded="lg"
          borderWidth={1}
          align="stretch"
          bg={isCharacterCountExceeded ? 'red.50' : 'gray.50'}
          borderColor={isCharacterCountExceeded ? 'red.500' : 'gray.500'}
        >
          {editable ? (
            <chakra.textarea
              borderColor="gray.500"
              borderWidth={1}
              rounded="lg"
              rows={6}
              ref={contentRef}
              p={2}
              onBlur={setEditable.toggle}
              onChange={onChangeContent}
            >
              {postContent}
            </chakra.textarea>
          ) : (
            <chakra.div whiteSpace="pre-line" onClick={setEditable.toggle}>
              {postContent}
            </chakra.div>
          )}
          <Box>
            {mentions?.length > 0 && (
              <Box>
                <Text color="gray.500" fontSize="sm">
                  Mentions
                </Text>
                <Wrap>
                  {mentions.map((mention, i) => (
                    <Tag
                      rounded="full"
                      key={i}
                      variant="outline"
                      colorScheme="primary"
                    >
                      <TagLabel>{mention}</TagLabel>
                      <TagCloseButton
                        onClick={() => onRemoveMention(mention)}
                      />
                    </Tag>
                  ))}
                </Wrap>
              </Box>
            )}
            <Text color="gray.500" fontSize="sm">
              Trends
            </Text>
            <Wrap>
              <Tag rounded="full" variant="outline">
                <TagLabel>{hashtag?.hashtag}</TagLabel>
              </Tag>
              {trends.map((trend, i) => (
                <Tag rounded="full" key={i} variant="outline">
                  <TagLabel>{trend}</TagLabel>
                  <TagCloseButton onClick={() => onRemoveTrend(trend)} />
                </Tag>
              ))}
            </Wrap>
          </Box>
          {activePost?.image && (
            <AspectRatio
              borderColor="gray.500"
              borderWidth={1}
              rounded="2xl"
              pos="relative"
              ratio={1200 / 675}
              overflow="hidden"
            >
              <ChakraNextImage h={'100%'} image={activePost?.image.url} />
            </AspectRatio>
          )}
        </VStack>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          justify="space-between"
          mt="auto"
          flex={1}
          alignItems="end"
        >
          <Button
            rounded="full"
            colorScheme="primary"
            onClick={redirectToRandomPost}
            rightIcon={<FaRandom />}
          >
            {t`post-share.next-tweet`}
          </Button>
          <Button
            rounded="full"
            colorScheme="twitter"
            // TODO: Send to Twitter
            onClick={() => {}}
            rightIcon={<FaTwitter />}
            isDisabled={isCharacterCountExceeded}
          >
            {t`post-share.share-tweet`}
          </Button>
        </Stack>
      </VStack>
      <Box overflow="auto">
        <Text color="gray.500" fontSize="sm">{t`post-share.other-posts`}</Text>
        {hashtag?.posts?.map((p, i) => (
          <Box
            key={i}
            borderWidth={1}
            borderColor="gray.500"
            rounded="lg"
            overflow="hidden"
            mt={2}
          >
            <Navigate
              href={`/${hashtag?.page?.slug}/${hashtag?.slug}/${p?.slug}`}
            >
              <ChakraNextImage w={150} h={85} image={p.image?.url as string} />
            </Navigate>
          </Box>
        ))}
      </Box>
    </HStack>
  )
}
