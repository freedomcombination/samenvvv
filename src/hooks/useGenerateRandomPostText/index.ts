import { useCallback, useRef } from 'react'

import { useRouter } from 'next/router'

import { useRandomPost } from '@lib'
import { setPostText, useAppDispatch } from '@store'
import { getRandomPostSentence } from '@utils'

export const useGenerateRandomPostText = () => {
  const dispatch = useAppDispatch()
  const { locale } = useRouter()
  const tryCount = useRef<number>(0)

  const post = useRandomPost()

  const generateRandomPostText = useCallback(() => {
    if (!post) return

    if (tryCount.current === 10) tryCount.current = 0

    const randomPostSentence = getRandomPostSentence(locale as StrapiLocale)
    const sentences = post.text.split('(?<=[^A-Z].[.?]) +(?=[A-Z])')
    const numberOfSentences = sentences.length

    const combinationArray = [...Array(numberOfSentences)].map((_, i) => i)
    const combinations = combinationArray.flatMap((v, i) =>
      combinationArray.slice(i + 1).map(w => [v, w]),
    )

    const randomCombination =
      combinations?.length > 0
        ? combinations[Math.floor(Math.random() * combinations.length)]
        : [0, 1]

    const randomPostText = post.text
      .replace(/\.\.+/g, '.') // remove multiple dots
      .split('.')
      .slice(randomCombination[0], randomCombination[1])
      .join('.')
      .trim()

    const combinedText = `${randomPostText}\n\n"${randomPostSentence}"`

    if (
      (randomPostText === '' || combinedText.length > 230) &&
      tryCount.current < 10
    ) {
      tryCount.current += 1
      generateRandomPostText()
    } else {
      dispatch(setPostText(combinedText))
    }
  }, [dispatch, post, locale])

  return generateRandomPostText
}
