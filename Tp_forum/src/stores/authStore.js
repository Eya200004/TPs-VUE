import { ref } from "vue";
import { auth } from "../firebase";

const user = ref(null);

// Écoute l'état de connexion Firebase
auth.onAuthStateChanged((u) => {
  user.value = u;
});

export function useAuthStore() {
  const logout = async () => {
    await auth.signOut();
    user.value = null;
  };

  return { user, logout };
}
