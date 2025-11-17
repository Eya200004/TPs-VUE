<template>
  <nav class="navbar">
    <div class="logo">Blog Page</div>
    <ul class="nav-links">
      <li><a href="#" @click.prevent="$emit('navigate','home')">Accueil</a></li>
      <li><a href="#" @click.prevent="$emit('navigate','create')">Ajouter un post</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.navbar{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #4e54c8;
  color: white;
  padding: 15px 30px;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.navbar .logo{
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Segoe UI', sans-serif;
}
.nav-links{
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}
.nav-links li a{
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 6px;
  transition: background 0.2s;
}
.nav-links li a:hover{
  background-color: #3b40a4;
}
</style>
