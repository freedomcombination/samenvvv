import { useQuery, UseQueryResult } from 'react-query'

import { request } from '@lib'

export type UseDataType = <T>(
  queryKey: CustomQueryKeyType,
  params: CustomQueryParamsType,
) => UseQueryResult<T, unknown>

export const useData: UseDataType = (queryKey, params) => {
  return useQuery({
    queryKey: [queryKey, Object.values(params)],
    queryFn: () => request({ queryKey, params }),
  })
}
