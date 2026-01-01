<template>
  <div class="login-page">
    <!-- Navbar -->
    <Navbar :user="user" />

    <b-container class="mt-5 d-flex justify-content-center">
      <b-card class="login-card shadow-lg p-4" title="Connexion">
        <b-form @submit.prevent="loginUser">
          <b-form-group label="Email" label-for="email">
            <b-form-input 
              id="email" 
              v-model="email" 
              type="email" 
              placeholder="exemple@email.com" 
              required
              class="input-custom"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Mot de passe" label-for="password">
            <b-form-input 
              id="password" 
              v-model="password" 
              type="password" 
              placeholder="Votre mot de passe" 
              required
              class="input-custom"
            ></b-form-input>
          </b-form-group>

          <div class="d-flex justify-content-between align-items-center mt-4">
            <b-button type="submit" variant="primary" class="btn-custom">
              Se connecter
            </b-button>
            <b-button variant="link" @click="$router.push('/register')" class="link-custom">
              Pas encore de compte ? Inscription
            </b-button>
          </div>
        </b-form>

        <b-alert 
          v-if="error" 
          variant="danger" 
          dismissible 
          @dismissed="error=''"
          class="mt-3"
        >
          {{ error }}
        </b-alert>
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

<style scoped>
.login-page{
  min-height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
}
.login-card{
  width: 100%;
  max-width: 450px;
  border-radius: 15px;
  background: white;
  border: none;
}
.login-card .card-title{
  text-align: center;
  font-weight: 700;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1.5rem;
}
.input-custom{
  border-radius: 10px;
  border: 1px solid #ddd;
  padding: 0.6rem 0.8rem;
  transition: all 0.3s ease;
}
.input-custom:focus{
  border-color: #667eea;
  box-shadow: 0 0 8px rgba(102, 126, 234, 0.4);
}
.btn-custom{
  background: #667eea;
  color: white;
  font-weight: 600;
  padding: 0.6rem 1.5rem;
  border-radius: 10px;
  transition: all 0.3s ease;
}
.btn-custom:hover{
  background: #764ba2;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}
.link-custom{
  color: #667eea;
  font-weight: 500;
}
.link-custom:hover{
  color: #764ba2;
  text-decoration: underline;
}
</style>
