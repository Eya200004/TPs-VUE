<template>
  <div class="auth-page">
    <div class="auth-card">
      <h2>Connexion</h2>
      <form @submit.prevent="onLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Mot de passe" required />
        <button type="submit">Se connecter</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
      <p>Pas encore inscrit ? <router-link to="/register">S'inscrire</router-link></p>
    </div>
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



.auth-card h2 {
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 1.8rem;
}

.auth-card form input {
  display: block;
  width: 100%;
  margin: 12px 0;
  padding: 10px 12px; /* réduit un peu la hauteur */
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
}

.auth-card form input:focus {
  border-color: #7B4B3A; /* léger focus violet */
  outline: none;
}

.auth-card form button {
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  background-color: #7B4B3A;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s;
}

.auth-card form button:hover {
  background-color: #4B3F36;
}

.error {
  color: red;
  margin-top: 10px;
  font-weight: 500;
}

.auth-card p {
  margin-top: 15px;
}

.auth-card p a {
  color: #7B4B3A;
  text-decoration: none;
  font-weight: 500;
}

.auth-card p a:hover {
  text-decoration: underline;
}
</style>
