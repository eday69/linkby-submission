<script setup lang="ts">
import { reactive } from "vue";
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router';
const router = useRouter();

const authStore = useAuthStore();

const form = reactive({
  email: "",
  password: "",
});

async function handleSubmit() {
  await authStore.doLogin({ email: 'test@mail.com', password: '123' });
  await router.push({ name: 'landing' });
};

</script>

<template>
  <v-container class="pt-10">
    <v-form @submit.prevent="handleSubmit" class="login-form">
      <legend class="mb-5">
        <strong>Please provide credential to enter market place</strong>
      </legend>
      <v-text-field
        v-model="form.email"
        variant="outlined"
        label="Email"
        name="email"
      />
      <v-text-field
        v-model="form.password"
        variant="outlined"
        label="Password"
        name="password"
        type="password"
      />
      <v-btn
        class='mx-5 login-btn'
        color='pink'
        size="x-large"
        type="submit">Login</v-btn>
    </v-form>
  </v-container>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
}

@media screen and (min-width: 992px) {
  .login-form {
    width: 50%;
  }
  /*  body {*/
  /*    display: flex;*/
  /*    place-items: center;*/
  /*  }*/
  /*  #app {*/
  /*    display: grid;*/
  /*    grid-template-columns: 1fr 1fr;*/
  /*    padding: 0 2rem;*/
  /*  }*/
}

</style>
