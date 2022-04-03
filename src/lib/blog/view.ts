import { mutation } from '../mutation'

export const viewBlogMutation = async (blog: Blog) =>
  mutation.put('api/blogs', blog.id, { data: { views: blog.views + 1 } })
