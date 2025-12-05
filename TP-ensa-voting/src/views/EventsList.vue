<template>
  <div class="events-page">
    <h2>Événements</h2>
    <button @click="logoutUser">Déconnexion</button>
    <div v-if="events.length === 0" class="empty">Aucun événement</div>
    <div class="grid">
      <EventCard v-for="e in events" :key="e.id" :event="e" @vote="onVote" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { subscribeEvents, voteEvent } from "../services/eventService";
import EventCard from "../components/EventCard.vue";
import { logout } from "../services/authService";
import { useRouter } from "vue-router";

const events = ref([]);
let unsubscribe = null;
const router = useRouter();

onMounted(() => {
  unsubscribe = subscribeEvents((list) => {
    events.value = list;
  });
});

onBeforeUnmount(() => {
  if (unsubscribe) unsubscribe();
});

async function onVote({ eventId, vote }) {
  try {
    await voteEvent(eventId, vote);
    alert("Vote enregistré !");
  } catch (e) {
    alert(e.message);
  }
}

async function logoutUser() {
  await logout();
  router.push({ name: "Home" });
}
</script>

<style scoped>
.events-page { max-width: 900px; margin: 20px auto; text-align: center; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px; margin-top: 20px; }
.empty { color: #666; margin-top: 20px; }
</style>
