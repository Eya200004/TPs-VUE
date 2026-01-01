<template>
  <div>
    <Navbar :user="user"/>

    <b-container class="mt-4">
      <!-- Discussion principale -->
      <b-card class="mb-4 border-primary shadow-sm">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <h2 class="text-primary">{{ discussion.title }}</h2>
            <p class="text-muted">{{ discussion.content }}</p>
            <small class="text-secondary">Posté par {{ discussion.authorName }} le {{ discussion.createdAt?.toDate()?.toLocaleString() || "" }}</small>
          </div>
          <div v-if="user && discussion.authorId === user.uid" class="ml-2">
            <b-button size="sm" variant="outline-warning" class="mr-1" @click="editDiscussion">Modifier</b-button>
            <b-button size="sm" variant="outline-danger" @click="deleteDiscussion">Supprimer</b-button>
          </div>
        </div>
      </b-card>

      <!-- Réponses -->
      <b-card class="mb-4">
        <h5>Réponses</h5>
        <div v-if="replies.length === 0" class="text-muted">Pas encore de réponses.</div>
        <ReplyCard 
          v-for="reply in replies" 
          :key="reply.id" 
          :reply="reply" 
          :currentUser="user"
          @deleteReply="handleDeleteReply"
          @editReply="handleEditReply"
          class="mb-2"
        />
      </b-card>

      <!-- Ajouter une réponse -->
      <b-card class="mb-4" v-if="user">
        <b-form @submit.prevent="addReply">
          <b-form-textarea 
            v-model="newReply" 
            placeholder="Écrire une réponse..." 
            rows="4"
            required
            class="mb-2"
          ></b-form-textarea>
          <b-button type="submit" variant="success">Répondre</b-button>
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db, auth } from "../firebase";
import { doc, getDoc, collection, addDoc, query, where, getDocs, deleteDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import Navbar from "../components/Navbar.vue";
import ReplyCard from "../components/ReplyCard.vue";

export default {
  components: { Navbar, ReplyCard },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const discussionId = route.params.id;

    const discussion = ref({});
    const replies = ref([]);
    const newReply = ref("");
    const user = ref(auth.currentUser);

    const loadDiscussion = async () => {
      const docRef = doc(db, "Discussions", discussionId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) discussion.value = { id: docSnap.id, ...docSnap.data() };
    };

    const loadReplies = async () => {
      const q = query(collection(db, "Replies"), where("discussionId", "==", discussionId));
      const querySnapshot = await getDocs(q);
      replies.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    };

    onMounted(async () => {
      await loadDiscussion();
      await loadReplies();
    });

    const addReply = async () => {
      if (!newReply.value) return;
      const docRef = await addDoc(collection(db, "Replies"), {
        discussionId,
        content: newReply.value,
        authorId: user.value.uid,
        authorName: user.value.displayName || "Utilisateur",
        createdAt: serverTimestamp()
      });
      replies.value.push({ id: docRef.id, discussionId, content: newReply.value, authorId: user.value.uid, authorName: user.value.displayName || "Utilisateur" });
      newReply.value = "";
    };

    const deleteDiscussion = async () => {
      if (confirm("Voulez-vous vraiment supprimer cette discussion ?")) {
        await deleteDoc(doc(db, "Discussions", discussionId));
        router.push("/");
      }
    };

    const editDiscussion = async () => {
      const newTitle = prompt("Modifier le titre :", discussion.value.title);
      const newContent = prompt("Modifier le contenu :", discussion.value.content);
      if (newTitle && newContent) {
        await updateDoc(doc(db, "Discussions", discussionId), { title: newTitle, content: newContent });
        discussion.value.title = newTitle;
        discussion.value.content = newContent;
      }
    };

    const handleDeleteReply = (replyId) => {
      replies.value = replies.value.filter(r => r.id !== replyId);
    };

    const handleEditReply = (replyId, newContent) => {
      const reply = replies.value.find(r => r.id === replyId);
      if (reply) reply.content = newContent;
    };

    return { discussion, replies, newReply, user, addReply, deleteDiscussion, editDiscussion, handleDeleteReply, handleEditReply };
  }
};
</script>

<style scoped>
h2.text-primary{
  font-weight: 600;
}
b-card{
  border-radius: 10px;
}
b-card p{
  font-size: 1.05rem;
}
b-card small{
  font-size: 0.85rem;
}
</style>
