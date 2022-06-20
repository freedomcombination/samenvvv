import { useCallback, useRef } from 'react'

import { useRouter } from 'next/router'

import { setPostText, useAppDispatch } from '@store'
import { getRandomPostSentence } from '@utils'

export const useGenerateRandomPostText = () => {
  const dispatch = useAppDispatch()
  const { locale } = useRouter()
  const tryCount = useRef<number>(0)

  const generateRandomPostText = useCallback<(post: IHashtagPost) => void>(
    post => {
      if (!post) return

      if (tryCount.current === 10) tryCount.current = 0

      const randomPostSentence = getRandomPostSentence(locale as CommonLocale)
      const postLength = post.text.split('.').length

      const combinationArray = [...Array(postLength)].map((_, i) => i)
      const combinations = combinationArray.flatMap((v, i) =>
        combinationArray.slice(i + 1).map(w => [v, w]),
      )

      const randomCombination =
        combinations[Math.floor(Math.random() * combinations.length)]

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
        generateRandomPostText(post)
      } else {
        dispatch(setPostText(combinedText))
      }
    },
    [dispatch, locale],
  )

  return generateRandomPostText
}
