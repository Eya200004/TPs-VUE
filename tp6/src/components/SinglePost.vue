<template>
  <div class="post-card">
    <h3>{{ post.title }}</h3>
    <p class="snippet">{{ post.body.substring(0, 50) }}...</p>
    <p class="tags">
      <span v-for="tag in post.tags" :key="tag">#{{ tag }}</span>
    </p>
    <div class="buttons">
      <button class="detail" @click="openDetail(post.id)">Voir détail</button>
      <button class="edit" @click="openEdit(post.id)">Modifier</button>
      <button class="delete" @click="deleteThisPost(post.id)">Supprimer</button>
    </div>
  </div>
</template>
<script>
import { inject } from 'vue'
import { usePosts } from '../composables/usePosts'

export default{
  name: 'SinglePost',
  props: ['post'],
  inject: ['openDetail', 'openEdit'],
  setup() {
    const { deletePost } = usePosts()
    const refreshPosts = inject('refreshPosts')

    const deleteThisPost = async (id) =>{
      if (confirm('Voulez-vous vraiment supprimer cet article ?')) {
        await deletePost(id)
        alert('Article supprimé !')
        if (refreshPosts) refreshPosts()
      }
    }
    return { deleteThisPost }
  }
}
</script>
<style scoped>
.post-card{
  background-color: #f8f9fa;
  border-left: 4px solid #4e54c8;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}
.post-card:hover{
  transform: translateY(-3px);
}
.post-card h3{
  color: #2c3e50;
  margin-bottom: 10px;
  font-family: 'Segoe UI', sans-serif;
}
.snippet{
  color: #555;
  margin-bottom: 10px;
}
.tags span{
  margin-right: 8px;
  color: #4e54c8;
  font-weight: 500;
}
.buttons{
  margin-top: 10px;
}
button{
  margin-right: 10px;
  padding: 6px 14px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: 0.2s;
}
button.detail{
  background: #3498db; 
  color: white;
}
button.detail:hover {
  background: #2980b9;
}
button.edit{
  background: #4e54c8;
  color: white;
}
button.edit:hover{
  background: #3b40a4;
}
button.delete{
  background: #bdc3c7; 
  color: #2c3e50;
}
button.delete:hover{
  background: #95a5a6;
}
</style>
