<template>
  <div id="app">
    <header>
      <h1>ENSA Voting App</h1>
      <div class="header-right">
        <router-link v-if="!user" :to="{ name: 'Home' }" class="btn-header">Home</router-link>
        <router-link v-if="!user" to="/login" class="btn-header">Se connecter</router-link>
        <router-link v-if="!user" to="/register" class="btn-header">S'inscrire</router-link>

        <router-link v-if="user" :to="{ name: 'Home' }" class="btn-header">Home</router-link>
        <router-link v-if="user" :to="{ name: 'Events' }" class="btn-header">Evenement</router-link>
        <button v-if="user" @click="logoutUser" class="btn-header">Déconnexion</button>
      </div>
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      &copy; 2025 ENSA Safi - Tous droits réservés
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { auth } from "./firebase"; // garde ton chemin actuel
import { logout } from "./services/authService";
import { useRouter } from "vue-router";

export default {
  name: "App",
  setup() {
    const user = ref(null);
    const router = useRouter();

    onMounted(() => {
      auth.onAuthStateChanged((u) => {
        user.value = u;
      });
    });

    const logoutUser = async () => {
      await logout();
      user.value = null;
      router.push({ name: "Home" });
      
    };

    return { user, logoutUser };
  }
};
</script>
