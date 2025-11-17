<template>
  <div class="create-post">
    <h1>Créer un Post</h1>
    <form @submit.prevent="submitPost">
      <input v-model="title" placeholder="Titre" required />
      <textarea v-model="body" placeholder="Contenu" required></textarea>
      <input v-model="tags" placeholder="Tags séparés par virgules" />
      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { usePosts } from '../composables/usePosts'

export default {
  props: ['currentView'],   
  emits: ['change-view'],     
  setup(props, { emit }) {
    const { createPost } = usePosts()

    const title = ref("")
    const body = ref("")
    const tags = ref("")

    const submitPost = async () => {
      await createPost({
        title: title.value,
        body: body.value,
        tags: tags.value.split(',').map(t => t.trim())
      })

      alert("Post ajouté !")
      emit('change-view', 'home')
      title.value = ""
      body.value = ""
      tags.value = ""
    }

    return { title, body, tags, submitPost }
  }
}
</script>

<style scoped>
.create-post{
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
