import { useCallback, useEffect } from 'react'

import { Flex, IconButton, Stack, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { FaRandom } from 'react-icons/fa'

import { useCheckCharacterCount } from '@hooks'
import { setPostText, useAppDispatch } from '@store'
import { getRandomPostSentence } from '@utils'

import { Caps } from './Caps'
import { PostCharCount } from './PostCharCount'
import { PostContainerBody } from './PostContainerBody'
import { PostContainerButtons } from './PostContainerButtons'

export const PostContainer = ({ post }: { post: IHashtagPost }) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { locale } = useRouter()
  const { onChange } = useCheckCharacterCount()

  const generateRandomPostText = useCallback(() => {
    const randomPostSentence = getRandomPostSentence(locale as string)
    const combinations = [
      [0, 1],
      [1, 2],
      [2, 3],
      [0, 2],
      [1, 3],
    ]
    const randomCombination =
      combinations[Math.floor(Math.random() * (combinations.length - 1))]

    const randomPostText = post.text
      .split('.')
      .slice(randomCombination[0], randomCombination[1])
      .join('.')
      .trim()

    const combinedText = `${randomPostText}\n\n"${randomPostSentence}"`

    onChange(combinedText)
    dispatch(setPostText(combinedText))
  }, [dispatch, locale, post, onChange])

  useEffect(() => {
    generateRandomPostText()
  }, [generateRandomPostText])

  return (
    <Stack
      p={4}
      shadow="md"
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
}
