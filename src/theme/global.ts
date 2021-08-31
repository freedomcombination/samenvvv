export const styles = {
  global: {
    body: {
      fontFamily: 'body',
      color: 'gray.900',
      bg: 'gray.50',
    },
    'h1, h2, h3, h4, a': {
      bgGradient: 'linear(to-b, primary.300,primary.500)',
      bgClip: 'text',
      fontWeight: 'bold',
    },
    '.swiper-pagination': {
      textAlign: 'left',
      '&-bullets': {
        h: 0,
        pr: 8,
        top: 4,
        textAlign: { base: 'center', md: 'right' },
      },
      '&-bullet': {
        boxSize: 6,
        bg: 'dark.100',

        '&-active': {
          bgGradient: 'linear(to-b, primary.300,primary.500)',
        },
      },
    },
  },
}
