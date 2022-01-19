const postContentData = {
  en: `
    Law should be applied equally to all
    Law is for everyone.
    Everyone is equal before the law.
    Respect for human rights is a requirement of being human.
  `,
  tr: `
    Hukuk herkese eşit uygulanmalı 
    Hukuk herkese lazım.
    Yasalar karşısında herkes eşittir.
    İnsan haklarına saygı insan olmanın gereğidir.
  `,
  nl: `
    De wet moet voor iedereen gelijk worden toegepast
    Recht is voor iedereen.
    Iedereen is gelijk voor de wet.
    Respect voor mensenrechten is een vereiste om mens te zijn.
  `,
}

export const getRandomPostSentence = (locale: string): string => {
  const sentencesStr = postContentData[locale as 'en' | 'tr' | 'nl']
  const sentences = sentencesStr.slice(1).split('\n')
  const randomIndex = Math.floor(Math.random() * (sentences.length - 1))
  const randomSentence = sentences[randomIndex].trim()

  return randomSentence
}
