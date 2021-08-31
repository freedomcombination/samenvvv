import {
  extendTheme,
  theme as chakraTheme,
  DeepPartial,
  ThemeConfig,
} from '@chakra-ui/react'

import { colors } from './colors'
import { components } from './components'
import { styles } from './global'

const fonts = { body: `'Rubik', sans-serif` }

const config: DeepPartial<ThemeConfig> = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  cssVarPrefix: 'rsk',
}

const theme = extendTheme({
  config,
  styles,
  colors: colors(chakraTheme),
  fonts,
  components,
  shadows: {
    outline: 'none',
  },
})

export default theme
