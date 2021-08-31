// NOTE: This type musth have the same structure as the backend model.
declare interface SubpageType extends StrapiCommonType {
  type: PageVariantType
  start: string | Date
  end: string | Date
  page: PageType
  metadata: MetadataType
  dynamic: any
}
