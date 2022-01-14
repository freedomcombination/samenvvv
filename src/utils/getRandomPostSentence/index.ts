const postContentData = {
  en: `
    Sentence 1
    Sentence 2
    Sentence 3
    Sentence 4
    Sentence 5
  `,
  tr: `
    Hukuk herkese eşit uygulanmalı 
    Hukuk herkese lazım.
    Yasalar karşısında herkes eşittir.
    İnsan haklarına saygı insan olmanın gereğidir.
    Cümle 5
  `,
  nl: `
    Zin 1
    Zin 2
    Zin 3
    Zin 4
    Zin 5
  `,
}

export const getRandomPostSentence = (locale: string): string => {
  const sentencesStr = postContentData[locale as 'en' | 'tr' | 'nl']
  const sentences = sentencesStr.slice(1).split('\n')
  const randomIndex = Math.floor(Math.random() * (sentences.length - 1))
  const randomSentence = sentences[randomIndex].trim()

  return randomSentence
}
