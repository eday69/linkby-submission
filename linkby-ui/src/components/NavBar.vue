<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'

const router = useRouter();
const authStore = useAuthStore();

async function handleSellClick() {
  await router.push({ name: 'product-registration' });
}

async function handleLogOutClick() {
  authStore.doLogOut();
  await router.push({ name: 'login' });
}
</script>

<template>
  <v-app-bar :elevation="2" color="primary">
    <template v-slot:prepend>
      <v-app-bar-nav-icon :to="{ name: 'landing' }"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Market</v-app-bar-title>

    <template v-slot:append>
      <v-btn
        variant="tonal"
        @click="handleSellClick"
      >Sell</v-btn>

      <v-btn
        variant="tonal"
        class="ml-3"
        @click="handleLogOutClick"
      >Logout</v-btn>
    </template>
  </v-app-bar>
</template>

<style scoped>
</style>
