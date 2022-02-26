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
import { getItemLink } from '@utils'

const SwiperBox = chakra(Swiper)

interface PostArchiveProps {
  posts: HashtagPostEntity[]
}

export const PostArchive = ({ posts }: PostArchiveProps): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>()
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [absoluteUrl, setAbsoluteUrl] = useState('')

  const { locale } = useRouter()

  useEffect(() => {
    const _title =
      posts[activeIndex]?.attributes?.hashtag?.data?.attributes?.title || ''
    const _content = posts[activeIndex]?.attributes?.text
    const _absoluteUrl =
      getItemLink(posts[activeIndex], locale as CommonLocale, true) || ''

    setTitle(_title || '')
    setContent(_content || '')
    setAbsoluteUrl(_absoluteUrl)
  }, [activeIndex, locale, posts])

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
              {posts.map((post, i) => {
                return (
                  <SwiperSlide key={i}>
                    {post?.attributes?.image?.data?.attributes && (
                      <ChakraNextImage
                        image={post?.attributes?.image}
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
              {posts.map((post, i) => (
                <SwiperSlide key={i}>
                  {post?.attributes?.image?.data?.attributes && (
                    <ChakraNextImage
                      image={post?.attributes?.image}
                      ratio="twitter"
                    />
                  )}
                </SwiperSlide>
              ))}
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
        {posts.map(
          ({ attributes: item }, i) =>
            item && (
              <AnimatedBox key={i} delay={i} directing="to-down" hasHover>
                <Box bg="white" shadow="primary" rounded="lg" overflow="hidden">
                  {item.image?.data?.attributes && (
                    <ChakraNextImage
                      ratio="twitter"
                      image={item.image}
                      minH={0}
                    />
                  )}
                  {item.text && (
                    <HStack
                      spacing={2}
                      px={6}
                      py={2}
                      justifyContent="space-evenly"
                      w="full"
                    >
                      <ShareButtons
                        title={item.hashtag?.data?.attributes?.title as string}
                        quote={item.text}
                        url={
                          getItemLink(
                            item as HashtagPostEntity,
                            locale as CommonLocale,
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
            ),
        )}
      </SimpleGrid>
    </>
  )
}
