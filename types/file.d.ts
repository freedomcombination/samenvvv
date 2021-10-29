declare type FileFormatsType = 'large' | 'small' | 'medium' | 'thumbnail'

declare interface IFileInfoInput {
  name?: string
  alternativeText?: string
  caption?: string
}

declare interface IFileFormats extends Omit<IFileInput, 'formats'> {
  large: IFileFormats
  small: IFileFormats
  medium: IFileFormats
  thumbnail: IFileFormats
}

declare interface IFileInput {
  name: string
  alternativeText?: string
  caption?: string
  width?: number
  height?: number
  formats?: IFileFormats
  hash: string
  ext?: string
  mime: string
  size: number
  url: string
  previewUrl?: string
  provider: string
  provider_metadata?: Record<string, unknown>
  related?: Array<string>
  created_by?: string
  updated_by?: string
}

declare interface IUploadFile {
  __typename?: 'UploadFile'
  id: string
  created_at: string
  updated_at: string
  name: string
  alternativeText?: string
  caption?: string
  width?: number
  height?: number
  formats?: IFileFormats
  hash: string
  ext?: string
  mime: string
  size: number
  url: string
  previewUrl?: string
  provider: string
  provider_metadata?: Record<string, unknown>
  related?: Array<Morph>
}

declare interface IMutationUploadArgs {
  refId?: string
  ref?: string
  field?: string
  source?: string
  info?: IFileInfoInput
  file: unknown
}

declare interface IMutationUpdateFileInfoArgs {
  id: string
  info: IFileInfoInput
}
