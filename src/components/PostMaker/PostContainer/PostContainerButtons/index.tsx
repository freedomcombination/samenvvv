import React, { useCallback } from 'react'

import { Button, SimpleGrid } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { TwitterShareButton } from 'next-share'
import { FaAt, FaRandom, FaTwitter } from 'react-icons/fa'

import { useItemLink } from '@hooks'
import {
  setPost,
  togglePostModal,
  useAppDispatch,
  useAppSelector,
} from '@store'

export const PostContainerButtons = () => {
  const { t } = useTranslation()
  const { postContent, post, hashtag } = useAppSelector(state => state.post)

  const dispatch = useAppDispatch()
  const { isExceeded } = useAppSelector(state => state.post)

  const postUrlAbsolute = useItemLink(post as Post, 'hashtag', true)

  const setRandomPost = useCallback(() => {
    const randomPostIndex = Math.floor(
      Math.random() * (hashtag?.posts?.length || 0),
    )

    const randomPost = hashtag?.posts?.[randomPostIndex] as Post

    dispatch(setPost(randomPost))
  }, [hashtag?.posts, dispatch])

  return (
    <SimpleGrid
      columns={{ base: 1, xl: 2 }}
      spacing={2}
      mt="auto"
      flex={1}
      alignContent="end"
    >
      <Button
        data-tour-mob="step-mention-button"
        display={{ base: 'flex', lg: 'none' }}
        isFullWidth
        rounded="full"
        colorScheme="purple"
        onClick={() => dispatch(togglePostModal())}
        rightIcon={<FaAt />}
      >
        {t`post.add-mention`}
      </Button>
      <Button
        data-tour-mob="step-next-button"
        data-tour="step-next-button"
        isFullWidth
        rounded="full"
        colorScheme="primary"
        onClick={setRandomPost}
        rightIcon={<FaRandom />}
      >
        {t`post.next-tweet`}
      </Button>
      <TwitterShareButton title={postContent} url={postUrlAbsolute as string}>
        <Button
          data-tour="step-share-button"
          data-tour-mob="step-share-button"
          as="span"
          isFullWidth
          rounded="full"
          colorScheme="twitter"
          rightIcon={<FaTwitter />}
          isDisabled={isExceeded}
          disabled={isExceeded}
        >
          {t`post.share-tweet`}
        </Button>
      </TwitterShareButton>
    </SimpleGrid>
  )
}
