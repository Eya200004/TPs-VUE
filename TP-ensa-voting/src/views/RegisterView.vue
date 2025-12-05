<template>
  <div class="auth-page">
    <h2>Inscription</h2>
    <form @submit.prevent="onRegister">
      <input v-model="email" placeholder="Email universitaire" />
      <input v-model="password" type="password" placeholder="Mot de passe" />
      <button type="submit">S'inscrire</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p>Déjà un compte ? <router-link to="/login">Connexion</router-link></p>
  </div>
</template>

<script>
import { ref } from "vue";
import { register } from "../services/authService";
import { useRouter } from "vue-router";

export default {
  name: "RegisterView", // <-- multi-word
  setup() {
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const router = useRouter();

    async function onRegister() {
      error.value = "";
      try {
        await register(email.value, password.value);
        router.push({ name: "Events" });
      } catch (e) {
        error.value = e.message;
      }
    }

    return { email, password, error, onRegister };
  }
};
</script>

<style scoped>
.auth-page { max-width: 400px; margin: 30px auto; text-align: center; }
input { display: block; width: 100%; margin: 8px 0; padding: 8px; }
button { padding: 8px 12px; }
.error { color: red; }
</style>
