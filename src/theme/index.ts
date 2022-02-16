import {
  theme as chakraTheme,
  DeepPartial,
  extendTheme,
  ThemeConfig,
} from '@chakra-ui/react'

import { colors } from './colors'
import { components } from './components'
import { styles } from './global'
import { mdx } from './mdx'

const fonts = { body: `'Rubik', sans-serif` }

const config: DeepPartial<ThemeConfig> = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  styles,
  colors: colors(chakraTheme),
  fonts,
  components,
  shadows: {
    outline: 'none',
    primary: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;',
  },
  mdx,
})

export default theme
