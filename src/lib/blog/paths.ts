import { request } from '../request'

export const getBlogPaths = async (locales: StrapiLocale[]) =>
  (
    await Promise.all(
      locales.flatMap(async locale => {
        const responses = await request<Blog[]>({
          url: 'api/blogs',
          locale,
        })
        const blogs = responses?.result as Blog[]
        return blogs.map(({ slug }) => ({
          params: { slug },
          locale,
        }))
      }),
    )
  ).flat()
