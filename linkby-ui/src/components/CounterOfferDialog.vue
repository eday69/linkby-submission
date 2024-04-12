<script setup lang="ts">
import { ref } from 'vue'

const offer = ref()
const dialog = ref(true)
const emit = defineEmits([
  'update:dialog',
  'new-offer'
]);

function close() {
  dialog.value = !dialog.value
  emit('update:dialog', false);
}

function send() {
  if (offer.value) {
    emit('new-offer', offer.value);
    close()
  }
}
</script>

<template>
  <v-dialog
    max-width="600px"
    v-model="dialog"
    class="dialog-container"
    @click:outside="close">
    <v-card>
      <v-card-title>Counter offer value</v-card-title>
      <v-form @submit.prevent="send">
        <v-card-text
          class="pa-4 black--text"
        >
          <v-text-field
            v-model="offer"
            variant="outlined"
            label="New offer value"
            :rules="[v => !!v || 'Must enter new offer']"
            type="number"
            name="offer"
            validate-on="blur"
          />

        </v-card-text>

        <v-card-actions class="pt-3 actions">
          <v-spacer></v-spacer>
          <v-btn
            class='mx-5 login-btn'
            color='pink'
            @click="close"
          >
            Close
          </v-btn>
          <v-btn
            class='mx-5 login-btn'
            color='pink'
            type="submit"
          >
            Send !
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.dialog-container {
  .actions {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
