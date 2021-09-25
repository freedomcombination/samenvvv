import { FunctionComponent } from 'react'

import { Box, ChakraComponent, ChakraProps, Heading } from '@chakra-ui/react'
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper'
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react'

import { Card } from '@components'

SwiperCore.use([Autoplay, Pagination, Navigation])
interface CardSliderProps {
  as: ChakraComponent<any, any>
  slidesPerView?: number
  breakpoints?: any
  hasPagination?: boolean
  hasNavigation?: boolean
  items?: JSX.Element[]
  activeProps?: any
  slideProps?: FunctionComponent<Swiper>
  chakraProps?: ChakraProps
  heading?: string
}

export const CardSlider = ({
  slidesPerView = 1,
  breakpoints = {
    521: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    798: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1201: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
    1441: {
      slidesPerView: 5,
      spaceBetween: 15,
    },
  },
  hasPagination = false,
  hasNavigation = true,
  items,
  activeProps,
  slideProps,
  heading,
}: CardSliderProps): JSX.Element => {
  return (
    <Box backgroundColor="primary.400">
      <Box
        width="100%"
        px="2rem"
        py="1rem"
        d="flex"
        flexDirection="column"
        align="baseline"
        justify="center"
        overflow="hidden"
      >
        <Box my={6}>
          <Heading size="xl" color="white" px="0.5rem">
            {heading}
          </Heading>
        </Box>

        <Box
          as={Swiper}
          slidesPerView={slidesPerView}
          spaceBetween={10}
          breakpoints={breakpoints}
          pagination={
            hasPagination && {
              clickable: true,
            }
          }
          navigation={hasNavigation && {}}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          width="100%"
          mb="2rem"
          py="1rem"
          px="0.5rem"
          {...slideProps}
        >
          {items
            ? items.map((item, i) => (
                <SwiperSlide key={i}>
                  {({ isActive }) => (
                    <Card item={item} {...(isActive && activeProps)} />
                  )}
                </SwiperSlide>
              ))
            : 'No data found'}
        </Box>
      </Box>
    </Box>
  )
}
