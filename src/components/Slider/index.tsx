import { useState } from 'react'

import {
  Box,
  chakra,
  ChakraProps,
  Container,
  CSSObject,
  Heading,
  ResponsiveValue,
  Skeleton,
  SkeletonText,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { mergeWith } from 'lodash'
import { Autoplay, Navigation } from 'swiper'
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react'

import { Card, SliderHero } from '@components'

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
  withHero: boolean
  simpleCard: boolean
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
  withHero = false,
  simpleCard = false,
  ...rest
}: Partial<SliderProps & Swiper>): JSX.Element => {
  const responsiveSlidesPerView = useBreakpointValue(slides as number[]) || 1
  const responsiveSpaceBetween = useBreakpointValue(spaces as number[]) || 30
  const [activeIndexNumber, setActiveIndex] = useState(-1)
  const onIndexChangeHandler = (aIndex: number) => {
    items && setActiveIndex((aIndex + 3) % items.length)
  }
  return (
    <Container maxW={'8xl'}>
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
        {withHero && !isLoading && (
          <SliderHero items={items} index={activeIndexNumber} />
        )}
        <SwiperBox
          slidesPerView={responsiveSlidesPerView}
          spaceBetween={responsiveSpaceBetween}
          py={6}
          onActiveIndexChange={
            withHero
              ? ({ activeIndex }: { activeIndex: number }) =>
                  onIndexChangeHandler(activeIndex)
              : undefined
          }
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
                          boxShadow: simpleCard ? 'none' : 'lg',
                        }}
                        {...customStyles}
                        {...(isActive && activeStyles)}
                        simpleCard={simpleCard}
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
