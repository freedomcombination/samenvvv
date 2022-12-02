import { useCallback, useEffect } from 'react'

import { sample } from 'lodash'
import { useRouter } from 'next/router'

import { defaultPostSentences } from '@data'
import { setPostText, useAppDispatch, useAppSelector } from '@store'

export const useRandomPostContent = (post: IHashtagPost) => {
  const dispatch = useAppDispatch()
  const { locale } = useRouter()
  const { availableCount } = useAppSelector(state => state.postShare)

  const generateRandomPostContent = useCallback(() => {
    if (!post) return

    const randomPostSentence = sample(
      defaultPostSentences[locale as ILocale],
    ) as string

    const postSentences = post.text
      .replace(/\.\.+/g, '.') // remove multiple dots
      .replace(/\"+/g, '') // remove double quotes
      .split(/\.|\?|!|\n/g) // split by sentence
      .map(sentence => sentence.trim())
      .filter(Boolean)

    const postLength = postSentences.length

    const combinationArray = [...Array(postLength)].map((_, i) => i)

    const combinations = combinationArray.flatMap((v, i) =>
      combinationArray.slice(i + 1).map(w => [v, w]),
    )

    const [firstCombination, secondCombination] = sample(combinations) || [0, 1]

    const randomPostText = postSentences
      .slice(firstCombination || 0, secondCombination || 1)
      .join('. ')

    let combinedText = `${randomPostText}\n\n"${randomPostSentence}"`

    if (combinedText.length > availableCount) {
      combinedText = `${randomPostText.slice(
        0,
        availableCount - randomPostSentence.length - 9,
      )}...\n\n"${randomPostSentence}"`
    }

    dispatch(setPostText(combinedText))
  }, [locale, availableCount, post, dispatch])

  useEffect(() => {
    generateRandomPostContent()
  }, [locale, availableCount, post, generateRandomPostContent])

  return generateRandomPostContent
}
