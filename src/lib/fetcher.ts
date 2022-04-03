import axios, { AxiosResponse } from 'axios'

export const fetcher = <D>(
  url: string,
  method: 'get' | 'post' | 'put' | 'delete' = 'get',
  body?: any,
): Promise<AxiosResponse<StrapiResponse<D>>> => {
  // Create instance
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL as string,
  })

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    config.headers!.Authorization = `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`

    return config
  })

  if (method === 'get') return instance.get(url)

  return instance[method](url, body)
}
