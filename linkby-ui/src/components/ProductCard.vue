<script setup lang="ts">
import type { Product } from '@/stores/product'
import ImageDisplay from '@/components/ImageDisplay.vue'
import { useRouter } from 'vue-router';

interface Props {
  product: Product
}

const props = defineProps<Props>()
const router = useRouter();
const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

async function handleClick(id: number) {
  await router.push({ name: 'product-details', params: { id }});
}
</script>

<template>
  <v-card
    color="primary"
    variant="outlined"
    class="mx-auto"
    min-width="300"
    max-width="400"
    link
    @click="handleClick(props.product.id)"
  >
    <v-card-item>
      <div>
        <div class="text-overline mb-1">{{ props.product.user.name }}</div>
        <div class="text-h6 mb-1">
          {{ props.product.name }}
        </div>
        <ImageDisplay image-src="" />
        <div class="status-container">
          <div class="text-caption">
            {{ USDollar.format(props.product.price) }}
          </div>
          <div class="text-caption" v-if="props.product.status != 'Available'">
            {{ props.product.status }}
          </div>
        </div>
      </div>
    </v-card-item>
  </v-card>
</template>

<style scoped>
.status-container {
  display: flex;
  justify-content: space-between;
}
</style>
