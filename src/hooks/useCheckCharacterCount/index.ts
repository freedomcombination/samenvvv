import useDebounce from '@rooks/use-debounce'

import {
  setPostContent,
  setPostText,
  useAppDispatch,
  useAppSelector,
} from '@store'

type UseCharacter = {
  count: number
  isExceeded: boolean
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange: Function
}

export const useCheckCharacterCount = (): UseCharacter => {
  const {
    postText,
    postContent,
    mentionUsernames,
    trendNames,
    defaultHashtags,
  } = useAppSelector(state => state.postShare)

  const dispatch = useAppDispatch()

  const twitterCharLimit = 280
  const linkCharCount = 23 + 2 // 2 chars is because of the library leaves spaces before/after the link

  const count = linkCharCount + postContent.length

  const isExceeded = count > twitterCharLimit

  const onChange = useDebounce((value?: string): void => {
    const mentionsStr = mentionUsernames.join('\n')
    // prettier-ignore
    const trendsStr = defaultHashtags[0] || '' + defaultHashtags[1] || '' + (trendNames.length > 0 ? '\n' + trendNames.join('\n') : '')
    const postContent = `${value || postText}\n\n${mentionsStr}\n\n${trendsStr}`

    dispatch(setPostText(value || postText))
    dispatch(setPostContent(postContent))
  }, 800)

  return { count, isExceeded, onChange }
}
