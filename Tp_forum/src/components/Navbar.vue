<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand to="/">Forum</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Accueil</b-nav-item>
        <b-nav-item to="/create-discussion" v-if="user">Créer Discussion</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <!-- Affichage si pas connecté -->
        <b-nav-item v-if="!user" to="/login">Connexion</b-nav-item>
        <b-nav-item v-if="!user" to="/register">Inscription</b-nav-item>

        <!-- Affichage si connecté -->
        <b-nav-item v-if="user" :to="`/profile/${user.uid}`">Profil</b-nav-item>
        <b-nav-item v-if="user" @click="logoutUser">Déconnexion</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { useAuthStore } from "../stores/authStore";

export default {
  name: "AppNavbar",
  setup() {
    const { user, logout } = useAuthStore();

    const logoutUser = async () => {
      await logout();
      // Rediriger vers l'accueil après déconnexion
      window.location.href = "/";
    };

    return { user, logoutUser };
  }
};
</script>

<style scoped>
.ml-auto {
  margin-left: auto;
}
</style>
