<template>
  <div class="card">
    <img v-if="event.img" :src="event.img" alt="img" class="thumb" />
    <h3>{{ event.title }}</h3>
    <p>{{ event.description }}</p>
    <p>Date: {{ formatDate(event.date) }}</p>
    <p>Yes: {{ event.yesVotes || 0 }} — No: {{ event.noVotes || 0 }}</p>
    <div class="actions">
      <button @click="voteChoice('yes')">Yes</button>
      <button @click="voteChoice('no')">No</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventCard",
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  methods: {
    voteChoice(choice) {
      // émet un événement vers le parent
      this.$emit("vote", { eventId: this.event.id, vote: choice });
    },
    formatDate(d) {
      if (!d) return "";
      if (d.seconds) return new Date(d.seconds * 1000).toLocaleString();
      return new Date(d).toLocaleString();
    }
  }
};
</script>

<style scoped>
.card { border: 1px solid #ddd; padding: 12px; border-radius: 8px; text-align: left; }
.thumb { width: 100%; max-height: 140px; object-fit: cover; border-radius: 6px; }
.actions { margin-top: 10px; display: flex; gap: 8px; }
button { padding: 6px 10px; cursor: pointer; }
</style>
