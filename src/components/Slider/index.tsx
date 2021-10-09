import { useState } from 'react'

import {
  Box,
  chakra,
  ChakraProps,
  CSSObject,
  Heading,
  ResponsiveValue,
  Skeleton,
  SkeletonText,
  Stack,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { mergeWith } from 'lodash'
import { Autoplay, Navigation } from 'swiper'
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react'

import { Card, Container, SliderHero } from '@components'

const SwiperBox = chakra(Swiper)

interface SliderProps {
  heading: string
  children: JSX.Element[]
  slides: ResponsiveValue<number>
  spaces: ResponsiveValue<number>
  items: SubpageType[]
  activeStyles: ChakraProps
  customStyles: ChakraProps
  swiperStyles: CSSObject
  isLoading: boolean
  hasHero: boolean
  hasSimpleCard: boolean
}

const defaultSwiperProps: Swiper = {
  modules: [Autoplay, Navigation],
  navigation: true,
  autoplay: {
    disableOnInteraction: true,
  },
  loop: true,
  centeredSlides: true,
}

export const Slider = ({
  slides = [1, null, 2, 3, 4],
  spaces = 30,
  items,
  activeStyles = {},
  customStyles = {},
  heading,
  children,
  swiperStyles = {},
  isLoading = false,
  hasHero = false,
  hasSimpleCard = false,
  ...rest
}: Partial<SliderProps & Swiper>): JSX.Element => {
  const responsiveSlidesPerView = useBreakpointValue(slides as number[]) || 1
  const responsiveSpaceBetween = useBreakpointValue(spaces as number[]) || 30
  const [activeIndexNumber, setActiveIndex] = useState(-1)
  const onIndexChangeHandler = ({ activeIndex }: { activeIndex: number }) => {
    hasHero && items && setActiveIndex((activeIndex + 3) % items.length)
  }
  return (
    <Container>
      <Box
        sx={mergeWith(
          // Default pagination styles
          {
            '.swiper': {
              '&-pagination': {
                top: 0,
                textAlign: 'right',
                bottom: 'unset',
              },
            },
          },
          // Override default pagination styles
          swiperStyles,
        )}
      >
        {heading && (
          <Heading size="xl" my={6}>
            {heading}
          </Heading>
        )}
        {hasHero &&
          (isLoading ? (
            <Stack
              align={'center'}
              spacing={{ base: 8, md: 10 }}
              direction={{ base: 'column', md: 'row' }}
            >
              <VStack
                flex={1}
                spacing={{ base: 5, md: 10 }}
                align="stretch"
                p={4}
              >
                <SkeletonText w={50} noOfLines={1} mt={4} />
                <SkeletonText w={150} noOfLines={1} mt={4} />
                <SkeletonText noOfLines={3} mt={4} />
                <SkeletonText w={100} noOfLines={1} mt={4} />
              </VStack>
              <Skeleton flex={1} h={300} rounded={'2xl'} />
            </Stack>
          ) : (
            <SliderHero items={items} currentIndex={activeIndexNumber} />
          ))}
        <SwiperBox
          slidesPerView={responsiveSlidesPerView}
          spaceBetween={responsiveSpaceBetween}
          py={6}
          onActiveIndexChange={onIndexChangeHandler}
          {...mergeWith({ ...defaultSwiperProps, ...rest })}
        >
          {/* Render custom children if it's provided instead of default Card list */}
          {isLoading
            ? new Array(5).fill(0).map((_, i) => (
                <SwiperSlide key={i}>
                  <Box borderRadius="lg" boxShadow="sm" overflow="hidden">
                    <Skeleton h={150} />
                    <VStack align="stretch" spacing={6} p={4}>
                      <SkeletonText w={50} noOfLines={1} mt={4} />
                      <SkeletonText w={150} noOfLines={1} mt={4} />
                      <SkeletonText noOfLines={3} mt={4} />
                      <SkeletonText w={100} noOfLines={1} mt={4} />
                    </VStack>
                  </Box>
                </SwiperSlide>
              ))
            : children?.map((child, i) => (
                <SwiperSlide key={i}>
                  {({ isActive }) => (
                    <Box {...(isActive && activeStyles)}>{child}</Box>
                  )}
                </SwiperSlide>
              )) ||
              items?.map((item, i) => (
                <SwiperSlide key={i}>
                  {({ isActive }) => {
                    return (
                      <Card
                        item={item}
                        _hover={{
                          transform: 'translateY(-5px)',
                          boxShadow: hasSimpleCard ? 'none' : 'lg',
                        }}
                        {...customStyles}
                        {...(isActive && activeStyles)}
                        isSimple={hasSimpleCard}
                      />
                    )
                  }}
                </SwiperSlide>
              )) ||
              'No data found'}
        </SwiperBox>
      </Box>
    </Container>
  )
}
