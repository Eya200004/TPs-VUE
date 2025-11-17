<template>
  <aside>
    <h4>Tags</h4>
    <ul>
      <li v-for="tag in tags" :key="tag">
        <router-link :to="`/tags/${tag}`">#{{ tag }}</router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup>
const props = defineProps({ tags: Array })
</script>
