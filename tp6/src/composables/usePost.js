import { usePosts } from './usePosts'

export function usePost(id) {
  const { posts } = usePosts()

  const getPost = () => posts.value.find(p => p.id === id)

  return { getPost }
}
