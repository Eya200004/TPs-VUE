<template>
  <div>
    <!-- Navbar visible sur cette page -->
    <Navbar :user="user" />

    <b-container class="mt-5">
      <b-card title="Connexion">
        <b-form @submit.prevent="loginUser">
          <b-form-group label="Email">
            <b-form-input v-model="email" type="email" required></b-form-input>
          </b-form-group>
          <b-form-group label="Mot de passe">
            <b-form-input v-model="password" type="password" required></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Se connecter</b-button>
        </b-form>
        <b-alert v-if="error" variant="danger" dismissible @dismissed="error=''">{{ error }}</b-alert>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Navbar from "../components/Navbar.vue";
import { authService } from "../services/authService";
import { auth } from "../firebase";

export default {
  components: { Navbar },
  setup() {
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const user = ref(auth.currentUser);

    // Mettre à jour l'utilisateur si connexion change
    onMounted(() => {
      auth.onAuthStateChanged(u => {
        user.value = u;
      });
    });

    const loginUser = async () => {
      try {
        await authService.login(email.value, password.value);
        window.location.href = "/"; // redirection après connexion
      } catch (err) {
        error.value = err.message;
      }
    };

    return { email, password, error, user, loginUser };
  }
};
</script>
