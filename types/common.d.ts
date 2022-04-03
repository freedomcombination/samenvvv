declare type ChildMenuType = { label: string; link: string }
declare type ParentMenuType = {
  label: string
  children: ChildMenuType[]
}
declare type Localize<T> = Record<StrapiLocale, T>
