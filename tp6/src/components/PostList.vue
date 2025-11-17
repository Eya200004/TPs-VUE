<template>
  <div class="post-list">
    <SinglePost v-for="post in posts" :key="post.id" :post="post" />
    <p v-if="posts.length === 0">Aucun article pour le moment.</p>
  </div>
</template>

<script>
import SinglePost from './SinglePost.vue'

export default{
  name: 'PostList',
  props:{
    posts:{
      type: Array,
      default: () => []
    }
  },
  components: { SinglePost }
}
</script>
<style scoped>
.post-list{
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
