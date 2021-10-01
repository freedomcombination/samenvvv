export const components = {
  Link: {
    baseStyle: {
      _hover: {
        textDecor: 'none',
      },
    },
  },
  Button: {
    baseStyle: {
      zIndex: 2,
      borderRadius: 'md',
    },
    variants: {
      reverse: {
        borderWidth: 1,
        borderColor: 'primary.400',
        color: 'primary.400',
        _hover: {
          color: 'primary.600',
          bg: 'primary.50',
        },
      },
      normal: {
        bg: 'primary.400',
        color: 'white',
        _hover: { bg: 'primary.300' },
      },
    },
  },
}
