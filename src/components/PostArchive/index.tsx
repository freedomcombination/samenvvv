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
  posts: IHashtagPost[]
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
    const _title = posts[activeIndex].hashtag?.title || ''
    const _content = posts[activeIndex].text
    const _absoluteUrl =
      getItemLink(posts[activeIndex], locale as string, true) || ''

    setTitle(_title)
    setContent(_content)
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
                    <ChakraNextImage
                      image={post.image?.url as string}
                      ratio="twitter"
                    />
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
                  <ChakraNextImage
                    image={post.image?.url as string}
                    ratio="twitter"
                  />
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
        {posts.map((item, i) => (
          <AnimatedBox key={i} delay={i} directing="to-down" hasHover>
            <Box bg="white" shadow="lg" rounded="lg" overflow="hidden">
              <ChakraNextImage
                ratio="twitter"
                image={item.image?.url as string}
                minH={0}
              />
              {item.text && (
                <HStack
                  spacing={2}
                  px={6}
                  py={2}
                  justifyContent="space-evenly"
                  w="full"
                >
                  <ShareButtons
                    title={item.hashtag?.title as string}
                    quote={item.text}
                    url={
                      getItemLink(
                        item as IHashtagPost,
                        locale as string,
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
        ))}
      </SimpleGrid>
    </>
  )
}
