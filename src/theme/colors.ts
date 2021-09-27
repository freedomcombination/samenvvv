import { Colors, Theme } from '@chakra-ui/react'
import { darken, lighten } from '@chakra-ui/theme-tools'

const generateColorPalette = (color: string, theme: Theme): Colors => ({
  50: lighten(color, 45)(theme),
  100: lighten(color, 40)(theme),
  200: lighten(color, 30)(theme),
  300: lighten(color, 15)(theme),
  400: lighten(color, 5)(theme),
  500: darken(color, 0)(theme),
  600: darken(color, 7)(theme),
  700: darken(color, 12)(theme),
  800: darken(color, 18)(theme),
  900: darken(color, 23)(theme),
})

const ORANGE = '#ff4f00'

export const colors = (theme: Theme): { primary: Colors } => ({
  primary: generateColorPalette(ORANGE, theme),
})
