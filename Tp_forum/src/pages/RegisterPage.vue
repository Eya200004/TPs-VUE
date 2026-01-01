<template>
  <div class="register-page">
    <!-- Navbar -->
    <Navbar :user="user" />

    <b-container class="mt-5 d-flex justify-content-center">
      <b-card class="register-card shadow-lg p-4" title="Créer un compte">
        <b-form @submit.prevent="register">
          <b-form-group label="Nom" label-for="name">
            <b-form-input 
              id="name" 
              v-model="name" 
              placeholder="Entrez votre nom" 
              required
              class="input-custom"
            ></b-form-input>
          </b-form-group>
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
              S'inscrire
            </b-button>
            <b-button variant="link" @click="$router.push('/login')" class="link-custom">
              Déjà un compte ? Connexion
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
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default {
  components: { Navbar },
  setup() {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const user = ref(auth.currentUser);

    onMounted(() => {
      auth.onAuthStateChanged(u => {
        user.value = u;
      });
    });

    const register = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const u = userCredential.user;

        await setDoc(doc(db, "Users", u.uid), {
          name: name.value,
          email: email.value,
          role: "user",
          createdAt: new Date()
        });

        window.location.href = `/`;
      } catch (err) {
        error.value = err.message;
      }
    };

    return { name, email, password, error, user, register };
  }
};
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
}

.register-card {
  width: 100%;
  max-width: 450px;
  border-radius: 15px;
  background: white;
  border: none;
}

.register-card .card-title {
  text-align: center;
  font-weight: 700;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.input-custom {
  border-radius: 10px;
  border: 1px solid #ddd;
  padding: 0.6rem 0.8rem;
  transition: all 0.3s ease;
}

.input-custom:focus {
  border-color: #667eea;
  box-shadow: 0 0 8px rgba(102, 126, 234, 0.4);
}

.btn-custom {
  background: #667eea;
  color: white;
  font-weight: 600;
  padding: 0.6rem 1.5rem;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.btn-custom:hover {
  background: #764ba2;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.link-custom {
  color: #667eea;
  font-weight: 500;
}

.link-custom:hover {
  color: #764ba2;
  text-decoration: underline;
}
</style>
