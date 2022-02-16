import { Box, BoxProps } from '@chakra-ui/layout'
import { motion } from 'framer-motion'

export const MotionBox = motion<Omit<BoxProps, 'transition'>>(Box)
