declare type FileFormatsType = 'large' | 'small' | 'medium' | 'thumbnail'

declare interface FileInfoInput {
  name: string
  alternativeText: string
  caption: string
}

declare interface FileFormats extends Omit<UploadFile, 'formats'> {
  large: IFileFormats
  small: IFileFormats
  medium: IFileFormats
  thumbnail: IFileFormats
}

declare type RawUploadFile = {
  alternativeText: string
  caption: string
  createdAt: string
  ext: string
  formats: FileFormats
  hash: string
  height: number
  mime: string
  name: string
  previewUrl: string
  provider: string
  provider_metadata: any
  size: number
  updatedAt: string
  url: string
  width: number
}

declare type UploadFile = {
  id: number
  alternativeText: string
  caption: string
  createdAt: string
  ext: string
  formats: FileFormats
  hash: string
  height: number
  mime: string
  name: string
  previewUrl: string
  provider: string
  provider_metadata: any
  size: number
  updatedAt: string
  url: string
  width: number
}
