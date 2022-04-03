import { fetcher } from './fetcher'

export const mutation = {
  post: async <Data, Response>(url: string, data: Data) =>
    fetcher<Response>(url, 'post', data),
  put: async <Data, Response>(url: string, id: number, data: Data) =>
    fetcher<Response>(`/${url}/${id}`, 'put', data),
  delete: async <Response>(url: string, id: number) =>
    fetcher<Response>(`/${url}/${id}`, 'delete'),
  // https://docs.strapi.io/developer-docs/latest/plugins/i18n.html#creating-a-localization-for-an-existing-entry
  localize: async <Data, Response>(url: string, id: number, data: Data) =>
    fetcher<Response>(`/${url}/${id}/localization`, 'post', data),
}
