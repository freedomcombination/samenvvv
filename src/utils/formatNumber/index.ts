export const formatNumber = (num: number): string | undefined => {
  return Intl.NumberFormat('en', { notation: 'compact' }).format(num)
}
