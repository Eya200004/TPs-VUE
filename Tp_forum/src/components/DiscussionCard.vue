<template>
  <b-card :title="discussion.title" class="mb-3">
    <p>{{ discussion.content }}</p>
    <small>Posté par: {{ discussion.authorName }}</small>
    <b-button size="sm" variant="primary" @click="$router.push(`/discussion/${discussion.id}`)">Voir Discussion</b-button>
  </b-card>
</template>

<script>
export default {
  props: ["discussion"]
};
</script>
