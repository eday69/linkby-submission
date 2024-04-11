<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { type Product, useProductStore } from '@/stores/product'
import { useRoute } from 'vue-router'
import ImageDisplay from '@/components/ImageDisplay.vue'
import { useAuthStore } from '@/stores/auth'

const productStore = useProductStore()
const authStore = useAuthStore()
const route = useRoute()
const product = ref<Product|undefined>(undefined)

const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
const headers = [
  { title: 'Timestamp', value: 'craetedAt' },
  { title: 'Name of Buyer', key: 'buyer' },
  { title: 'Counter offer done by', key: 'counterOrigin' },
  { title: 'Price offered', key: 'price' },
  { title: 'Actions', key: 'actions' },
];
const items = []

const doShowPurchaseButton = computed(() => {
  return product.value?.userId != authStore.userId
});

const doShowCounterOfferButton = computed(() => {
  return product.value?.userId != authStore.userId
});

function handleCounterOfferClick() {
  console.log('Counter offer functionality');
}
function handlePurchaseClick() {
  console.log('Counter offer functionality');
}
onMounted(async () => {
  console.log(`loading product ${route.params.id} ...`);

  product.value = await productStore.getProduct(route.params.id as string);
})
</script>

<template>
  <div class="container">
    <div class="status">
      <div>{{ product?.name }}</div>
      <div>{{ product?.status }}</div>
    </div>
    <div>Initial price: {{ USDollar.format(product?.price || 0) }}</div>
    <div>Description: {{ product?.description }}</div>
    <div class="images">
      <ImageDisplay image-src="" v-for="(image, index) of product?.images" :key="index"/>
    </div>
    <div class="actions mt-10">
      <v-btn
        class='mx-5 login-btn'
        color='pink'
        @click="handlePurchaseClick"
        :disabled="doShowPurchaseButton">
        Purchase
      </v-btn>
      <v-btn
        class='mx-5 login-btn'
        color='pink'
        @click="handleCounterOfferClick"
        :disabled="doShowCounterOfferButton">
        Counter Offer
      </v-btn>
    </div>
    <div class="pt-10">
      <div>Negotiation History</div>
      <v-data-table
        :headers="headers"
        :items="items"
        item-key="name"
        items-per-page="0"
      >
        <template #bottom></template>
      </v-data-table>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
  font-size: large;

  .status {
    display: flex;
    justify-content: space-between;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
