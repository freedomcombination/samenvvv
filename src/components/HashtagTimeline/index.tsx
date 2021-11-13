import {
  AspectRatio,
  Avatar,
  Box,
  HStack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FaPlayCircle } from 'react-icons/fa'
import ReactPlayer from 'react-player'

import { ChakraNextImage } from '@components'
import { getTwitterVideoUrl } from '@utils'

import twData from '../../data/twitter-data.json'

export const HashtagTimeline = (): JSX.Element => {
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      {twData.statuses.map((data, index) => {
        const tweetImg = data?.extended_entities?.media?.[0]?.media_url_https
        const profileImg = data?.user?.profile_image_url_https
        const videoVariants =
          data.extended_entities?.media[0].video_info.variants
        const videoImg = data.extended_entities?.media[0].media_url_https
        return (
          <HStack key={index} alignItems="flex-start">
            <Avatar size="sm" alt={data.user.name} src={profileImg} />

            <VStack align="start" fontSize="sm">
              <Text fontWeight="bold">{data.user.name}</Text>
              <Text lineHeight="1.5" wordBreak="break-all">
                {data.text}
              </Text>
              {videoVariants ? (
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
                    url={getTwitterVideoUrl(videoVariants as any)}
                    width="100%"
                    height="100%"
                    light={videoImg}
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
                tweetImg && <ChakraNextImage image={tweetImg} />
              )}
            </VStack>
          </HStack>
        )
      })}
    </VStack>
  )
}
