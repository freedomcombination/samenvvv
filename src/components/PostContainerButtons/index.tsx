import React, { useCallback, useEffect } from 'react'

import { Button, SimpleGrid } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { TwitterShareButton } from 'next-share'
import { useRouter } from 'next/router'
import { FaAt, FaRandom, FaTwitter } from 'react-icons/fa'

import { useCheckCharacterCount, useItemLink } from '@hooks'
import { setPostContent, useAppDispatch, useAppSelector } from '@store'
import { getItemLink } from '@utils'

interface PostContainerButtonsProps {
  post: IHashtagPost
  onOpen: () => void
}

export const PostContainerButtons = ({
  post,
  onOpen,
}: PostContainerButtonsProps) => {
  const { t } = useTranslation()
  const { push, locale } = useRouter()
  const { postContent, postText, mentionUsernames, trendNames } =
    useAppSelector(state => state.postShare)

  const postUrlAbsolute = useItemLink(post, true)

  const dispatch = useAppDispatch()

  const redirectToRandomPost = useCallback(() => {
    const randomPostIndex = Math.floor(
      Math.random() * (post?.posts?.length || 0),
    )

    const randomPost = post?.posts?.[randomPostIndex] as IHashtagPost
    randomPost.hashtag = post.hashtag
    const randomPostLink = getItemLink(randomPost, locale as string)

    push(randomPostLink as string)
  }, [post, locale, push])

  const [, isCharacterCountExceeded] = useCheckCharacterCount()

  useEffect(() => {
    const mentionsStr = mentionUsernames.join('\n')
    // prettier-ignore
    const trendsStr = post.hashtag?.hashtag + (trendNames.length > 0 ? '\n' + trendNames.join('\n') : '')
    const postContent = `${postText}\n\n${mentionsStr}\n\n${trendsStr}`

    dispatch(setPostContent(postContent))
  }, [postText, mentionUsernames, trendNames, post, dispatch, locale])

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
        onClick={onOpen}
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
          isDisabled={isCharacterCountExceeded}
        >
          {t`post-share.share-tweet`}
        </Button>
      </TwitterShareButton>
    </SimpleGrid>
  )
}