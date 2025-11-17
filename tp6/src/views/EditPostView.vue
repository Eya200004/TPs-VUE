<template>
  <div class="edit-post">
    <h1>Modifier le Post</h1>
    <form @submit.prevent="submitEdit">
      <input v-model="title" placeholder="Titre" required />
      <textarea v-model="body" placeholder="Contenu" required></textarea>
      <input v-model="tags" placeholder="Tags séparés par virgules" />
      <button type="submit">Enregistrer</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { usePosts } from '../composables/usePosts'

export default {
  props: ['postId'],      
  emits: ['change-view'],
  setup(props, { emit }){
    const { posts, updatePost, getPosts } = usePosts()

    const title = ref('')
    const body = ref('')
    const tags = ref('')
    onMounted(async () => {
      await getPosts() // récupérer tous les posts
      const post = posts.value.find(p => p.id === props.postId)
      if (post) {
        title.value = post.title
        body.value = post.body
        tags.value = post.tags.join(', ')
      }
    })

    const submitEdit = async () => {
      await updatePost({
        id: props.postId,
        title: title.value,
        body: body.value,
        tags: tags.value.split(',').map(t => t.trim())
      })

      alert('Post modifié !')

      emit('change-view', 'home')
    }

    return { title, body, tags, submitEdit }
  }
}
</script>

<style scoped>
.edit-post{
  max-width: 600px;
  margin: 30px auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
}
input, textarea{
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
}
button{
  background: #4e54c8;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}
button:hover{
  background: #3b40a4;
}
</style>
