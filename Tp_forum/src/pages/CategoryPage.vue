<template>
  <div>
    <Navbar :user="user"/>
    <b-container class="mt-4">
      <h3>Discussions dans la catégorie : {{ categoryName }}</h3>
      <b-row>
        <b-col cols="12" md="6" v-for="discussion in discussions" :key="discussion.id">
          <DiscussionCard :discussion="discussion"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import Navbar from "../components/Navbar.vue";
import DiscussionCard from "../components/DiscussionCard.vue";

export default {

  components: { Navbar, DiscussionCard },
  setup() {
    const route = useRoute();
    const categoryId = route.params.id;
    const categoryName = ref(categoryId);
    const discussions = ref([]);
    const user = ref(auth.currentUser);

    onMounted(async () => {
      const q = query(collection(db, "Discussions"), where("category", "==", categoryId));
      const querySnapshot = await getDocs(q);
      discussions.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });

    return { discussions, categoryName, user };
  }
};
</script>
