import { memo, useCallback, useEffect } from 'react'

import { Flex, IconButton, Stack, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { FaRandom } from 'react-icons/fa'

import { setPostText, useAppDispatch } from '@store'
import { getRandomPostSentence } from '@utils'

import { Caps } from './Caps'
import { PostCharCount } from './PostCharCount'
import { PostContainerBody } from './PostContainerBody'
import { PostContainerButtons } from './PostContainerButtons'

export const PostContainer = memo<{ post: IHashtagPost }>(
  function PostContainer({ post }) {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()
    const { locale } = useRouter()

    // Move to utils/hooks for testing
    const generateRandomPostText = useCallback<() => void>(() => {
      const randomPostSentence = getRandomPostSentence(locale as CommonLocale)
      const postLength = post.text.split('.').length

      const combinationArray = [...Array(postLength)].map((_, i) => i)
      const combinations = combinationArray.flatMap((v, i) =>
        combinationArray.slice(i + 1).map(w => [v, w]),
      )

      const randomCombination =
        combinations[Math.floor(Math.random() * combinations.length)]

      const randomPostText = post.text
        .replace(/\.\.+/g, '.') // remove multiple dots
        .split('.')
        .slice(randomCombination[0], randomCombination[1])
        .join('.')
        .trim()

      const combinedText = `${randomPostText}\n\n"${randomPostSentence}"`

      if (randomPostText === '' || combinedText.length > 230) {
        generateRandomPostText()
      } else {
        dispatch(setPostText(combinedText))
      }
    }, [dispatch, post, locale])

    useEffect(() => {
      generateRandomPostText()
    }, [])

    return (
      <Stack
        p={4}
        shadow="primary"
        bg="orange.50"
        align="stretch"
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
            <PostCharCount />
          </Flex>
          <Stack
            spacing={0}
            overflow="auto"
            pos="relative"
            h={{ base: 470, xl: 520 }}
          >
            <IconButton
              pos="absolute"
              top={1}
              right={1}
              rounded="full"
              colorScheme="twitter"
              aria-label="random post"
              icon={<FaRandom />}
              onClick={generateRandomPostText}
            />
            <PostContainerBody post={post} />
          </Stack>
          <PostContainerButtons post={post} />
        </VStack>
        <Caps post={post} />
      </Stack>
    )
  },
)
