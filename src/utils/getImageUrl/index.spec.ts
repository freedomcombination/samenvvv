import { getImageUrl } from '@utils'

const mockImage = {
  url: '/test.jpg',
  formats: {
    small: {
      url: '/small-test.jpg',
    },
  },
}

test('basic', () => {
  const url = getImageUrl(mockImage as IUploadFile)
  const expectingUrl = `${process.env.NEXT_PUBLIC_ADMIN_URL}/test.jpg`

  expect(url).toEqual(expectingUrl)
})

test('with-format', () => {
  const smaillImageUrl = getImageUrl(mockImage as IUploadFile, 'small')
  const expectingUrl = `${process.env.NEXT_PUBLIC_ADMIN_URL}/small-test.jpg`

  expect(smaillImageUrl).toEqual(expectingUrl)
})

export {}
