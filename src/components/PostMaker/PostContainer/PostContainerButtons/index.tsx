import React, { memo, useCallback } from 'react'

import { Button, SimpleGrid } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { TwitterShareButton } from 'next-share'
import { useRouter } from 'next/router'
import { FaAt, FaRandom, FaTwitter } from 'react-icons/fa'

import { useItemLink } from '@hooks'
import { togglePostModal, useAppDispatch, useAppSelector } from '@store'
import { getItemLink } from '@utils'

export const PostContainerButtons = memo<{
  post: HashtagPostEntity
}>(function PostContainerButtons({ post }) {
  const { t } = useTranslation()
  const { push, locale } = useRouter()
  const { postContent } = useAppSelector(state => state.postShare)

  const dispatch = useAppDispatch()
  const { isExceeded } = useAppSelector(state => state.postShare)

  const postUrlAbsolute = useItemLink(post, true)

  const redirectToRandomPost = useCallback(() => {
    const randomPostIndex = Math.floor(
      Math.random() *
        (post?.attributes?.hashtag?.data?.attributes?.posts?.data?.length || 0),
    )

    const randomPost = post?.attributes?.hashtag?.data?.attributes?.posts
      ?.data?.[randomPostIndex] as HashtagPost
    randomPost.hashtag = post?.attributes?.hashtag
    const randomPostLink = getItemLink(
      { attributes: randomPost },
      locale as CommonLocale,
    )

    push(randomPostLink as string)
  }, [locale, push, post])

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
          colorScheme="twitter"
          rightIcon={<FaTwitter />}
          isDisabled={isExceeded}
          disabled={isExceeded}
        >
          {t`post-share.share-tweet`}
        </Button>
      </TwitterShareButton>
    </SimpleGrid>
  )
})
