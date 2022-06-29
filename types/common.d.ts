declare type ChildMenuType = {
  link: string
  en: string
  nl: string
  tr: string
}
declare type ParentMenuType = {
  label: string
  children: ChildMenuType[]
}
declare type Localize<T> = Record<StrapiLocale, T>
