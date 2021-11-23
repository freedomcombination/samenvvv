import { ChangeEvent, useCallback, useEffect, useRef } from 'react'

import {
  AspectRatio,
  Box,
  Button,
  chakra,
  Flex,
  SimpleGrid,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useBoolean,
  usePrevious,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { FaAt, FaEdit, FaRandom, FaTwitter } from 'react-icons/fa'

import { ChakraNextImage, Navigate } from '@components'
import {
  checkCharacterCount,
  removeMention,
  removeTrend,
  setActivePost,
  setPostContent,
  useAppDispatch,
  useAppSelector,
} from '@store'

export const PostContainer = ({
  onOpen,
  hashtag,
}: {
  onOpen: () => void
  hashtag: IHashtag
}): JSX.Element => {
  const { push, query } = useRouter()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [editable, setEditable] = useBoolean(false)

  const contentRef = useRef<HTMLTextAreaElement | null>(null)

  const {
    postContent,
    mentions,
    trends,
    isCharacterCountExceeded,
    totalCharCount,
    activePost,
  } = useAppSelector(state => state.postShare)

  const prevSlug = usePrevious(query?.slug?.[2])

  const redirectToRandomPost = useCallback(() => {
    if (!hashtag?.posts) return

    const randomPostIndex = Math.floor(
      Math.random() * (hashtag.posts.length || 0),
    )

    const randomPost = hashtag.posts[randomPostIndex]

    push(`/${hashtag?.page?.slug}/${hashtag?.slug}/${randomPost?.slug}`).then(
      filled => {
        if (filled) dispatch(setActivePost(randomPost))
      },
    )
  }, [hashtag, push, dispatch])

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
    if (!activePost) return redirectToRandomPost()

    if (prevSlug !== activePost.slug) {
      const currentPost = hashtag?.posts?.find(p => p.slug === prevSlug)
      if (currentPost) {
        dispatch(setActivePost(currentPost))
        dispatch(setPostContent(currentPost.text))
        dispatch(checkCharacterCount(currentPost.text))
      }
    } else {
      dispatch(setPostContent(activePost.text))
      dispatch(checkCharacterCount(activePost.text))
    }
  }, [activePost, prevSlug, hashtag.posts, dispatch, redirectToRandomPost])

  useEffect(() => {
    if (editable) {
      contentRef.current?.focus()
      contentRef.current?.select()
    }
  }, [editable])

  return (
    <Stack
      p={4}
      rounded="lg"
      bg="orange.50"
      borderWidth={1}
      align="stretch"
      borderColor="gray.500"
      spacing={4}
      flex={1}
      direction={{ base: 'column', lg: 'row' }}
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
            <chakra.div
              p={4}
              mt={-2}
              mx={-2}
              cursor='url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjUiIHZpZXdCb3g9IjAgMCAyNSAyNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjYyMjggNC45Nzg3Nkg0LjYyMjhDNC4wOTIzNyA0Ljk3ODc2IDMuNTgzNjYgNS4xODk0NyAzLjIwODU5IDUuNTY0NTVDMi44MzM1MiA1LjkzOTYyIDIuNjIyOCA2LjQ0ODMzIDIuNjIyOCA2Ljk3ODc2VjIwLjk3ODhDMi42MjI4IDIxLjUwOTIgMi44MzM1MiAyMi4wMTc5IDMuMjA4NTkgMjIuMzkzQzMuNTgzNjYgMjIuNzY4IDQuMDkyMzcgMjIuOTc4OCA0LjYyMjggMjIuOTc4OEgxOC42MjI4QzE5LjE1MzIgMjIuOTc4OCAxOS42NjE5IDIyLjc2OCAyMC4wMzcgMjIuMzkzQzIwLjQxMjEgMjIuMDE3OSAyMC42MjI4IDIxLjUwOTIgMjAuNjIyOCAyMC45Nzg4VjEzLjk3ODgiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xOS4xMjI4IDMuNDc4NzRDMTkuNTIwNiAzLjA4MDkyIDIwLjA2MDIgMi44NTc0MiAyMC42MjI4IDIuODU3NDJDMjEuMTg1NCAyLjg1NzQyIDIxLjcyNSAzLjA4MDkyIDIyLjEyMjggMy40Nzg3NEMyMi41MjA2IDMuODc2NTcgMjIuNzQ0MSA0LjQxNjEzIDIyLjc0NDEgNC45Nzg3NEMyMi43NDQxIDUuNTQxMzUgMjIuNTIwNiA2LjA4MDkyIDIyLjEyMjggNi40Nzg3NEwxMi42MjI4IDE1Ljk3ODdMOC42MjI4IDE2Ljk3ODdMOS42MjI4IDEyLjk3ODdMMTkuMTIyOCAzLjQ3ODc0WiIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg=="), auto'
              rounded="lg"
              _hover={{ bg: 'blackAlpha.200' }}
              whiteSpace="pre-line"
              onClick={setEditable.toggle}
            >
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
        <SimpleGrid
          columns={2}
          spacing={2}
          mt="auto"
          flex={1}
          alignContent="end"
        >
          <Button
            display={{ base: 'flex', lg: 'none' }}
            isFullWidth
            rounded="full"
            colorScheme="purple"
            onClick={onOpen}
            rightIcon={<FaAt />}
          >
            {t`post-share.add-mention`}
          </Button>
          <Button
            display={{ base: 'flex', lg: 'none' }}
            isFullWidth
            rounded="full"
            colorScheme="green"
            onClick={setEditable.on}
            rightIcon={<FaEdit />}
          >
            {t`post-share.edit-content`}
          </Button>
          <Button
            isFullWidth
            rounded="full"
            colorScheme="primary"
            onClick={redirectToRandomPost}
            rightIcon={<FaRandom />}
          >
            {t`post-share.next-tweet`}
          </Button>
          <Button
            isFullWidth
            rounded="full"
            colorScheme="twitter"
            // TODO: Send to Twitter
            onClick={() => {}}
            rightIcon={<FaTwitter />}
            isDisabled={isCharacterCountExceeded}
          >
            {t`post-share.share-tweet`}
          </Button>
        </SimpleGrid>
      </VStack>
      <Stack h="full" overflowY="hidden">
        <Text color="gray.500" fontSize="sm">{t`post-share.other-posts`}</Text>
        <Stack
          direction={{ base: 'row', lg: 'column' }}
          h="full"
          w="full"
          whiteSpace="nowrap"
          overflowY={{ base: 'hidden', lg: 'auto' }}
          overflowX={{ base: 'auto', lg: 'hidden' }}
        >
          {hashtag?.posts?.slice(0, 15).map((p, i) => (
            <Box
              key={i}
              borderWidth={1}
              borderColor="gray.500"
              rounded="lg"
              overflow="hidden"
              whiteSpace="nowrap"
              flexShrink={0}
            >
              <Navigate
                href={`/${hashtag?.page?.slug}/${hashtag?.slug}/${p?.slug}`}
              >
                <ChakraNextImage
                  w={150}
                  h={85}
                  image={p.image?.url as string}
                />
              </Navigate>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}
