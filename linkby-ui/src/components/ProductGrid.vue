<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue'
import type { Product } from '@/stores/product'

interface Props {
  products: Product[]
}

const props = defineProps<Props>()
</script>

<template>
  <div class="product-grid">
    <ProductCard
      v-for="prod in products"
      :key="prod.id"
      :product="prod"
    ></ProductCard>
  </div>
</template>

<style scoped>
.product-grid {
  display: grid;
  gap: 1rem 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: auto;
}
</style>
