<script setup lang="ts">
import ProductGrid from '@/components/ProductGrid.vue'
import { useProductStore } from '@/stores/product'
import { onMounted } from 'vue'

const productStore = useProductStore()

onMounted(async () => {
  console.log('loading products ...')
  await productStore.getProducts();
})

</script>

<template>
  <ProductGrid
    :products="productStore.productList">
  </ProductGrid>
</template>

<style scoped>

</style>
