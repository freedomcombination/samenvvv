export const lookupTwitterUsers = async (
  value: string,
): Promise<ITweetUserData[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_URL}/mentions/search?username=${value}`,
  )
  const rawData = (await response.json()) as ITweetUserData[]
  return rawData.sort((a, b) => b.followers_count - a.followers_count)
}
