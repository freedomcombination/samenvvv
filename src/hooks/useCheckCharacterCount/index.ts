import { useAppSelector } from '@store'

export const useCheckCharacterCount = (): [number, boolean] => {
  const { postContent } = useAppSelector(state => state.postShare)
  const twitterCharLimit = 280
  const linkCharCount = 23 + 2 // 2 chars is because of the library leaves spaces before/after the link

  const totalCharCount = linkCharCount + postContent.length

  const isCharCountExceeded = totalCharCount > twitterCharLimit

  return [totalCharCount, isCharCountExceeded]
}
