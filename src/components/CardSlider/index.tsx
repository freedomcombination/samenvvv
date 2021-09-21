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
      <Box>
        <Box my={6}>
          <Heading size="xl" color="white" px="0.5rem">
            {heading}
          </Heading>
        </Box>

        <Box {...slideProps}></Box>
      </Box>
    </Box>
  )
}
