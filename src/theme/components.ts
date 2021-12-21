export const components = {
  Link: {
    baseStyle: {
      _hover: {
        textDecor: 'none',
      },
    },
  },
  Button: {
    variants: {
      normal: {
        bg: 'primary.400',
        color: 'white',
        _hover: { bg: 'primary.300' },
      },
    },
  },
  Tabs: {
    parts: ['tabs', 'tablist', 'tab'],
    baseStyle: {
      tab: {
        color: 'gray.400',
        fontWeight: '600',
        borderBottomWidth: 2,
        _selected: {
          color: 'primary.400',
          borderColor: 'primary.400',
        },
      },
    },
  },
}
