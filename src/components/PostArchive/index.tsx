import { useEffect, useMemo, useState } from 'react'

import {
  Box,
  chakra,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  SimpleGrid,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FaTimes } from 'react-icons/fa'
import SwiperClass, { Thumbs } from 'swiper'
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react'

import { AnimatedBox, ChakraNextImage, ShareButtons } from '@components'
import { useItemLink } from '@hooks'
import { getItemLink } from '@utils'

const SwiperBox = chakra(Swiper)

interface PostArchiveProps {
  posts: IHashtagPost[]
}

export const PostArchive = ({ posts }: PostArchiveProps): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>()
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const { locale } = useRouter()

  const isMobile = useBreakpointValue({ base: true, md: false })

  const absoluteUrl = useItemLink(posts[activeIndex], true)

  const [title, content] = useMemo(() => {
    const { hashtag, text } = posts[activeIndex]
    return [hashtag?.title, text]
  }, [activeIndex, posts])

  useEffect(() => {
    if (thumbsSwiper) {
      setActiveIndex(thumbsSwiper.activeIndex)
    }
  }, [thumbsSwiper])

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
              slidesPerView={1}
              thumbs={{ swiper: thumbsSwiper }}
              initialSlide={activeIndex}
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
              onClick={setThumbsSwiper}
              onSwiper={setThumbsSwiper}
            >
              {posts.map((post, i) => (
                <SwiperSlide key={i}>
                  {({ isActive }) => (
                    <ChakraNextImage
                      opacity={isActive ? 1 : 0.3}
                      image={post.image?.url as string}
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
              variant="ghost"
              colorScheme="blackAlpha"
              color="white"
              aria-label="close modal"
              icon={<FaTimes />}
              onClick={onClose}
            />
            {title && (
              <ShareButtons
                title={title}
                quote={content}
                url={absoluteUrl as string}
                size="lg"
                spacing={4}
                colorScheme="primary"
                variant="solid"
              />
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {posts.map((item, i) => (
          <AnimatedBox key={i} delay={i} directing="to-down" hasHover>
            <Box
              {...(!isMobile && { onClick: onOpen })}
              bg="white"
              shadow="lg"
              rounded="lg"
              overflow="hidden"
            >
              <ChakraNextImage
                ratio="twitter"
                image={item.image?.url as string}
                minH={0}
              />
              {isMobile && item.text && (
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
                  p={2}
                  justifyContent="space-evenly"
                  w="full"
                />
              )}
            </Box>
          </AnimatedBox>
        ))}
      </SimpleGrid>
    </>
  )
}
