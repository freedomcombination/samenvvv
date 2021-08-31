import { getImageUrl } from '.'

const mockImage = {
  url: '/test.jpg',
  formats: {
    small: {
      url: '/small-test.jpg',
    },
  },
}

test('basic', () => {
  const url = getImageUrl(mockImage as ImageResponseType)
  const expectingUrl = `${process.env.NEXT_PUBLIC_ADMIN_URL}/test.jpg`

  expect(url).toEqual(expectingUrl)
})

test('with-format', () => {
  const smaillImageUrl = getImageUrl(mockImage as ImageResponseType, 'small')
  const expectingUrl = `${process.env.NEXT_PUBLIC_ADMIN_URL}/small-test.jpg`

  expect(smaillImageUrl).toEqual(expectingUrl)
})

export {}
