<template>
  <div>
    <h2>Liste des articles</h2>
    <PostList :posts="posts" :refreshPosts="refreshPosts" />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { usePosts } from '../composables/usePosts.js'
import PostList from '../components/PostList.vue'

export default{
  name: 'HomePage',
  components: { PostList },

  setup(){
    const { posts, getPosts } = usePosts()

    onMounted(async () => {
      await getPosts()
    })

    const refreshPosts = async () => {
      await getPosts()
    }

    return { posts, refreshPosts }
  }
}
</script>
