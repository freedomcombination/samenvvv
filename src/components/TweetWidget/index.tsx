import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  HStack,
  Image,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai'
import { FaPlayCircle } from 'react-icons/fa'
import ReactPlayer from 'react-player'

import { ChakraNextImage } from '@components'
import { getTwitterVideoUrl } from '@utils'

import { Navigate } from '../Navigate'

interface TweetWidgetProps {
  title: string
  tweets?: ITweet[]
}

export const TweetWidget = ({
  title,
  tweets,
}: TweetWidgetProps): JSX.Element => {
  const { t } = useTranslation()

  return (
    <VStack align="stretch" justify="stretch" h={640}>
      <Text color="gray.500" fontSize="sm">
        {title}
      </Text>
      <Box bg="white" p={4} overflow="auto" shadow="md">
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          {tweets && tweets.length > 0 ? (
            tweets.map((data, index) => {
              const { id, user, text, videos, image, likes } = data
              return (
                <HStack key={index} alignItems="flex-start">
                  <Avatar size="sm" alt={user.name} src={user.profile} />

                  <Stack fontSize="sm">
                    <Text noOfLines={1} fontWeight="bold">
                      {user.name}{' '}
                      <Text as="span" fontSize="xs" fontWeight="normal">
                        @{user.username}
                      </Text>
                    </Text>
                    <Text lineHeight="1.5" whiteSpace="pre-line">
                      {text}
                    </Text>
                    {videos ? (
                      <AspectRatio
                        ratio={16 / 9}
                        w="full"
                        rounded="lg"
                        overflow="hidden"
                      >
                        <ReactPlayer
                          muted
                          playing
                          style={{ width: '100%' }}
                          url={getTwitterVideoUrl(videos)}
                          width="100%"
                          height="100%"
                          light={image}
                          playIcon={
                            <Box
                              boxSize={12}
                              color="whiteAlpha.700"
                              as={FaPlayCircle}
                            />
                          }
                        />
                      </AspectRatio>
                    ) : (
                      image && (
                        <ChakraNextImage
                          ratio="twitter"
                          w="full"
                          image={image}
                        />
                      )
                    )}
                    <ButtonGroup size="sm" variant="ghost">
                      <Button
                        fontWeight="normal"
                        as={Navigate}
                        href={`https://twitter.com/intent/like?tweet_id=${id}`}
                        leftIcon={<AiOutlineHeart />}
                      >
                        {likes}
                      </Button>
                      <Button
                        fontWeight="normal"
                        as={Navigate}
                        href={`https://twitter.com/intent/retweet?tweet_id=${id}`}
                        leftIcon={<AiOutlineRetweet />}
                      >
                        {likes}
                      </Button>
                    </ButtonGroup>
                  </Stack>
                </HStack>
              )
            })
          ) : (
            <Stack textAlign="center">
              <Image src="/images/tweet-widget.svg" alt="no tweets" />
              <Text>{t`post-share.no-tweet`}</Text>
            </Stack>
          )}
        </VStack>
      </Box>
    </VStack>
  )
}
