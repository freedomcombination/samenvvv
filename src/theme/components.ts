export const components = {
  Link: {
    baseStyle: {
      bgGradient: 'linear(to-b, primary.300,primary.500)',
      bgClip: 'text',
      _hover: {
        bgGradient: 'linear(to-t, primary.300,primary.500)',
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
        borderColor: 'primary.500',
        color: 'primary.500',
        _hover: {
          color: 'primary.600',
          bg: 'primary.50',
        },
      },
      normal: {
        bg: 'primary.500',
        bgGradient: 'linear(to-b, primary.300,primary.500)',
        color: 'white',
        _hover: { bgGradient: 'linear(to-t, primary.300, primary.500)' },
      },
    },
  },
}
