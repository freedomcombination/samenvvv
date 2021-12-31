declare type ILocale = 'tr' | 'en' | 'nl'

declare type ILocalize<T> = Record<ILocale, T>
