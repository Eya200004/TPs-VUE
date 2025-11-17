import { ref } from 'vue'
import axios from 'axios'

const posts = ref([])

const apiURL = "http://localhost:3001/posts"

export function usePosts(){

  const getPosts = async () => {
    const res = await axios.get(apiURL)
    posts.value = res.data
    return posts
  }

  const createPost = async (post) => {
    await axios.post(apiURL, post)
    await getPosts()
  }

  const updatePost = async (updatedPost) => {
    await axios.put(`${apiURL}/${updatedPost.id}`, updatedPost)
    await getPosts()
  }

  const deletePost = async (id) => {
    await axios.delete(`${apiURL}/${id}`)
    await getPosts()
  }

  return { posts, getPosts, createPost, updatePost, deletePost }
}
