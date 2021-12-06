import React, { ReactNode, useEffect } from 'react'

import { BoxProps } from '@chakra-ui/react'
import { MotionProps, Transition, useAnimation, Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import { MotionBox } from '@components'

interface AnimatedBoxProps {
  children: ReactNode
  directing: 'to-up' | 'to-down' | 'to-left' | 'to-right'
  distance: number
  hasHover: boolean
  delay: number
  duration: number
  isFullWidth: boolean
  transition: Transition
  variants: Variants
}

export const AnimatedBox = (
  props: Partial<AnimatedBoxProps> & MotionProps & BoxProps,
): JSX.Element => {
  const {
    children,
    directing,
    distance = 50,
    hasHover = false,
    delay = 0,
    duration = 1,
    variants,
  } = props
  const controls = useAnimation()
  const [ref, inView] = useInView()

  const initialVariants: Record<string, Variants> = {
    'to-up': {
      active: { opacity: 1, y: 0 },
      inactive: { opacity: 0, y: distance },
    },
    'to-down': {
      active: { opacity: 1, y: 0 },
      inactive: { opacity: 0, y: -distance },
    },
    'to-left': {
      active: { opacity: 1, x: 0 },
      inactive: { opacity: 0, x: distance },
    },
    'to-right': {
      active: { opacity: 1, x: 0 },
      inactive: { opacity: 0, x: -distance },
    },
  }

  useEffect(() => {
    if (inView) {
      controls.start('active')
    }
  }, [controls, inView])

  const transitionMerge = {
    duration: duration ?? 0.5,
    stiffness: 100,
    damping: 10,
    type: 'spring',
    delay: delay / 10,
  }

  return (
    <MotionBox
      ref={ref}
      animate={controls}
      transition={transitionMerge}
      initial="inactive"
      style={{ width: '100%' }}
      {...(variants && { variants: variants })}
      {...(directing && { variants: initialVariants[directing] })}
      {...(hasHover && {
        cursor: 'pointer',
        whileHover: { scale: 1.05, type: 'spring' },
        whileTap: { scale: 1.02 },
      })}
      {...props}
    >
      {children}
    </MotionBox>
  )
}
