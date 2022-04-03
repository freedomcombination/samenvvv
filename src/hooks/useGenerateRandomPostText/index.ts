import { useCallback, useRef } from 'react'

import { useRouter } from 'next/router'

import { setPostText, useAppDispatch, useAppSelector } from '@store'
import { getRandomPostSentence } from '@utils'

export const useGenerateRandomPostText = () => {
  const dispatch = useAppDispatch()
  const { locale } = useRouter()
  const tryCount = useRef<number>(0)
  const { post } = useAppSelector(state => state.post)

  const generateRandomPostText = useCallback(() => {
    if (!post) return

    if (tryCount.current === 3) tryCount.current = 0

    const randomPostSentence = getRandomPostSentence(locale as StrapiLocale)
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

    if (randomPostText === '' || combinedText.length > 230) {
      generateRandomPostText()
      tryCount.current += 1
    } else {
      dispatch(setPostText(combinedText))
    }
  }, [dispatch, post, locale])

  return generateRandomPostText
}
