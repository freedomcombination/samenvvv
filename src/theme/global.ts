export const styles = {
  global: {
    body: {
      fontFamily: 'body',
      color: 'gray.900',
      bg: 'gray.50',
    },
    'h1, h2, h3, h4': {
      color: 'primary.400',
      fontWeight: 'bold',
    },
    '.swiper': {
      '&-pagination': {
        '&-bullets': {
          textAlign: 'right',
          top: 0,
        },
        '&-bullet': {
          boxSize: 4,
          bg: 'gray.500',

          '&-active': {
            bg: 'primary.400',
          },
        },
      },
      '&-button-next': {
        right: 0,
        '&:hover': {
          transform: 'translateX(5px)',
        },
      },
      '&-button-prev': {
        left: 0,
        '&:hover': {
          transform: 'translateX(-5px)',
        },
      },
      '&-button-prev, &-button-next': {
        color: 'primary.400',
        boxSize: 12,
        rounded: 'full',
        shadow: 0,
        transition: 'all 0.3s',
        opacity: 0.5,

        '.swiper:hover &': {
          opacity: 1,
        },

        '&::after': {
          fontSize: '2em',
          fontWeight: 'bold',
        },
      },
    },
  },
}
