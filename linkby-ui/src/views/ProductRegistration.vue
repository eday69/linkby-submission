<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useProductStore } from '@/stores/product'
import { useAuthStore } from '@/stores/auth'

const productStore = useProductStore();
const authStore = useAuthStore();
const router = useRouter();
const valid = ref(false);
const imgs = ref([]);
const owner = computed(() => authStore.userId || 0)

const form = reactive({
  name: "",
  price: 0,
  description: '',
  images: [] as File[]
});

const maxSize = 5 * 1024 * 1024; // 5 MB
const rules = [
  (files: File[]) => !files.some(file => file.size > maxSize) || 'Image size should be less than 5 MB!',
  (files: File[]) => files.length <= 5 || 'Max amount of images is 5!',
];
// const plusOne = computed(() => form.valid)

async function handleSubmit() {
  console.log('sending', {
    form
  })
  await productStore.saveProduct({
    userId: authStore.userId || 0,
    name: form.name.valueOf(),
    price: form.price.valueOf(),
    description: form.description.valueOf(),
    images: imgs.value
  });
  // await router.push({ name: 'landing' });
};

async function handleCancel() {
  await router.push({ name: 'landing' });
}
</script>

<template>
  <v-container class="pt-10">
    <v-form
      v-model="valid"
      @submit.prevent="handleSubmit"
      class="login-form"
      enctype="multipart/form-data"
    >
      <input type="hidden" v-model="owner" name="userId">
      <legend class="mb-5">
        <strong>Product Registration</strong>
      </legend>
      <v-text-field
        v-model="form.name"
        variant="outlined"
        label="Product Name"
        name="name"
        :rules="[v => !!v || 'Product name is required']"
      />
      <v-text-field
        v-model="form.price"
        variant="outlined"
        label="Product price"
        name="price"
        :rules="[v => !!v || 'Product price is required']"
      />
      <v-text-field
        v-model="form.description"
        variant="outlined"
        label="Product description"
        name="description"
        :rules="[v => !!v || 'Product description is required']"
      />
      <v-file-input
        label="File input"
        v-model="imgs"
        name="imgs"
        :rules="rules"
        counter
        multiple
        show-size
        accept="image/*"
      >
      </v-file-input>
      <div class="actions mt-10">
        <v-btn
          class='mx-5 login-btn'
          color='pink'
          size="x-large"
          @click="handleCancel"
        >
          Cancel
        </v-btn>
        <v-btn
          class='mx-5 login-btn'
          color='pink'
          size="x-large"
          :disabled="!valid"
          type="submit">
          Submit
        </v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<style scoped>
.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
