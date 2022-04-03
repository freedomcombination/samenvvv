export const flattenAttributes = (data: any) => {
  if (!data) return null

  if (Array.isArray(data)) {
    if (data.length === 0) return []
    return data.map(({ id, attributes }) => ({ id, ...attributes }))
  }

  return { id: data.id, ...data.attributes }
}

export const transformAttributes = (id: number, attributes: any) => {
  return Object.keys(attributes).reduce((acc, key) => {
    acc.id = id

    if (acc[key]?.data) {
      acc[key] = flattenAttributes(acc[key].data)
      if (Array.isArray(acc[key])) {
        acc[key].forEach((item: any) => {
          // Recursive for nested fields
          transformAttributes(item.id, item)
        })
      }
    }

    if (acc[key]?.data === null) acc[key] = null

    return acc
  }, attributes)
}

export const transformStrapiData = <T>(
  response: StrapiResponse<T>,
): { pagination: Pagination | null; result: T | null } => {
  if (!response || !response.data) {
    console.warn('No response provided!')
    return { result: null, pagination: null }
  }

  const arrayResponse = response as StrapiRawCollectionResponse<T>
  const responseSingle = response as StrpiRawEntityResponse<T>

  if (arrayResponse.data && Array.isArray(arrayResponse.data)) {
    return {
      pagination: arrayResponse.meta.pagination,
      result: arrayResponse.data.map(({ id, attributes }) =>
        transformAttributes(id, attributes),
      ) as unknown as T,
    }
  }

  return {
    result: transformAttributes(
      responseSingle.data.id,
      responseSingle.data.attributes,
    ) as T,
    pagination: null,
  }
}
