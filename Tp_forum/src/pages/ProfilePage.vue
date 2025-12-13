<template>
  <div>
    <Navbar :user="user"/>
    <b-container class="mt-5">
      <b-card title="Profil Utilisateur">
        <b-form @submit.prevent="updateProfile">
          <b-form-group label="Nom">
            <b-form-input v-model="name"></b-form-input>
          </b-form-group>
          <b-form-group label="Email">
            <b-form-input v-model="email" type="email" disabled></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Mettre à jour</b-button>
        </b-form>
        <b-alert v-if="message" variant="success" dismissible @dismissed="message=''">
          {{ message }}
        </b-alert>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import { ref, onMounted } from "vue";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default {
  name: "ProfilePage",
  components: { Navbar },
  setup() {
    const user = ref(auth.currentUser);
    const name = ref("");
    const email = ref("");
    const message = ref("");

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
      const docRef = doc(db, "Users", user.value.uid);
      await updateDoc(docRef, { name: name.value });
      message.value = "Profil mis à jour avec succès !";
    };

    return { user, name, email, message, updateProfile };
  }
};
</script>
