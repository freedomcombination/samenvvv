import axios from 'axios'

export type FetcherType = {
  id?: number
  queryKey: CustomQueryKeyType
  method?: 'get' | 'delete' | 'post' | 'put'
  params: Partial<CustomQueryParamsType>
}

// TODO: Consider adding exception/error handler
export const request = async <T>({
  id,
  queryKey,
  method = 'get',
  params,
}: FetcherType): Promise<T> => {
  const config = { ...params }
  config._locale = params.locale
  delete config.locale

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ADMIN_URL,
    params: config,
  })

  const slug = id ? `${queryKey}/${id}` : queryKey

  const response = await instance[method]<T>(slug, config)

  return response.data
}
