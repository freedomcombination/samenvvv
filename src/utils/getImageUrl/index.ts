export type GetImageUrlType = (
  image: IUploadFile | string,
  type?: FileFormatsType,
) => string

export const getImageUrl: GetImageUrlType = (image, type?) => {
  const basePath = process.env.NEXT_PUBLIC_ADMIN_URL
  if (image == null) return ''

  if (typeof image === 'string')
    return image.startsWith('http') ? image : `${basePath}${image}`

  const imagePath =
    (type && image.formats && image.formats[type].url) || image.url

  return `${basePath}${imagePath}`
}
