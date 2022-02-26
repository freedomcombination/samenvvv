import { getImageUrl } from '@utils'

const mockImage = {
  data: {
    attributes: {
      url: '/test.jpg',
    },
  },
}

test('basic', () => {
  const url = getImageUrl(mockImage as UploadFileEntityResponse)
  const expectingUrl = `${process.env.NEXT_PUBLIC_ADMIN_URL}/test.jpg`

  expect(url).toEqual(expectingUrl)
})

export {}
