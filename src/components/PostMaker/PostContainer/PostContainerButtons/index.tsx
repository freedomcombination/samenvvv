import React, { memo, useCallback, useEffect } from 'react'

import { Button, SimpleGrid } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { TwitterShareButton } from 'next-share'
import { useRouter } from 'next/router'
import { FaAt, FaCheck, FaRandom, FaTwitter } from 'react-icons/fa'

import { useItemLink } from '@hooks'
import {
  setIsShared,
  togglePostModal,
  useAppDispatch,
  useAppSelector,
} from '@store'
import { getItemLink } from '@utils'

export const PostContainerButtons = memo<{ post: IHashtagPost }>(
  function PostContainerButtons({ post }) {
    const { t } = useTranslation()
    const { push, locale } = useRouter()
    const { postContent, isExceeded, isShared } = useAppSelector(
      state => state.postShare,
    )

    const dispatch = useAppDispatch()

    useEffect(() => {
      const sharedPostsStorage = localStorage.getItem(
        post.hashtag?.slug as string,
      )
      const sharedPosts = JSON.parse(sharedPostsStorage || '[]')
      dispatch(setIsShared(sharedPosts.includes(post.slug)))
    }, [dispatch, post.hashtag?.slug, post.slug])

    const postUrlAbsolute = useItemLink(post, true)

    const redirectToRandomPost = useCallback(() => {
      const randomPostIndex = Math.floor(
        Math.random() * (post.posts?.length || 0),
      )

      const randomPost = post.posts?.[randomPostIndex] as IHashtagPost
      randomPost.hashtag = post.hashtag
      const randomPostLink = getItemLink(randomPost, locale as CommonLocale)

      push(randomPostLink as string)
    }, [post, locale, push])

    const onPostSharing = () => {
      const sharedPosts = localStorage.getItem(post.hashtag?.slug as string)
      if (!sharedPosts) {
        window.localStorage.setItem(
          post.hashtag?.slug as string,
          JSON.stringify([post.slug]),
        )
      } else {
        window.localStorage.setItem(
          post.hashtag?.slug as string,
          JSON.stringify([...JSON.parse(sharedPosts), post.slug]),
        )
      }
    }

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
          {t`post-share.add-mention`}
        </Button>
        <Button
          data-tour-mob="step-next-button"
          data-tour="step-next-button"
          isFullWidth
          rounded="full"
          colorScheme="primary"
          onClick={redirectToRandomPost}
          rightIcon={<FaRandom />}
        >
          {t`post-share.next-tweet`}
        </Button>
        <TwitterShareButton title={postContent} url={postUrlAbsolute as string}>
          <Button
            data-tour="step-share-button"
            data-tour-mob="step-share-button"
            as="span"
            isFullWidth
            rounded="full"
            colorScheme={isShared ? 'green' : 'twitter'}
            rightIcon={<FaTwitter />}
            leftIcon={isShared ? <FaCheck /> : undefined}
            isDisabled={isExceeded}
            disabled={isExceeded}
            onClick={() => onPostSharing()}
          >
            {t`post-share.share-tweet`}
          </Button>
        </TwitterShareButton>
      </SimpleGrid>
    )
  },
)
