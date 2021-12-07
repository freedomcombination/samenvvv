export const truncateText = (text: string, maxLen: number): string => {
  //trim the string to the maximum length
  const trimmedString = text.substr(0, maxLen)

  //re-trim if we are in the middle of a word
  return trimmedString.substr(
    0,
    Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')),
  )
}
