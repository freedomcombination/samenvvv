export const mdx = {
  a: {
    fontWeight: 600,
    transition: 'color 0.15s',
    transitionTimingFunction: 'ease-out',
    color: 'primary.400',
    _hover: {
      color: 'primary.500',
    },
  },
  p: {
    mt: 4,
    lineHeight: 1.5,
    'blockquote &': {
      mt: 0,
    },
  },
  hr: {
    my: '4rem',
  },
  blockquote: {
    bg: 'primary.50',
    borderWidth: '1px',
    borderColor: 'primary.400',
    rounded: 'lg',
    px: '1.25rem',
    py: '1rem',
    my: '1.5rem',
  },
  ul: {
    mt: '1.5rem',
    ml: '1.25rem',
    'blockquote &': { mt: 0 },
    '& > * + *': {
      mt: '0.25rem',
    },
  },
}
