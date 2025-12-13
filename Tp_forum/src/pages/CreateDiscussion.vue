<template>
  <div>
    <Navbar :user="user"/>
    <b-container class="mt-4">
      <b-card title="Créer une nouvelle discussion">
        <b-form @submit.prevent="createNewDiscussion">
          <b-form-group label="Titre">
            <b-form-input v-model="title" required></b-form-input>
          </b-form-group>
          <b-form-group label="Contenu">
            <b-form-textarea v-model="content" rows="5" required></b-form-textarea>
          </b-form-group>
          <b-form-group label="Catégorie">
            <b-form-select v-model="category" :options="categories" required></b-form-select>
          </b-form-group>
          <b-button type="submit" variant="primary">Créer</b-button>
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Navbar from "../components/Navbar.vue";
import { discussionService } from "../services/discussionService";
import { auth } from "../firebase";

export default {
  components: { Navbar },
  setup() {
    const title = ref("");
    const content = ref("");
    const category = ref("");
    const categories = ref(["Général", "Tech", "Sport", "Autres"]);
    const user = ref(null);

    onMounted(() => {
      auth.onAuthStateChanged((u) => {
        if (u) user.value = u;
      });
    });

    const createNewDiscussion = async () => {
      if (!user.value) {
        alert("Vous devez être connecté pour créer une discussion.");
        return;
      }
      if (!title.value || !content.value || !category.value) return;

      try {
        await discussionService.createDiscussion(
          title.value,
          content.value,
          category.value,
          user.value.uid,
          user.value.displayName || "Utilisateur"
        );
        window.location.href = "/";
      } catch (err) {
        console.error(err);
      }
    };

    return { title, content, category, categories, user, createNewDiscussion };
  }
};
</script>
