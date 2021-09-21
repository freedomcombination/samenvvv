import { FunctionComponent } from 'react'

import { Box, Heading, ChakraComponent, ChakraProps } from '@chakra-ui/react'
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Card } from '@components'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

SwiperCore.use([Autoplay, Pagination, Navigation])
interface SliderProps {
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
  as = Box,
  slidesPerView = 1,
  breakpoints = {
    481: {
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
  hasPagination = true,
  hasNavigation = true,
  items,
  activeProps,
  slideProps,
  chakraProps,
  heading,
}: SliderProps): JSX.Element => {
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
                    <Card event={item} {...(isActive && activeProps)} />
                  )}
                </SwiperSlide>
              ))
            : 'No data found'}
        </Box>
      </Box>
    </Box>
  )
}
