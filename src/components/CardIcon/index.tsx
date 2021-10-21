/* eslint-disable import/no-duplicates */
import { Box, ChakraProps } from '@chakra-ui/react'

import { Navigate } from '@components'
// actually it will changed with a modal

interface CardIconProps extends ChakraProps {
  icon: JSX.Element
  iconColor: string
  iconSize?: string
  innerText?: string
  innerTextFontSize?: string
  innerTextColor?: string
  innerTextFontWeight?: string
  verticalPosition?: string
}
export const CardIcon = ({
  icon,
  iconColor,
  innerText,
  iconSize = '3xl',
  innerTextFontSize = 'xs',
  innerTextColor = 'white',
  innerTextFontWeight = 'semibold',
  verticalPosition = '-0.2rem',
}: CardIconProps): JSX.Element => {
  if (innerText)
    return (
      <Navigate href={'/'}>
        <Box pos="relative" color={iconColor} fontSize={iconSize}>
          {icon}
          <Box
            d="flex"
            flexDirection="column"
            top={verticalPosition}
            left="0"
            width="100%"
            height="100%"
            fontSize={innerTextFontSize}
            pos="absolute"
            color={innerTextColor}
            textAlign="center"
            justifyContent="center"
            fontWeight={innerTextFontWeight}
          >
            {innerText}
          </Box>
        </Box>
      </Navigate>
    )
  return (
    <Navigate href={'/'}>
      <Box color={iconColor} fontSize={iconSize}>
        {icon}
      </Box>
    </Navigate>
  )
}
