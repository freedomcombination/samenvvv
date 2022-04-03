import { mutation } from '../mutation'

export const unlikeBlogMutation = async (blog: Blog) =>
  mutation.put('api/blogs', blog.id, { data: { likes: blog.likes - 1 } })
