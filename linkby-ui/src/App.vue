<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore();
</script>

<template>
  <v-app>
    <v-responsive>
      <NavBar v-if="authStore.isLoggedIn"/>

      <router-view class="container"/>
    </v-responsive>
  </v-app>
</template>

<style>
.container {
  margin-top: 100px;
}
</style>
