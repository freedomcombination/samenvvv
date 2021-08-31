import { FunctionComponent } from 'react'

import { Box, ChakraComponent, ChakraProps } from '@chakra-ui/react'
import SwiperCore, { Pagination } from 'swiper'
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react'

SwiperCore.use([Pagination])

interface SliderProps {
  as: ChakraComponent<any, any>
  slidesPerView?: number
  hasPagination?: boolean
  items?: JSX.Element[]
  activeProps?: any
  slideProps?: FunctionComponent<Swiper>
  chakraProps?: ChakraProps
}

export const Slider = ({
  as = Box,
  slidesPerView = 1,
  hasPagination = true,
  items,
  activeProps,
  slideProps,
  chakraProps,
}: SliderProps): JSX.Element => {
  const Tag = as

  return (
    <Box
      as={Swiper}
      slidesPerView={slidesPerView}
      pagination={
        hasPagination && {
          clickable: true,
        }
      }
      {...slideProps}
    >
      {items
        ? items.map((item, i) => (
            <SwiperSlide key={i}>
              {({ isActive }) => (
                <Tag
                  w="full"
                  h="full"
                  {...(isActive && activeProps)}
                  {...chakraProps}
                >
                  {item}
                </Tag>
              )}
            </SwiperSlide>
          ))
        : 'No data found'}
    </Box>
  )
}
