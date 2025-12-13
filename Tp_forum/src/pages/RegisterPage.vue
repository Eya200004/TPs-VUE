<template>
  <div>
    <!-- Navbar visible sur cette page -->
    <Navbar :user="user" />

    <b-container class="mt-5">
      <b-card title="Créer un compte">
        <b-form @submit.prevent="register">
          <b-form-group label="Nom" label-for="name">
            <b-form-input id="name" v-model="name" required></b-form-input>
          </b-form-group>

          <b-form-group label="Email" label-for="email">
            <b-form-input id="email" v-model="email" type="email" required></b-form-input>
          </b-form-group>

          <b-form-group label="Mot de passe" label-for="password">
            <b-form-input id="password" v-model="password" type="password" required></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">S'inscrire</b-button>
          <b-button variant="link" @click="$router.push('/login')">Déjà un compte ? Connexion</b-button>
        </b-form>

        <b-alert v-if="error" variant="danger" dismissible @dismissed="error=''">{{ error }}</b-alert>
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

    // Mettre à jour l'utilisateur si connexion change
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

        window.location.href = "/login-page";
      } catch (err) {
        error.value = err.message;
      }
    };

    return { name, email, password, error, user, register };
  }
};
</script>
