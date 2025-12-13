<template>
  <b-card class="mb-2">
    <p>{{ reply.content }}</p>
    <small>Posté par: {{ reply.authorName }}</small>
  </b-card>
</template>

<script>
export default {
  props: ["reply"]
};
</script>
