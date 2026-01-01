<template>
  <div>
    <Navbar :user="user" />

    <b-container class="mt-4">
      <!-- Barre de recherche / filtrage par catégorie -->
      <b-card class="mb-4 p-3">
        <b-form inline @submit.prevent="filterByCategory" class="d-flex flex-wrap align-items-center">
          <b-form-select 
            v-model="selectedCategory" 
            :options="categories" 
            class="mr-2 mb-2" 
            size="lg"
          ></b-form-select>
          <b-button type="submit" variant="primary" size="lg" class="mb-2">Filtrer</b-button>
        </b-form>
      </b-card>

      <!-- Liste des discussions -->
      <b-row>
        <b-col 
          cols="12" md="6" lg="4" 
          v-for="discussion in discussions" 
          :key="discussion.id" 
          class="mb-4"
        >
          <b-card 
            :title="discussion.title"
            class="h-100 shadow-sm"
            @click="goToDiscussion(discussion.id)"
            style="cursor: pointer;"
          >
            <p class="text-truncate">{{ discussion.content }}</p>
            <div class="d-flex justify-content-between align-items-center mt-2">
              <small class="text-muted">{{ discussion.authorName }}</small>
              <b-badge variant="info">{{ discussion.category }}</b-badge>
            </div>
          </b-card>
        </b-col>
      </b-row>

      <div v-if="discussions.length === 0" class="text-center text-muted mt-5">
        Aucune discussion trouvée pour cette catégorie.
      </div>
    </b-container>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Navbar from "../components/Navbar.vue";
import { discussionService } from "../services/discussionService";
import { auth } from "../firebase";
import { useRouter } from "vue-router";

export default {
  components: { Navbar },
  setup() {
    const discussions = ref([]);
    const user = ref(auth.currentUser);
    const router = useRouter();

    const categories = ref(["Toutes", "Général", "Tech", "Sport", "Autres"]);
    const selectedCategory = ref("Toutes");

    const loadDiscussions = async () => {
      if (selectedCategory.value === "Toutes") {
        discussions.value = await discussionService.getAllDiscussions();
      } else {
        discussions.value = await discussionService.getDiscussionsByCategory(selectedCategory.value);
      }
    };

    const filterByCategory = async () => {
      await loadDiscussions();
    };

    const goToDiscussion = (id) => {
      router.push(`/discussion/${id}`);
    };

    onMounted(async () => {
      await loadDiscussions();
    });

    return {
      discussions,
      user,
      categories,
      selectedCategory,
      filterByCategory,
      goToDiscussion
    };
  }
};
</script>

<style scoped>
/* Text truncate pour limiter le contenu à une ligne */
.text-truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
