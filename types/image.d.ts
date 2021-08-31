declare type ImageFormatsType = 'large' | 'small' | 'medium' | 'thumbnail'

declare interface ImageResponseFormatType {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: null | string
  size: number
  width: number
  height: number
}

declare interface ImageResponseType extends ImageResponseFormatType {
  id: number
  alternativeText: string
  caption: string
  formats: Record<ImageFormatsType, ImageResponseFormatType>
  previewUrl: null | string
  provider: string
  provider_metadata: null | string
  created_at: Date
  updated_at: Date
}
