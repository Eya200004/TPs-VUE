<template>
  <div class="auth-page">
    <h2>Connexion</h2>
    <form @submit.prevent="onLogin">
      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Mot de passe" />
      <button type="submit">Se connecter</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p>Pas encore inscrit ? <router-link to="/register">S'inscrire</router-link></p>
  </div>
</template>

<script>
import { ref } from "vue";
import { login } from "../services/authService";
import { useRouter } from "vue-router";

export default {
  name: "LoginView", 
  setup() {
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const router = useRouter();

    async function onLogin() {
      error.value = "";
      try {
        await login(email.value, password.value);
        router.push({ name: "Events" });
      } catch (e) {
        error.value = e.message;
      }
    }

    return { email, password, error, onLogin };
  }
};
</script>

<style scoped>
.auth-page { max-width: 400px; margin: 30px auto; text-align: center; }
input { display: block; width: 100%; margin: 8px 0; padding: 8px; }
button { padding: 8px 12px; }
.error { color: red; }
</style>
