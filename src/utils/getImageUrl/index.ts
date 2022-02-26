export type GetImageUrlType = (
  image: UploadFileEntityResponse | string,
  type?: any,
) => string

export const getImageUrl: GetImageUrlType = (image, type?) => {
  const basePath = process.env.NEXT_PUBLIC_ADMIN_URL
  if (typeof image !== 'string' && image?.data == null) return ''

  if (typeof image === 'string')
    return image.startsWith('http') ? image : `${basePath}${image}`

  const imagePath =
    (type &&
      image?.data?.attributes?.formats &&
      image?.data?.attributes?.formats[type].url) ||
    image?.data?.attributes?.url

  return `${basePath}${imagePath}`
}
