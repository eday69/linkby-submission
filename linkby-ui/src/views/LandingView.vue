<script setup lang="ts">
import ProductGrid from '@/components/ProductGrid.vue'
import { useProductStore } from '@/stores/product'
import { computed, onMounted, ref } from 'vue'
import { Status } from '@/enums';

const status = ref(['Available', 'Reserved', 'Sold'])
const filteredProducts = computed(() => productStore.productList.filter(prod => status.value.includes(prod.status)));
const productStore = useProductStore()

onMounted(async () => {
  await productStore.getProducts();
});
</script>

<template>
  <div>
    <div class="filter">
      <div>Filter by:</div>
      <v-chip-group
          v-model="status"
          row
          multiple
      >
        <v-chip variant="outlined" filter value="Available">
          {{ Status.Available }}
        </v-chip>
        <v-chip variant="outlined" filter value="Reserved">
          {{ Status.Reserved }}
        </v-chip>
        <v-chip variant="outlined" filter value="Sold">
          {{ Status.Sold }}
        </v-chip>
      </v-chip-group>
    </div>
    <ProductGrid
      :products="filteredProducts">
    </ProductGrid>
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
}
</style>
