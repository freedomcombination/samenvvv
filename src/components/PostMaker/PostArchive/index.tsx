import { useCallback, useEffect, useState } from 'react'

import {
  Box,
  chakra,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi'
import SwiperClass, { Thumbs } from 'swiper'
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react'

import { AnimatedBox, ChakraNextImage, ShareButtons } from '@components'
import { useHashtag } from '@lib'
import { getItemLink } from '@utils'

const SwiperBox = chakra(Swiper)

export const PostArchive = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>()
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [absoluteUrl, setAbsoluteUrl] = useState('')

  const hashtagQuery = useHashtag()

  const { locale } = useRouter()

  useEffect(() => {
    const _title = hashtagQuery.data?.posts[activeIndex].hashtag?.title || ''
    const _content = hashtagQuery.data?.posts[activeIndex].text || ''
    const _absoluteUrl =
      getItemLink(
        hashtagQuery.data?.posts[activeIndex] as Post,
        locale as StrapiLocale,
        'post',
        true,
      ) || ''

    setTitle(_title)
    setContent(_content)
    setAbsoluteUrl(_absoluteUrl)
  }, [activeIndex, locale, hashtagQuery.data?.posts])

  const onSlideChange = useCallback((swiper: SwiperClass) => {
    setActiveIndex(swiper.activeIndex)
  }, [])

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="6xl"
      >
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent bg="transparent">
          <ModalBody>
            <SwiperBox
              modules={[Thumbs]}
              thumbs={{ swiper: thumbsSwiper }}
              initialSlide={activeIndex}
              onSlideChange={onSlideChange}
            >
              {hashtagQuery.data?.posts.map((post, i) => {
                return (
                  <SwiperSlide key={i}>
                    {post.image && (
                      <ChakraNextImage
                        image={post.image?.url as string}
                        ratio="twitter"
                      />
                    )}
                  </SwiperSlide>
                )
              })}
            </SwiperBox>
            <SwiperBox
              mt={4}
              modules={[Thumbs]}
              slidesPerView={6}
              watchSlidesProgress
              onSwiper={setThumbsSwiper}
              sx={{
                '.swiper-slide': {
                  opacity: 0.3,
                  '&-thumb-active': {
                    opacity: 1,
                  },
                },
              }}
            >
              {hashtagQuery.data?.posts.map((post, i) => {
                return (
                  <SwiperSlide key={i}>
                    {post.image && (
                      <ChakraNextImage
                        image={post.image?.url as string}
                        ratio="twitter"
                      />
                    )}
                  </SwiperSlide>
                )
              })}
            </SwiperBox>
          </ModalBody>

          <ModalFooter justifyContent="space-between">
            <IconButton
              rounded="full"
              colorScheme="primary"
              aria-label="close modal"
              icon={<BiExitFullscreen />}
              onClick={onClose}
              size="lg"
            />

            <ShareButtons
              title={title}
              quote={content}
              url={absoluteUrl as string}
              size="lg"
              spacing={4}
              colorScheme="primary"
              variant="solid"
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {hashtagQuery.data?.posts.map((post, i) => {
          return (
            <AnimatedBox key={i} delay={i} directing="to-down" hasHover>
              <Box bg="white" shadow="primary" rounded="lg" overflow="hidden">
                {post.image && (
                  <ChakraNextImage
                    ratio="twitter"
                    image={post.image?.url as string}
                    minH={0}
                  />
                )}
                {post.text && (
                  <HStack
                    spacing={2}
                    px={6}
                    py={2}
                    justifyContent="space-evenly"
                    w="full"
                  >
                    <ShareButtons
                      title={post.hashtag?.title as string}
                      quote={post.text}
                      url={
                        getItemLink(
                          post as Post,
                          locale as StrapiLocale,
                          'post',
                          true,
                        ) as string
                      }
                      size="lg"
                      justifyContent="space-between"
                      w="full"
                    >
                      <IconButton
                        aria-label="full screen"
                        icon={<BiFullscreen />}
                        onClick={onOpen}
                        variant="outline"
                        rounded="full"
                        size="lg"
                      />
                    </ShareButtons>
                  </HStack>
                )}
              </Box>
            </AnimatedBox>
          )
        })}
      </SimpleGrid>
    </>
  )
}
