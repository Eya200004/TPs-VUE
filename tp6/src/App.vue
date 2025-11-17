<template>
  <div>
    <NavBar 
      @navigate="currentView = $event" 
    />
    <div class="container">
      <Home v-if="currentView === 'home'" />
      <CreatePostView v-if="currentView === 'create'" 
      @change-view="currentView = $event" />
      <PostDetailView 
        v-if="currentView === 'detail'"
        :postId="selectedPostId"
      />
      <EditPostView 
        v-if="currentView === 'edit'"
        :postId="selectedPostId"
        @change-view="currentView = $event"
      />
    </div>
  </div>
</template>
<script>
import NavBar from './components/NavBar.vue'
import Home from './views/Home.vue'
import CreatePostView from './views/CreatePostView.vue'
import PostDetailView from './views/PostDetailView.vue'
import EditPostView from './views/EditPostView.vue'

export default{
  components:{
    NavBar,
    Home,
    CreatePostView,
    PostDetailView,
    EditPostView,
  },

  data(){
    return{
      currentView: 'home',   
      selectedPostId: null
    }
  },
  provide(){
    return{
      openDetail: this.openDetail,
      openEdit: this.openEdit
    }
  },

  methods:{
    openDetail(id){
      this.selectedPostId = id;
      this.currentView = 'detail';
    },
    openEdit(id){
      this.selectedPostId = id;
      this.currentView = 'edit';
    }
  }
}
</script>

<style>
body{
  margin: 0;
  font-family: Arial, sans-serif;
}
.container{
  width: 80%;
  margin: 20px auto;
}
</style>
