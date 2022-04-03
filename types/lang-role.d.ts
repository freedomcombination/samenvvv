declare type RawLangRole = {
  role: 'en_nl' | 'en_tr' | 'nl_en' | 'nl_tr' | 'tr_en' | 'tr_nl'
  publishedAt: string
  updatedAt: string
  createdAt: string
  translators: StrapiRawCollection<RawTranslator>
}

declare type LangRole = {
  id: number
  role: 'en_nl' | 'en_tr' | 'nl_en' | 'nl_tr' | 'tr_en' | 'tr_nl'
  publishedAt: string
  updatedAt: string
  createdAt: string
  translators: StrapiCollection<Translator>
}
