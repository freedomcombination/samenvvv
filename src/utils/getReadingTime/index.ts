export const getReadingTime = (text: string, locale: CommonLocale): string => {
  if (!text) return ''

  const suffix = {
    en: 'mins read',
    nl: 'min lezen',
    tr: 'dakika oku',
  }

  const wpm = 225
  const words = text.trim().split(/\s+/).length
  const time = Math.ceil(words / wpm)

  return `${time} ${suffix[locale as 'en' | 'nl' | 'tr']}`
}
