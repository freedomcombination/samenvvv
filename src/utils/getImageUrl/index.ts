export type GetImageUrlType = (
  image: ImageResponseType | string,
  type?: ImageFormatsType,
) => string

export const getImageUrl: GetImageUrlType = (image, type?) => {
  const basePath = process.env.NEXT_PUBLIC_ADMIN_URL
  if (image == null) return ''

  if (typeof image === 'string')
    return image.startsWith('http') || image.startsWith('//')
      ? image
      : `${basePath}${image}`

  const imagePath = (type && image.formats[type]?.url) || image.url

  return `${basePath}${imagePath}`
}
