<template>
  <div>
    <!-- Navbar -->
    <Navbar :user="user"/>

    <!-- Section Profil -->
    <b-container class="mt-5">
      <b-card class="profile-card">
        <h2 class="text-center mb-4">Bienvenue, {{ name || 'Utilisateur' }} !</h2>

        <b-form @submit.prevent="updateProfile">
          <b-form-group label="Nom" label-for="nameInput">
            <b-form-input
              id="nameInput"
              v-model="name"
              placeholder="Entrez votre nom"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Email" label-for="emailInput">
            <b-form-input
              id="emailInput"
              v-model="email"
              type="email"
              disabled
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary" class="w-100">
            Mettre à jour
          </b-button>
        </b-form>

        <b-alert
          v-if="message"
          variant="success"
          dismissible
          @dismissed="message = ''"
          class="mt-3 text-center"
        >
          {{ message }}
        </b-alert>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import { ref, onMounted } from "vue";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default {
  name: "ProfilePage",
  components: { Navbar },
  setup() {
    const user = ref(auth.currentUser);
    const name = ref("");
    const email = ref("");
    const message = ref("");

    // Charger les infos utilisateur depuis Firestore
    onMounted(async () => {
      if (user.value) {
        const docRef = doc(db, "Users", user.value.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          name.value = docSnap.data().name;
          email.value = docSnap.data().email;
        }
      }
    });
    const updateProfile = async () => {
      if (!name.value) return;

      try {
        const docRef = doc(db, "Users", user.value.uid);
        await updateDoc(docRef, { name: name.value });
        await user.value.updateProfile({ displayName: name.value });

        message.value = "Profil mis à jour avec succès !";
      } catch (err) {
        console.error(err);
        message.value = "Erreur lors de la mise à jour.";
      }
    };

    return { user, name, email, message, updateProfile };
  },
};
</script>

<style scoped>
.profile-card {
  max-width: 500px;
  margin: 40px auto;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #ffffff, #f3f4f6);
}

h2 {
  color: #4b5563;
  font-family: 'Segoe UI', sans-serif;
}

.b-button {
  font-weight: bold;
}
</style>
