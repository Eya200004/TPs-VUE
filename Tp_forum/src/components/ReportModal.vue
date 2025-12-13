<template>
  <b-modal v-model="show" title="Signaler">
    <b-form-textarea v-model="reason" />
    <b-button class="mt-2" @click="send">Envoyer</b-button>
  </b-modal>
</template>

<script setup>
import { ref } from 'vue'
import { reportMessage } from '../services/reportService'

const show = ref(false)
const reason = ref('')

const send = async () => {
  await reportMessage({ reason })
  show.value = false
}
</script>
