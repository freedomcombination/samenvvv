import { request } from '../request'

export const getTrend = async () => {
  const response = await request<Trend>({
    url: 'api/trend',
  })

  return response.result || null
}
