<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Product } from '@/stores/product'
import ImageDisplay from '@/components/ImageDisplay.vue'

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
        <ImageDisplay
          width="300"
          height="300"
          :image="props.product.images[0]"
        />
        <div class="status-container mt-2">
          <div class="text-caption">
            {{ USDollar.format(props.product.price) }}
          </div>
          <div class="text-caption" v-if="props.product.status != 'Available'">
            <v-chip
              variant="tonal"
              size="small"
              color="primary">
              {{ props.product.status }}
            </v-chip>
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
