<template>
  <div v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>

    <p class="tags">
      <span v-for="tag in post.tags" :key="tag">#{{ tag }}</span>
    </p>
  </div>
</template>

<script>
import { usePost } from '../composables/usePost'

export default {
  props: ['postId'],
  setup(props) {
    const { getPost } = usePost(props.postId)
    const post = getPost()
    return { post }
  }
}
</script>
